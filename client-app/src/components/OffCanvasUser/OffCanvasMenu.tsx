import { useNavigate, NavLink } from 'react-router-dom';
import {GrUserSettings} from "react-icons/gr"
import {BiBuildingHouse, BiMoneyWithdraw, BiLogOut, BiUserCircle} from "react-icons/bi"
import AdminSection from '../Admin/AdminSection';


const OffCanvasMenu = ({isAllowed, setIsAllowed, user, setUsuario, isAdmin}
    :{isAllowed:boolean, setIsAllowed:Function, user:string, setUsuario:Function, isAdmin:boolean}) => {

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

    const showLogOff = () => <li className="list-group-item mb-1" role='button' onClick={logOff}><span className="me-1"><BiLogOut/></span>Cerrar sesión</li>
    
    return(
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header pb-0">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel"><BiUserCircle size={30}/> {user}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body pt-1">
                <div>
                    <ul className="mb-4">
                        <li className="list-group-item mb-1"><NavLink to={'/properties/myProperties'} 
                        className="text-decoration-none text-secondary"> 
                            <span className="text-secondary me-1">
                                <BiBuildingHouse/>
                            </span>Mis propiedades</NavLink>
                        </li>

                        

                        <li className="list-group-item mb-1"><NavLink to={'/Properties/MyOffers'} 
                        className="text-decoration-none text-secondary"> 
                           <span className="text-secondary me-1">
                            <BiMoneyWithdraw/></span>Mis ofertas</NavLink>
                        </li>

                        <li className="list-group-item mb-1"><NavLink to={'/myUser'} className='text-secondary text-decoration-none'><span className="me-1 text-secondary"><GrUserSettings/></span>Mi usuario</NavLink></li>
                        {isAllowed ? showLogOff(): null}
                    </ul>
                    
                    {isAdmin ? <AdminSection/>:null}
                </div>
            </div>
        </div>
    )
}

export default OffCanvasMenu;