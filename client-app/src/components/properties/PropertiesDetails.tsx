import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PropertiesDetails.css'
import Carousel from "../Carousel/Carousel";
import Comments from "../Comments/Comments";
import Spinner from "../spinner/Spinner";

const PropertiesDetails = ({usuarioInfo}:{usuarioInfo:{
    id: number,
    name: string,
    email: string,
    phone: string
}}) => {

    const { id } = useParams();
    const [images, setImages] = useState([] as any[])
    const [loading, setLoading] = useState<boolean>(false);
    
    const [property, setProperty] = useState({
        id: 0,
        createdAt: new Date(),
        sellerId: 0,
        titulo: '',
        price: 0.00,
       areaTotal: 0.00
    });
    
    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch('https://localhost:7272/api/Property/' + id),
            fetch('https://localhost:7272/api/PropertiesImage/post/' + id),
        ])
        .then(([resProperty, resImages]) => 
        Promise.all([resProperty.json(), resImages.json()]))
        .then(([dataProperty, dataImages]) => {
            setProperty(dataProperty);
            setImages(dataImages);
        })
        .catch((err) => {
            console.log(err.message);
        }).finally(() => setLoading(false))

    }, [id]);

    return(
        <div>
            {loading === false ? (
            <div className="">
                <div className="card m-5">
                    <div className="row g-0">
                        <div className="col-md-7">
                        {
                            images.length > 1 ? <Carousel images={images} /> : images.map((i) => <img key={i.id} src={`data:image/jpeg;base64,${i.image}`} className="img-fluid rounded-start" alt="..."/>)
                        }
                        </div>
                        <div className="col-md-5">
                            <div className="card-body">
                            <h5 className="card-title">{property.titulo}</h5>
                            <p className="card-text"><small className="text-muted">publicado el {format(new Date(property.createdAt), 'dd/MM/yyyy')}</small></p>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Comments propertyId={id!}  usuarioInfo={usuarioInfo}/>
            </div>)
            :
            (<Spinner/>)
            }
        </div>
    );
}

export default PropertiesDetails;