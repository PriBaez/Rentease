import { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";

const UsersPanel = () => {
    const [users, setUsers] = useState([] as any[]);

    useEffect(() => {
            fetch('https://localhost:7272/api/User')
            .then((response) => response.json())
            .then((data) =>  setUsers(data))
    }, []);

    return(
        <div className="card m-5">
        <div className="card-body">
            <h2 className="card-title">Usuarios de la plataforma</h2>
            <hr />
            <br />
            <NavLink to={'/cpanel/Users/add'} className="btn btn-success">Agregar nuevo Usuario</NavLink>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return(
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>
                        <td> <NavLink to={'/cpanel/users/edit/' + user.id} type="button"
                            className={'btn btn-sm btn-warning me-1'}>Editar</NavLink>

                            <NavLink to={'/cpanel/users/rm/' + user.id} type="button"
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

export default UsersPanel;