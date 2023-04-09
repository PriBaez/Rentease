import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PropertiesDetails.css'
import Carousel from "../Carousel/Carousel";

const PropertiesDetails = () => {

    const { id } = useParams();
    const [property, setProperty] = useState({
        id: 0,
        createdAt: new Date(),
        sellerId: 0,
        titulo: '',
        price: 0.00,
       areaTotal: 0.00
    });

    const [images, setImages] = useState([] as any[])
    
    useEffect(() => {
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
        })
    }, [id]);

    return(
        <div>
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

            <div className="container">
                <h1>Carousel</h1>
                {/* <Carousel images={images} /> */}
            </div>
        </div>

    );
}

export default PropertiesDetails;