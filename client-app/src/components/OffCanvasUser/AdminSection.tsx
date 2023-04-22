import { Fragment } from "react"
import {GrUserAdmin, GrUserWorker} from "react-icons/gr"
import {MdOutlineEditAttributes} from "react-icons/md"
import {FiUsers} from "react-icons/fi"
import {BsKey} from "react-icons/bs"

const AdminSection = () => {
    return(
        <Fragment>
            <h6 className="h6 mb-2"><span className="me-1"><GrUserAdmin size={20}/></span> Panel administrador</h6>
            <ul className="mt-1">
                <li className="list-group-item mb-1"><span className="me-1"><FiUsers/></span>Usuarios</li>
                <li className="list-group-item mb-1"><span className="me-1"><MdOutlineEditAttributes/></span>Atributos de las propiedades</li>
                <li className="list-group-item mb-1"><span className="me-1"><GrUserWorker/></span>Roles</li>
                <li className="list-group-item mb-1"><span className="me-1"><BsKey/></span>Roles x operacion</li>
            </ul>
        </Fragment>
    )
}

export default AdminSection