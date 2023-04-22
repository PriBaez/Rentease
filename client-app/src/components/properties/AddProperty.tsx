import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAttributes from "../attributes/AddAttributes";
import "./AddProperty.css"


const AddProperty = ({ usuarioInfo }: {
    usuarioInfo: {
        id: number, name: string,
        email: string, phone: string,
    };
}) => {

    let propertyID: number = 0;

    const formData = new FormData();
    const navigate = useNavigate();

    const [images, setImages] = useState([] as any[]);
    const [previewImages, setPreviewImages] = useState([] as any[]);
    const [attributes, setAttributes] = useState([] as any[]);
    const [propertyAttributes, setPropertyAttributes] = useState([] as any[]);
    const [ok, setOk] = useState(false)
    const [fail, setFail] = useState(false)


    const [property, setProperty] = useState({
        id: 0,
        createdAt: new Date(),
        sellerId: usuarioInfo.id,
        titulo: '',
        price: 0.00,
        areaTotal: 0.00,
        typeOfExchange: 0,
        status: true 
    });

    useEffect(() => {
        fetch('https://localhost:7272/api/Attribute')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setAttributes(data);
            });
    }, []);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls: any [] = []
        images.forEach(image => {
            newImageUrls.push(URL.createObjectURL(image))
        });
        setPreviewImages(newImageUrls)
    }, [images])

    const handleImage = (event: any) => {
        if (checkFileLimits(Array.from(event.target.files).length)) {
            setImages([...event.target.files])
        }
    };

    const checkFileLimits = (quantity: number) => {
        const MAX_QUANTITY = 15;
        if (quantity > MAX_QUANTITY) {
            alert(`Solo se permiten subir hasta ${MAX_QUANTITY} archivos`);
            return false;

        } else {
            return true;
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProperty({ ...property, [name]: value });
    };

    const handleSetAttributes = (attributes: any) => {
        // update attributes
        console.log(attributes);
    };


    const handleSubmit = async (e: any) => {
       try {
        e.preventDefault();
        const propertyValue = {
            createdAt: property.createdAt,
            sellerId: usuarioInfo.id,
            titulo: property.titulo,
            price: property.price,
            areaTotal: property.areaTotal,
            typeOfExchange: property.typeOfExchange,
            status: property.status
        };

        //Guardar publicacion y devolver su id
          let resProperty =  await fetch('https://localhost:7272/api/Property', {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(propertyValue)

            }).then((response) =>{

                if (response.status !== 200) {
                    response.text().then(text => { throw new Error(text); });
                }

                return response.json()
            }

            ).then((data) => {
                    propertyID = data;
                })

       

        // guardar los atributos referentere a esa propiedad
            const propAttribute = propertyAttributes.filter(x => x.status === true)

            propAttribute.forEach(async (propAtrr, index) => {
                const propertyAttrValue = {
                    propertyId: propertyID,
                    idAttribute: propAtrr.id,
                    quantity: propAtrr.quantity
                };

             
            let resPropertyAttributes = await fetch('https://localhost:7272/api/PropertiesAttribute', {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(propertyAttrValue)

                }).then((response) => {
                    if (response.status !== 200) {
                        response.text().then(text => { throw new Error(text); });
                    }
                })
              

            })
        

        //subir imagenes a la base de datos
            images.forEach(async (img) => {
                formData.append("Id", String(0));
                formData.append("propertyId", String(propertyID)); //String(propertyID)
                formData.append("image", img, img.name);
                formData.append("uploadAt", String(format(new Date(), "yyyy/MM/dd h:m a")));
                
                
                let PropertyImages = await fetch('https://localhost:7272/api/PropertiesImage', {
                    method: 'POST',
                    body: formData
                }).then((response) => {
                    if (response.status !== 200) {
                        response.text().then(text => { throw new Error(text); });
                    }
                });

                formData.delete("Id")
                formData.delete("propertyId")
                formData.delete("image")
                formData.delete("uploadAt")
            
            });

            setOk(true)

            setTimeout(() => {
                setOk(false)
            }, 3000)

            setPreviewImages([])
            setImages([])
            setPropertyAttributes([])
            setProperty({
                    id: 0,
                    createdAt: new Date(),
                    sellerId: usuarioInfo.id,
                    titulo: '',
                    price: 0.00,
                    areaTotal: 0.00,
                    typeOfExchange: 0,
                    status: true
                })

        
       } catch (error:any) {
        console.log(error.message)
        setFail(true)

        setTimeout(() => {
            setFail(false)
        }, 3000)
       }

      
    };

    return (
        <div>
            <div className="card m-5">
                <h5 className="card-header">Agregar propiedad para vender/alquilar</h5>
                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group mb-3">
                            <input type="hidden" className="form-control" id="InputDate"
                                name="createdAt" readOnly value={format(new Date(), "yyyy/MM/dd h:m a")} onChange={handleChange} />
                        </div>

                        <label htmlFor="type-of-exchange" className="form-label">Esta propiedad es para:</label>
                        <div className="form-group mb-3" id="type-of-exchange">
                            
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="typeOfExchange" 
                                id="inlineRadio1" value={1} onChange={handleChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">Venta</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="typeOfExchange" 
                                id="inlineRadio2" value={2} onChange={handleChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio2">Alquiler</label>
                            </div>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="InputTitulo"
                                name="titulo" placeholder="Mi propiedad" onChange={handleChange} />
                            <label htmlFor="InputTitulo" className="form-label">Titulo</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="InputPrecio"
                            name="price" step="0.01" onChange={handleChange} placeholder="el precio de tu propiedad" />
                            <label htmlFor="InputPrecio" className="form-label">Precio</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="InputAreaTotal"
                                name="areaTotal" step="0.01" onChange={handleChange} />
                            <label htmlFor="InputAreaTotal" className="form-label">Area total (mts<sup>2</sup>)</label>
                        </div>

                        <AddAttributes
                            attributes={attributes}
                            setAttributes={handleSetAttributes}
                            setRawAttributes={setPropertyAttributes}
                        />

                        <div className="form-group mb-4">
                            <h6>Imagenes a publicar</h6>
                            <input type="file" name="file" onChange={handleImage} accept="image/*" multiple={true} />
                            <div className="d-flex mh-50">
                                {previewImages.map((file, index) => {
                                    return(
                                        <img key={index} src={file} className="img-fluid h-auto w-25 rounded-start my-2 me-1" alt="..."/>
                                    )
                                })}
                            </div>
                        </div>


                        <button type="submit" className="btn btn-primary me-2"><i className="bi bi-person-check me-1"></i>Guardar</button>
                        
                        {fail ?
                        <div className="alert alert-danger">
                           Algo salio mal en lo que publicamos tu propiedad, por favor trata nuevamente en unos instantes.
                        </div> : null}

                        {ok ?
                        <div className="alert alert-success">
                           Su propiedad ha sido agregada con exito!
                        </div> : null}
                    
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;