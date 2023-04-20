import { NavLink } from 'react-router-dom';
import OffCanvasUserIcon from '../OffCanvasUser/OffCanvasUserIcon';

const NavBarIn = ({usuario, isAllowed}:{usuario:string, isAllowed:boolean}) => {
    return(
        <nav className="navbar navbar-expand-md bg-light navbar-fixed-top">
            <div className="container-fluid">
                <NavLink to={'/main'} className="navbar-brand">Rentease</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
               
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Propiedades
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink to={'/properties'} end={true} className="dropdown-item">Explorar</NavLink></li>
                                <li><NavLink to={'/properties/add'} className="dropdown-item">Vender/Alquilar</NavLink></li>
                            </ul>
                        </li>

                    </ul>
                    <ul className="navbar-nav my-sm-0 navbar-nav-scroll d-flex">
                        <form className="d-flex my-sm-2 " role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </ul>
                    
                    <ul className="navbar-nav ms-auto align-items-end">
                        <div className='nav-item dropdown me-auto align-items-end'>
                            {/* <UserDropDown user={usuario} isAllowed={isAllowed} setUsuario={setUsuario} setIsAllowed={setIsAllowed}/> */}
                            <OffCanvasUserIcon isAllowed={isAllowed} user={usuario}/>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
        );
}

export default NavBarIn