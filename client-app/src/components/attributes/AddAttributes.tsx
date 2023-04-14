import { HTMLInputTypeAttribute, ReactElement, useEffect, useState } from "react";


const AddAttributes = ({ attributes, propertyID, setAttributes }: { attributes: any[], propertyID: number, setAttributes: any; }) => {

    const attributesToSet: any[] = new Array(attributes.length).fill({});
    // estado que depende de attributes 
    const [checkedState, setCheckedState] = useState(new Array(attributes.length).fill(false));
    const [quantity, setQuantity] = useState(new Array(attributes.length).fill(0));

    useEffect(() => {
        setCheckedState(new Array(attributes.length).fill(false));
        setQuantity(new Array(attributes.length).fill(0));
    }, [attributes]);

    // controlador de eventos de los checkbox
    const handleOnChange = (position: number) => {

        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    // [{}:{}:{}]
    // checkedState = [false, false, false]
    const handleAttributes = (e: any, id: number) => {
        handleOnChange(id);
    };

    const handleQuantity = (e: any, id: number) => {
        const { value } = e.target;
        const _quantity = [...quantity];
        _quantity[id] = value === "" ? 0 : parseInt(value);
        setQuantity(_quantity);
    };

    useEffect(() => {
        const _attributes = checkedState.map((value, index) => {
            return { ...attributes[index], status: value, quantity: quantity[index] };
        });

        setAttributes(_attributes);
    }, [checkedState, quantity, setAttributes, attributes]);

    return (
        <div className="form-group mb-3">
            {attributes.map((attribute, index) => {
                return (
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
                        <input
                            type="number"
                            className={`form-control ${checkedState[index] ? "" : "readonly`"}`}
                            name="quantity"
                            id={`inputQuantity-${attribute.id}`}
                            onChange={(event) => handleQuantity(event, index)}
                            readOnly={!checkedState[index]} />
                    </div>
                );
            })}
        </div>
    );
};

export default AddAttributes;