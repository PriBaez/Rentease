// import "./ApplyModal.css"

import { useState } from "react";

const ApplyModal = () => {

    const [offer ,setOffer] = useState({
        id: 0,
        propertyId: 0,
        userId: 0,
        quantity: 0.00,
        status: true

    })

    const handleChanges = (event:any) => {
        const { name, value } = event.target;
        setOffer({...offer, [name]:value})
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const propertyValue = {
            id: offer.id,
            propertyId: offer.propertyId,
            userId: offer.userId,
            quantity: offer.userId,
            status: offer.status
        };

        //Guardar publicacion y devolver su id
        try {

            let res = await fetch('https://localhost:7272/api/Offers', {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(propertyValue)

            }).then((response) => {
                
                if (response.ok){
                    return response.json()

                } else  {throw new Error()}
            })

        } catch (error) {
            console.log("error in post property", error);
        }
    }
    return(
        <div className="modal vh-50 fade apply-modal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" >
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Hacer oferta inicial</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                Deseas aplicar a esta propiedad? 
                Al hacerlo tu informacion de contacto (nombre, telefono y email) seran enviados al vendedor de esta propiedad
                Para continuar haz una oferta al vendedor.

                <div className="form-floating my-2">
                    <input type="number" className="form-control" id="floatingInput" placeholder="35000.00"/>
                    <label htmlFor="floatingInput">Oferta $</label>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary">Hacer Oferta</button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default ApplyModal;