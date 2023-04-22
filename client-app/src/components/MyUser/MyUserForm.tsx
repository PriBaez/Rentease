// import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { BiUserCircle, BiPencil, BiEraser } from "react-icons/bi";
import DangerZone from "./DangerZone";


const MyUserForm = ({userId}:{userId:number}) => {
    
    const [roles, setRoles] = useState([] as any [])
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        pwd: '',
        phone: '',
        createdAt: '',
        role: 0
    })

    const [ok, setOk] = useState<boolean>(false)
    const [fail, setFail] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState(false)
 
    
    useEffect(() => {
        Promise.all([fetch('https://localhost:7272/api/User/' + userId),
        fetch('https://localhost:7272/api/Role'),
    
    ])
    .then(([resUser, resRole]) => 
        Promise.all([resUser.json(), resRole.json()]))
        .then(([dataUser, dataRole]) => {
            setUser(dataUser)
            setRoles(dataRole)
        })
        .catch((err) => {
            console.log(err.message);
        })

    }, [userId])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({...user, [name]:value})
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const inputValue = {
            id: user.id,
            name: user.name,
            email: user.email,
            pwd: user.pwd,
            phone: user.phone,
            createdAt: user.createdAt,
            role: user.role
        }

        try {
            let res = await fetch('https://localhost:7272/api/User/' + userId, {
                method: 'PUT',
                headers:  {'Content-type':'application/json; charset=UTF-8'},
                body: JSON.stringify(inputValue)
            });
            
            if(res.ok) 
            {
                setOk(true)
                setTimeout(() => {
                    setOk(false)
                  }, 3000);
            }

           } catch (error) {
            console.log(error)
            setFail(true)
                setTimeout(() => {
                    setFail(false)
                  }, 3000);
           }
    }


    return(
        <Fragment>
            <div className="d-flex justify-content-center m-5">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                    <div className="card mb-5">
                        <h5 className="card-header">
                            Informacion de mi cuenta
                        </h5>
                        <div className="card-body">
                            {ok ? <div className="alert alert-success">Se aplicaron los cambios a la cuenta</div>: null}
                            {fail ? <div className="alert alert-danger">Algo salio mal por favor trate de nuevo</div>: null}
                            
                            <div className="d-flex container justify-content-center">
                               <div>
                                    <BiUserCircle size={80}/>  
                               </div> 
                            </div>
                            <div className="d-flex justify-content-center">
                                <p>se unió el { new Date(user.createdAt).toDateString()}</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-link text-end ms-1 text-decoration-none"
                                    onClick={() => setIsEditing(!isEditing)}>
                                    <BiPencil size={20}/> Editar
                                </button>
                                <button className="btn btn-link text-end ms-1 text-decoration-none">
                                    <BiEraser size={20}/> Eliminar cuenta
                                </button>
                            </div>
                            <form className="form-floating" onSubmit={handleSubmit}>
                                
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="name"
                                    id="floatingNameValue" readOnly={isEditing ? false:true} 
                                    value={user.name} onChange={handleChange}/>
                                    <label htmlFor="floatingNameValue">Nombre</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="phone"
                                    id="floatingPhoneValue" readOnly={isEditing ? false:true}  
                                    value={user.phone} onChange={handleChange}/>
                                    <label htmlFor="floatingPhoneValue">Telefono</label>
                                </div>

                                {/* <div className="form-floating">
                                    <select className="form-select" id="floatingSelect" 
                                    aria-label="Floating label select example" name="role" 
                                    value={user.role} disabled={isEditing ? false:true} 
                                    onChange={handleChange}>
                                        <option disabled defaultValue={0}>Roles a elegir...</option>
                                        {roles.map((role, index) => {
                                            return(
                                                <option key={index} value={parseInt(role.id)}>{role.name}</option>
                                            )
                                        })}
                                    </select>
                                    <label htmlFor="floatingSelect">Roles</label>
                                </div> */}
                                
                                {isEditing ? (<button type="submit" className="btn btn-primary me-3 mt-3 mb-2">
                                            <i className="bi bi-person-check me-1"></i>Guardar</button>)
                                            :
                                            null
                                }
                            </form>

                            <div className="container mt-3">
                                <DangerZone userId={userId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MyUserForm;