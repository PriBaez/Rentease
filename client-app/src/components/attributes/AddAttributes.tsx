import { HTMLInputTypeAttribute, ReactElement, useEffect, useState } from "react"


const AddAttributes = ({attributes, propertyID}:{attributes:any [], propertyID:number}) => {

    const attributesToSet:any [] = new Array(attributes.length).fill({})
    // estado que depende de attributes 
    const [checkedState, setCheckedState] = useState( new Array(attributes.length).fill(false) );
    const [quantity, setQuantity] = useState( new Array(attributes.length).fill(0) );

    useEffect(() => {
        setCheckedState(new Array(attributes.length).fill(false));
        setQuantity(new Array(attributes.length).fill(0))
    }, [attributes])
    
    // controlador de eventos de los checkbox
    const handleOnChange = (position:number) => {
        
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState); 
    }
    

    // [{}:{}:{}]
    // checkedState = [false, false, false]
    const handleAttributes = async (e: any, id:number) => {
        const {name, value} = e.target
        await handleOnChange(id)
        checkedState.map((attr, index) => {
            console.log('comparacion', index === id)

            return attr === true && index === id ? (attributesToSet[index] = {
                id:0, 
                propertyId: propertyID, 
                attributeId: value, 
                quantity: quantity[index]
            })
            :
            console.log(false)
        })
        console.log('array to set',attributesToSet)

    }

    return(
        <div className="form-group mb-3">
                            {attributes.map((attribute, index) => {
                                return(
                                    <div key={index} className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" 
                                        value={attribute.id} name="attributeId" id={`checkbox-${attribute.id}`} 
                                        onChange={(event) => handleAttributes(event, index)} checked={checkedState[index]} />
                                        <label className="form-check-label" 
                                        htmlFor={`checkbox-${attribute.id}`}>
                                            {attribute.description}
                                        </label>

                                        <label className="form-label ms-3 me-1" 
                                        htmlFor={`inputQuantity-${attribute.id}`}>
                                            Cantidad
                                        </label>
                                        <input type="number" className={`form-control ${checkedState[index] ? "":"readonly`"}`}  
                                        name="quantity" id={`inputQuantity-${attribute.id}`} readOnly={!checkedState[index]}/>
                                    </div>
                                )
                            })}
                        </div>
    )
}

export default AddAttributes;