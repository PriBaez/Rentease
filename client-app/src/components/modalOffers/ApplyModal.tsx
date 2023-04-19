// import "./ApplyModal.css"

import { useState } from "react";
import { UsuarioInfo } from "../../interface/UsuarioInfo";

const ApplyModal = ({propertyId, usuarioInfo, setResOk, setResFail}:
    {propertyId:number, usuarioInfo:UsuarioInfo, setResOk:Function, setResFail:Function}) => {

    const [offer ,setOffer] = useState({
        id: 0,
        propertyId: propertyId,
        userId: usuarioInfo.id,
        quantity: 0.00,
        status: true

    })

    const handleChanges = (event:any) => {
        const { name, value } = event.target;
        setOffer({...offer, [name]:value})
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const commentValue = {
            id: offer.id,
            propertyId: offer.propertyId,
            userId: offer.userId,
            quantity: offer.quantity,
            status: offer.status
        };
        
        try {
            await fetch('https://localhost:7272/api/Offer', {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(commentValue)

            });

            setResOk(true)
            
            setTimeout(() => {
                setResOk(false)
                document.getElementById("close-modal")?.click();
            }, 2000)
            
        } catch (error: any) {
            setResFail(true)
            setTimeout(() => {setResFail(false)}, 2000)
            console.log(error.message);
        }
    }
    return(
        <div className="modal vh-50 fade apply-modal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden={true}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Hacer oferta inicial</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            Deseas aplicar a esta propiedad? 
                            Al hacerlo tu informacion de contacto (nombre, telefono y email) seran enviados al vendedor de esta propiedad
                            Para continuar haz una oferta al vendedor.
                                <div className="form-floating form-group my-2">
                                    <input type="number" name="quantity"
                                    className="form-control" id="floatingInput" 
                                    step={0.01} onChange={handleChanges}/>
                                    <label htmlFor="floatingInput">Oferta $</label>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary close-modal" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-outline-success">Hacer Oferta</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ApplyModal;