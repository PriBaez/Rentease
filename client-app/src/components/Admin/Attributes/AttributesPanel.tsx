import { Fragment, useEffect, useState } from "react"
import { NavLink } from "react-router-dom";


const AttributesPanel = () => {
    const [attributes, setAttributes] = useState([] as any[]);

    useEffect(() => {
        const obtenerAtributos = async () => {
            await fetch('https://localhost:7272/api/Attribute')
            .then((response) => response.json())
            .then((data) =>  setAttributes(data))
       
        };

        obtenerAtributos();
    }, []);


    return(
        <Fragment>
           <div className="card m-5">
            <div className="card-header">
                <h5 className="card-title">Atributos para disponibles</h5>
                <NavLink to={'/cpanel/Propertyattributes/add'} className="btn btn-success">Agregar nuevo attributo</NavLink>
            </div>
            <div className="card-body">
                <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {attributes.map((attribute) => (
                    <tr key={attribute.id}>
                        <td>{attribute.id}</td>
                        <td>{attribute.description}</td>
                        <td>{attribute.status ? 'Activo' : 'Inactivo'}</td>
                        <td>
                            <NavLink to={'/cpanel/Propertyattributes/edit/' + attribute.id} type="button"
                            className={'btn btn-sm btn-warning me-1'}>Editar</NavLink>

                            <NavLink to={'/cpanel/Propertyattributes/rm/' + attribute.id} type="button"
                            className={'btn btn-sm btn-danger'}>Eliminar</NavLink>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </Fragment>
    )
}

export default AttributesPanel;