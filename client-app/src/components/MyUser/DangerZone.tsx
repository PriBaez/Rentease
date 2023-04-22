import { Fragment, useEffect, useState } from "react"
import { BiEraser, BiPencil, BiUserCircle } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const DangerZone = ({userId}:{userId:number}) => {
    const navigate = useNavigate()
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
                    navigate("/")
                  }, 3000);
            }

           } catch (error:any) {
            console.log(error.message)
            setFail(true)
                setTimeout(() => {
                    setFail(false)
                    navigate("/")
                  }, 3000);
           }
    }


    return(
        <Fragment>
            <div className="d-flex justify-content-center m-5">
                <div className="col-8 col-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="card mb-5">
                        <h5 className="card-header">
                           Zona de peligro
                        </h5>
                        <div className="card-body">
                            {ok ? <div className="alert alert-success">Se aplicaron los cambios a la cuenta</div>: null}
                            {fail ? <div className="alert alert-danger">Algo salio mal por favor trate de nuevo</div>: null}
                            
                            <div className="d-flex container justify-content-center">
                                   <div className="alert alert-outline alert-warning">
                                        El cambiar tu contraseña hara que salgas de tu cuenta y tengas que volver a entrar.
                                   </div>
                            </div>
                            
                            <form className="form-floating" onSubmit={handleSubmit}>
                                
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" name="pwd"
                                    id="floatingPwdValue"
                                     onChange={handleChange}/>
                                    <label htmlFor="floatingPwdValue">Escribe tu nueva contraseña</label>
                                </div>

                                <button type="submit" className="btn btn-primary me-3 mt-3 mb-2">
                                    Guardar
                                </button>
                                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
)}

export default DangerZone;