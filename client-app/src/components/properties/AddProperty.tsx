import { format } from "date-fns";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProperty = ({usuarioInfo}:{usuarioInfo:{id: number,name: string,
    email: string, phone: string,}}) => {

    let propertyID: number = 0;
    const formData = new FormData()
    const navigate = useNavigate();
    const [images, setImages] = useState([] as any [])
    const [uploadError, setUploadError] = useState(false)
    
    const [property, setProperty] = useState({
            id: 0,
            createdAt: new Date(),
            sellerId: usuarioInfo.id,
            titulo: '',
            price: 0.00,
            areaTotal: 0.00,
        })

   
    const handleImage = (event: any) => {
        if(checkFileLimits(Array.from(event.target.files).length))
        {
            setImages([...event.target.files])        
        }

        

    }

    const checkFileLimits = (quantity: number) => {
        const MAX_QUANTITY = 15;
        if (quantity > MAX_QUANTITY) {
            alert(`Solo se permiten subir hasta ${MAX_QUANTITY} archivos`);
            return false;

        } else {
            return true;
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProperty({...property, [name]:value})
    }

   
    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const propertyValue = {
            createdAt: property.createdAt,
            sellerId: usuarioInfo.id,
            titulo: property.titulo,
            price: property.price,
            areaTotal: property.areaTotal
        }
        
        //Guardar publicacion y devolver su id
        try {
            
            await fetch('https://localhost:7272/api/Property', {
            method: 'POST',
            headers:  {'Content-type':'application/json; charset=UTF-8'},
            body: JSON.stringify(propertyValue)
                
            }).then((response) => response.json())
            .then((data) => {
                propertyID = data;
            });  
           
        } catch (error) {
            console.log("error in post property", error)
        }

        try {
            
            images.forEach(async (img) => {
                formData.append("Id", String(0))
                formData.append("propertyId", String(propertyID))
                formData.append("image", img, img.name)
                formData.append("uploadAt", String(format(new Date(), "yyyy/MM/dd h:m a")))
                    
                await fetch('https://localhost:7272/api/PropertiesImage', {
                method: 'POST',
                body: formData
                }).then((response) => {
                    if(response.status !== 200)
                    {
                        response.text().then(text => { throw new Error(text) })
                    }
                }) 
            }); 
            
            navigate('/properties/add')
        
        } catch (error) {
            console.log("error in upload image", error)
            setUploadError(true);
        }
    }

    return(
        <div>

            <div className="card">
                <h5 className="card-header">Agregar propiedad para vender/alquilar</h5>
                <div className="card-body">
            
                    {uploadError ? 
                     <div className="alert alert-dismissible alert-danger">
                     <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                     Un error ocurrio en la subida de imagenes, verifique y trate de nuevo.
                   </div>: ""}
                    <form onSubmit={handleSubmit}> 

                        <div className="form-group mb-3">
                            <input type="hidden" className="form-control" id="InputDate"
                            name="createdAt" readOnly value={ format(new Date(), "yyyy/MM/dd h:m a")} onChange={handleChange}/>
                            <span className="text-danger"></span>
                        </div>
                        
                        <div className="form-group mb-3">
                            <label htmlFor="InputTitulo" className="form-label">Titulo</label>
                            <input type="text" className="form-control" id="InputTitulo"
                            name="titulo" onChange={handleChange} />
                            <span className="text-danger"></span>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="InputPrecio" className="form-label">Precio</label>
                            <input type="number" className="form-control" id="InputPrecio"
                            name="price" step="0.01" onChange={handleChange} />
                            <span className="text-danger"></span>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="InputPrecio" className="form-label">Area total (mts<sup>2</sup>)</label>
                            <input type="number" className="form-control" id="InputPrecio"
                            name="areaTotal" step="0.01" onChange={handleChange} />
                            <span className="text-danger"></span>
                        </div>

                        <div className="form-group mb-4">
                            <h6>Imagenes a publicar</h6>
                            <input type="file" name="file" onChange={handleImage}  accept="image/*" multiple={true} />
                            <span className="text-danger"></span>
                        </div>
            
                        
                        <button type="submit" className="btn btn-primary me-2"><i className="bi bi-person-check me-1"></i>Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProperty;