import { Fragment, useEffect, useState } from 'react';
import format from 'date-fns/format';
import "./Properties.css"
import { NavLink } from 'react-router-dom';


const Properties = () => {
    const [properties, setProperties] = useState([] as any[]);
    const [images, setImages] = useState([] as any[]);
    
    useEffect(() => {
        Promise.all([
            fetch('https://localhost:7272/api/Property'),
            fetch('https://localhost:7272/api/PropertiesImage'),
        ])
        .then(([resProperty, resImage]) => 
        Promise.all([resProperty.json(), resImage.json()]))
        .then(([dataProperty, dataImage]) => {
            setProperties(dataProperty);
            setImages(dataImage);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }, [])

    return(
       <Fragment>
        <div className="row row-cols-lg-4 gx-5">
            {properties.map((properties) => {
                return(
                    <div className="col">
                        <NavLink to={'/properties/details/' + properties.id} key={properties.id} 
                                className="card card-properties mb-3 mt-4 ms-auto shadow-lg">
                                { 
                                images.map((i) => 
                                    {  
                                        let indexImg = 0
                                        if(i.propertyId === properties.id && indexImg < 1)
                                        {
                                        indexImg++
                                        return( <img src={`data:image/jpeg;base64,${i.image}`} className="card-img-top" alt="..."/>)
                                        }
                                        
                                    }
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{properties.titulo}</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <hr/>
                                    <p className="card-text"><small className="text-muted">publicado el {format(new Date(properties.createdAt), 'dd/MM/yyyy')}</small></p>
                                </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
       </Fragment>
    );
}

export default Properties;