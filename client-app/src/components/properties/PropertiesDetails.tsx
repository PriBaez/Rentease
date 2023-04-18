import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PropertiesDetails.css'
import Carousel from "../Carousel/Carousel";
import Comments from "../Comments/Comments";
import Spinner from "../spinner/Spinner";
import SeeOffers from "./SeeOffers";
import ApplyToProperty from "./ApplyToProperty";
import ApplyModal from './ApplyModal';

const PropertiesDetails = ({usuarioInfo}:{usuarioInfo:{
    id: number,
    name: string,
    email: string,
    phone: string
}}) => {

    const { id } = useParams();
    const [images, setImages] = useState([] as any[])
    const [propertyAttributes, setPropertyAttributes] = useState([] as any[])
    const [attributes, setAttributes] = useState([] as any[])
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    
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
            fetch('https://localhost:7272/api/PropertiesAttribute/perProperty/' + id),
            fetch('https://localhost:7272/api/Attribute'),
        ])
        .then(([resProperty, resImages, resPropertyAttributes, resAttributes]) => 
        Promise.all([resProperty.json(), resImages.json(), 
            resPropertyAttributes.json(), resAttributes.json()]))

        .then(([dataProperty, dataImages, dataPropertyAttributes, dataAttributes]) => {
            setProperty(dataProperty);
            setImages(dataImages);
            setPropertyAttributes(dataPropertyAttributes);
            setAttributes(dataAttributes)
        })
        .catch((err) => {
            console.log(err.message);
        }).finally(() => setLoading(false))

    }, [id]);

    const getAttributes = (id:number):any [] => {
       
        let propertyAttribute = propertyAttributes.filter(attr => attr.propertyId === id)
        let attributeFormatted = propertyAttribute.map((pAttr) => {    
                return attributes.map((attr, index) => {
                return pAttr.idAttribute === attr.id ?
                <p key={index}>{attr.description} {pAttr.quantity}</p>: null
            })
        })

        return attributeFormatted;
    }

    return(
        <div>
            {loading === false ? (
            <div className="">
                <div className="card m-5">
                {modal ? <ApplyModal/> : null}
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
                            <div className="card-text">
                                {getAttributes(property.id).map((pAttr, index) => {
                                    return(
                                        <div key={index} className='col'>
                                            <div className='row'>
                                                {pAttr}
                                                
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            
                            {usuarioInfo.id === property.sellerId ? <SeeOffers/> : <ApplyToProperty modal={modal} setModal={setModal} /> }
                            
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