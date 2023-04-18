import { useState } from "react";


const ApplyToProperty= ({modal, setModal}:{modal:Boolean, setModal:Function}) => {
    
    const showModal = () => setModal(!modal)
    


    return(
       <button type="button" className="btn btn-success" data-bs-toggle="modal" 
       data-bs-target="#exampleModal" onClick={() => showModal()}>Aplicar</button>
    );
}

export default ApplyToProperty;