import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PropertiesDetails.css'
import Carousel from "../Carousel/Carousel";
import Comments from "../Comments/Comments";
import Spinner from "../spinner/Spinner";
import SeeOffers from "../displayOffer/SeeOffers";
import ApplyToProperty from "./ApplyToProperty";
import ApplyModal from '../modalOffers/ApplyModal';
import { UsuarioInfo } from '../../interface/UsuarioInfo';
import AlertSucces from "../alerts/AlertSuccess";
import AlertFail from "../alerts/AlertFail";
import ListOffers from "../displayOffer/ListOffers";

const PropertiesDetails = ({usuarioInfo}:{usuarioInfo:UsuarioInfo}) => {

    const { id } = useParams();
    const [images, setImages] = useState([] as any[])
    const [propertyAttributes, setPropertyAttributes] = useState([] as any[])
    const [attributes, setAttributes] = useState([] as any[])
    const [typeOfExchange, setTypeOfExchange] = useState([] as any[]);
    const [loading, setLoading] = useState<boolean>(false);
    const [resModalOk, setResModalOk] = useState<boolean>(false)
    const [resModalFail, setResModalFail] = useState<boolean>(false)
    
    const [property, setProperty] = useState({
        id: 0,
        createdAt: new Date(),
        sellerId: 0,
        titulo: '',
        price: 0.00,
       areaTotal: 0.00,
       typeOfExchange: 0,
       status: false
    });
    
    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch('https://localhost:7272/api/Property/' + id),
            fetch('https://localhost:7272/api/PropertiesImage/post/' + id),
            fetch('https://localhost:7272/api/PropertiesAttribute/perProperty/' + id),
            fetch('https://localhost:7272/api/Attribute'),
            fetch('https://localhost:7272/api/TypeOfExchange'),
        ])
        .then(([resProperty, resImages, resPropertyAttributes, resAttributes, resExchange]) => 
        Promise.all([resProperty.json(), resImages.json(), 
            resPropertyAttributes.json(), resAttributes.json(), resExchange.json()]))

        .then(([dataProperty, dataImages, dataPropertyAttributes, dataAttributes, dataExchange]) => {
            setProperty(dataProperty);
            setImages(dataImages);
            setPropertyAttributes(dataPropertyAttributes);
            setAttributes(dataAttributes)
            setTypeOfExchange(dataExchange)
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

    const getTypeOfExchange = (id:number) => {
       
        let rawTypeOfExchange = typeOfExchange.filter(type => type.id === id)
        let TypeOfExchangeFormatted = rawTypeOfExchange.map((type, index) => {     
            return  <p key={index}>{type.name}</p>
        })
       
        return TypeOfExchangeFormatted;
    }



    return(
        <div>
            {loading === false ? (
            <div className="">
                <div className="card m-5">
                {resModalOk ? <AlertSucces message="Oferta realizada con exito!"/> : null}
                {resModalFail ? <AlertFail message="Su oferta no se pudo realizar,por favor trate de nuevo en unos instantes."/> : null}                
                
                {usuarioInfo.id === property.sellerId ? 
                <ListOffers propertyId={parseInt(id!)} sellerId={usuarioInfo.id}/>
                : 
                <ApplyModal 
                propertyId={parseInt(id!)} 
                usuarioInfo={usuarioInfo} setResOk={setResModalOk} setResFail={setResModalFail}/>
            }
                    <div className="row g-0">
                        <div className="col-md-7">
                        {
                            images.length > 1 ? <Carousel images={images} /> : images.map((i) => <img key={i.id} src={`data:image/jpeg;base64,${i.image}`} className="img-fluid vh-50 rounded-start" alt="..."/>)
                        }
                        </div>
                        <div className="col-md-5">
                            <div className="card-body">
                            <h5 className="card-title">{property.titulo}</h5>
                            <p className="card-text"><small className="text-muted">publicado el {format(new Date(property.createdAt), 'dd/MM/yyyy')}</small></p>
                            <div className="card-text">
                                <p>Esta propiedad esta en: {getTypeOfExchange(property.typeOfExchange)}</p>
                                <p>Area total: {property.areaTotal} mt<sup>2</sup> </p>
                                <p>Precio: {property.price}</p>
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
                            
                            {usuarioInfo.id === property.sellerId ? <SeeOffers/> : <ApplyToProperty/> }
                            
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