import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";


function UserDropDown({isAllowed, user, setUsuario}:{isAllowed:boolean, user:string, setUsuario:Function}) {
   
    const [toggle, setToggle] = useState(false);
    const usuario = {
      Email:'', 
      Pwd:''
    }

    const handleClick = () => {
    setToggle(!toggle)
    }

   const logOff = () => {
    setUsuario(usuario)
   }

    const showLogOff = () => <li className="log-off" onClick={logOff}>Cerrar sesión</li>
    const showLogIn = () => <NavLink to={'/login'}>Iniciar sesión</NavLink>

    return(
        <div className="text-black" onClick={handleClick}>
            <BiUserCircle size={36}/> {isAllowed ? user:''}
          {toggle && (
            <ul className={toggle ? "list-group": "scale-down-ver-top"}>
              {isAllowed ? showLogOff(): showLogIn()}
            </ul>
          )}
        </div>
    );
}

export default UserDropDown;