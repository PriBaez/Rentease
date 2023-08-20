import {format} from "date-fns"
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"

const EditUser = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [roles, setRoles] = useState([] as any [])
    const [ok, setOk] = useState<boolean>(false)
    const [fail, setFail] = useState<boolean>(false)
    const [user, setUser] = useState({
        id: 0,
        name: '',
        email: '',
        pwd: '',
        phone: '',
        createdAt: new Date(),
        role: 0
    })

    useEffect(() => {
        Promise.all([
            fetch('https://localhost:7272/api/User/' + id),
            fetch('https://localhost:7272/api/Role'),
        ])
        .then(([resUser, resRole]) => 
        Promise.all([resUser.json(), resRole.json()]))
        .then(([dataUser, dataRole]) => {
            setUser(dataUser);
            setRoles(dataRole);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }, [id])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({...user, [name]:value})
        console.log(value)
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
            let res = await fetch('https://localhost:7272/api/User/' + id, {
                method: 'PUT',
                headers:  {'Content-type':'application/json; charset=UTF-8'},
                body: JSON.stringify(inputValue)
            });
            
            if(res.ok) 
            {
                setOk(true)
                setTimeout(() => {
                    setOk(false)
                    navigate('/cpanel/Users')
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
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Registrar usuarios</h3>
                {ok ? <div className="alert alert-success">Usuario guardado exitosamente</div>: null }
                {fail ? <div className="alert alert-danger">El usuario no se pudo guardar, por favor trate de nuevo</div>:null }
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID</label>
                        <input type="text" className="form-control" id="id" name="id" value={user.id} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text" className="form-control" value={user.name} id="name" name="name" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" value={user.email} id="email" name="email" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input type="text" className="form-control" value={user.phone} id="phone" name="phone" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="created_at" className="form-label">Creado el</label>
                        <input type="date" className="form-control"  id="createdAt"  name="createdAt" 
                        value={format(new Date(user.createdAt), "yyyy-MM-dd")} onChange={handleChange}  />
                    </div>

                    <div className="form-floating">
                        <select className="form-select" id="floatingSelect" 
                        aria-label="Floating label select example" name="role" 
                        onChange={handleChange} value={user.role}>
                            <option disabled defaultValue={0}>Roles a elegir...</option>
                            {roles.map((role, index) => {
                                return(
                                    <option key={index} value={parseInt(role.id)}>{role.name}</option>
                                )
                            })}
                        </select>
                        <label htmlFor="floatingSelect">Roles</label>
                    </div>

                    <div className="mb-3">
                        <NavLink to={'/cpanel/Users'} type="button" className="btn btn-dark me-2">Volver a la lista</NavLink>
                        <button className="btn btn-success" type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser;