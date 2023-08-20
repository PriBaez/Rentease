import { Fragment } from "react"
import {GrUserAdmin, GrUserWorker} from "react-icons/gr"
import {MdOutlineEditAttributes} from "react-icons/md"
import {FiUsers} from "react-icons/fi"
import {BsKey} from "react-icons/bs"
import { NavLink } from "react-router-dom"

const AdminSection = () => {
    return(
        <Fragment>
            <h6 className="h6 mb-2"><span className="me-1"><GrUserAdmin size={20}/></span> Panel administrador</h6>
            <ul className="mt-1">
                <li className="list-group-item mb-1">
                    <NavLink to={'/cpanel/users'} 
                    className="text-decoration-none text-secondary"> 
                        <span className="me-1"><FiUsers/></span>Usuarios
                    </NavLink>
                </li>
                    
                <li className="list-group-item mb-1">
                    <NavLink to={'/cpanel/Propertyattributes'} 
                    className="text-decoration-none text-secondary">
                        <span className="me-1">
                        <MdOutlineEditAttributes/></span>Atributos de las propiedades
                    </NavLink>
                </li>

                <li className="list-group-item mb-1">
                    <NavLink to={'/cpanel/roles'} 
                    className="text-decoration-none text-secondary">
                        <span className="me-1"><GrUserWorker/></span>Roles
                    </NavLink>
                </li>

                <li className="list-group-item mb-1">
                    <NavLink to={'/cpanel/rolesXoperation'} 
                    className="text-decoration-none text-secondary">
                        <span className="me-1"><BsKey/></span>Roles x operacion
                    </NavLink>
                </li>

            </ul>
        </Fragment>
    )
}

export default AdminSection