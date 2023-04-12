import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


function UserDropDown({isAllowed, setIsAllowed, user, setUsuario}:{isAllowed:boolean, setIsAllowed:Function, user:string, setUsuario:Function}) {
   
    const navigate = useNavigate()
    // const [toggle, setToggle] = useState(false);
    const usuario = {
      Email:'', 
      Pwd:''
    }

    // const handleClick = () => {
    // setToggle(!toggle)
    // }

   const logOff = () => {
    setUsuario(usuario)
    setIsAllowed(false)
    navigate("/login")
   }

   const logIn = () => {
    navigate("/login")
   }

    const showLogOff = () => <li className="link-dropLst dropdown-item" onClick={logOff}>Cerrar sesión</li>
    const showLogIn = () => <li className="link-dropLst dropdown-item" onClick={logIn}>Iniciar sesión</li>

    return(
        // <div className="nav-link dropdown-toggle text-black" onClick={handleClick}>
        //     <BiUserCircle size={36}/> {isAllowed ? user:''}
        //   {toggle && (
        //     <ul className={toggle ? "list-group": "scale-down-ver-top"}>
        //       {isAllowed ? showLogOff(): showLogIn()}
        //     </ul>
        //   )}
        // </div>
        
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