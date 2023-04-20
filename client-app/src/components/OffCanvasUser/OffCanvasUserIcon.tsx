import { BiUserCircle } from "react-icons/bi";


const OffCanvasUserIcon = ({isAllowed, user}:{isAllowed:boolean, user:string}) => {
    return(
        <button className="btn btn-link text-decoration-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <BiUserCircle size={36}/> {isAllowed ? user:''}
        </button>
        
    )
}

export default OffCanvasUserIcon;