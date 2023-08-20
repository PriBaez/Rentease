import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const RolesPanel = () => {
    const [roles, setRoles] = useState([] as any[]);

    useEffect(() => {
            fetch('https://localhost:7272/api/Role')
            .then((response) => response.json())
            .then((data) =>  setRoles(data))
    }, []);

    return(
    <div className="card m-5">
        <div className="card-body">
            <h2 className="card-title">Roles de la plataforma</h2>
            <hr />
            <br />
            <NavLink to={'/cpanel/roles/add'} className="btn btn-success">Agregar nuevo rol</NavLink>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => {
                return(
                    <tr key={index}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td> 
                          <NavLink to={'/cpanel/roles/edit/' + role.id} type="button"
                            className={'btn btn-sm btn-warning me-1'}>Editar</NavLink>

                            <NavLink to={'/cpanel/roles/rm/' + role.id} type="button"
                            className={'btn btn-sm btn-danger'}>Eliminar</NavLink></td>
                        </tr>
                )
              })}
            </tbody>
          </table>
        </div>
    </div>
    )
}

export default RolesPanel;