import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PropertiesDetails.css'

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
    }, []);

    const Carousel = () => {
        return(
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="..." className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="..." className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="..." className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        );
    }

    return(
        // <div className="card m-lg-5">
        //     {images.map((i) =>
        //         images.length > 1 ? <Carousel/>:<img key={i.id} src={`data:image/jpeg;base64,${i.image}`} className="card-img-top" alt="..."/>
        //     )}

        //     <div className="card-body">
        //         <h5 className="card-title">{property.titulo}</h5>
        //         <p className="card-text"><small className="text-muted">publicado el {format(new Date(property.createdAt), 'dd/MM/yyyy')}</small></p>
        //         <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        //     </div>
        // </div>
        <div className="card m-5">
            <div className="row g-0">
                <div className="col-md-7">
                {images.map((i) =>
                    images.length > 1 ? <Carousel/>:<img key={i.id} src={`data:image/jpeg;base64,${i.image}`} className="img-fluid rounded-start" alt="..."/>
                )}
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

        
    );
}

export default PropertiesDetails;