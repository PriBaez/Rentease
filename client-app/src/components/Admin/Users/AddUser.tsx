import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"


const AddUser = () => {
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
        fetch('https://localhost:7272/api/Role')
        .then((response) => response.json())
        .then((data) => setRoles(data))
    }, [])

    
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
            let res = await fetch('https://localhost:7272/api/User', {
                method: 'POST',
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
        <div className="card m-5">
            <div className="card-body">
                <h3 className="card-title">Registrar usuarios</h3>
                <hr />
                <br />
                {ok ? <div className="alert alert-success">Usuario guardado exitosamente</div>:null }
                {fail ? <div className="alert alert-danger">El usuario no se pudo guardar, por favor trate de nuevo</div>:null }
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="name" name="name" onChange={handleChange}/>
                        <label htmlFor="name" className="form-label">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" name="email" onChange={handleChange}/>
                        <label htmlFor="email" className="form-label">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="phone" name="phone" onChange={handleChange}/>
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                    </div>
                   
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" 
                        aria-label="Floating label select example" name="role" 
                        onChange={handleChange}>
                            <option defaultValue={0} value={0}>Roles a elegir...</option>
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

export default AddUser