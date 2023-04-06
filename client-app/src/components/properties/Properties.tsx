import { Fragment, useEffect, useState } from 'react';
import format from 'date-fns/format';


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

    // useEffect(() => {
    //     .then((response) => {
    //         if(response.status === 400) {
    //             setBadRequest(true)
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         setEmpleado(data);
    //         setStatus(data['estado']);
    //     })
    // }, [])

    return(
       <Fragment>
        <div className="row row-cols-4">
            {/* {images.find(x => x.propertyId === 1) } */}
            {properties.map((properties) => {
                return(
                    <div key={properties.id} className="card mb-3">
                        <div className="col">
                            {images.map((i) => <img src={`data:image/jpeg;base64,${i.propertyId === properties.id ? i.image:"..."}`} className="card-img-top" alt="..."/>)}
                            <div className="card-body">
                                <h5 className="card-title">{properties.titulo}</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">publicado el {format(new Date(properties.createdAt), 'dd/MM/yyyy')}</small></p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
       </Fragment>
    );
}

export default Properties;