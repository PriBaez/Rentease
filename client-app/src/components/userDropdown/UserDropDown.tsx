import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


function UserDropDown({isAllowed, setIsAllowed, user, setUsuario}:{isAllowed:boolean, setIsAllowed:Function, user:string, setUsuario:Function}) {
   
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

    const showLogOff = () => <li className="link-dropLst dropdown-item" onClick={logOff}>Cerrar sesión</li>
    const showLogIn = () => <li className="link-dropLst dropdown-item" onClick={logIn}>Iniciar sesión</li>

    return(  
       <li className="nav-item dropdown">
         <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <BiUserCircle size={36}/> {isAllowed ? user:''}
          </a>
          <ul className="dropdown-menu">
            {isAllowed ? showLogOff(): showLogIn()}
          </ul>
       </li>
    );
}

export default UserDropDown;