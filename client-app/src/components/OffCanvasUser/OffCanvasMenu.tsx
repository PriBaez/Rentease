import { useNavigate, NavLink } from 'react-router-dom';
import {GrUserAdmin, GrUserSettings, GrUserWorker} from "react-icons/gr"
import {BiBuildingHouse, BiMoneyWithdraw, BiUser, BiLogIn, BiLogOut, BiUserCircle} from "react-icons/bi"
import {MdOutlineEditAttributes} from "react-icons/md"
import {FiUsers} from "react-icons/fi"
import {BsKey} from "react-icons/bs"


const OffCanvasMenu = ({isAllowed, setIsAllowed, user, setUsuario}:{isAllowed:boolean, setIsAllowed:Function, user:string, setUsuario:Function}) => {

    const navigate = useNavigate()
    const usuario = {
      Email:'', 
      Pwd:''
    }

   const logOff = () => {
    setUsuario(usuario)
    setIsAllowed(false)
    navigate("/")
   }

   const logIn = () => {
    navigate("/")
   }

    const showLogOff = () => <li className="list-group-item mb-1" onClick={logOff}><span className="me-1"><BiLogOut/></span>Cerrar sesión</li>
    const showLogIn = () => <li className="list-group-item mb-1" onClick={logIn}><span className="me-1"><BiLogIn/>Iniciar sesión</span></li>
    
    return(
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header pb-0">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel"><BiUserCircle size={30}/> {user}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body pt-1">
                <div>
                    <ul className="mb-4">
                        <li className="list-group-item mb-1"><NavLink to={'/properties/myProperties'} className="text-decoration-none text-secondary"><span className="text-secondary me-1"><BiBuildingHouse/></span>Mis propiedades</NavLink></li>
                        <li className="list-group-item mb-1"><span className="me-1"><BiMoneyWithdraw/></span>Mis ofertas</li>
                        <li className="list-group-item mb-1"><NavLink to={'/myUser'} className='text-secondary text-decoration-none'><span className="me-1 text-secondary"><GrUserSettings/></span>Mi usuario</NavLink></li>
                        {isAllowed ? showLogOff(): showLogIn()}
                    </ul>
                    <h6 className="h6 mb-2"><span className="me-1"><GrUserAdmin size={20}/></span> Panel administrador</h6>
                    <ul className="mt-1">
                        <li className="list-group-item mb-1"><span className="me-1"><FiUsers/></span>Usuarios</li>
                        <li className="list-group-item mb-1"><span className="me-1"><MdOutlineEditAttributes/></span>Atributos de las propiedades</li>
                        <li className="list-group-item mb-1"><span className="me-1"><GrUserWorker/></span>Roles</li>
                        <li className="list-group-item mb-1"><span className="me-1"><BsKey/></span>Roles x operacion</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OffCanvasMenu;