import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"

const EditRole = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ok, setOk] = useState(false)
    const [fail, setFail] = useState(false)
    const [role, setRole] = useState({
        id: 0,
        name: ''
    })
    
    useEffect(() => {
        const obtenerAtributos = async () => {
            await fetch('https://localhost:7272/api/Role/' + id)
            .then((response) => response.json())
            .then((data) =>  setRole(data))
       
        };

        obtenerAtributos();
    }, [id]);

    const handleChanges = (e:any) => {
        const { name, value } = e.target;
        setRole({...role, [name]:value})
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        const inputValue = {
            id: role.id,
            name: role.name
        }

        try {
            let res = await fetch('https://localhost:7272/api/Role/' + id, {
                method: 'PUT',
                headers:  {'Content-type':'application/json; charset=UTF-8'},
                body: JSON.stringify(inputValue)
            });
            
            if(res.ok) 
            {
                setOk(true)
                setTimeout(() => {
                    setOk(false)
                    navigate('/cpanel/roles')
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
            {ok ? <div className="alert alert-success">Rol agregado  exitosamente</div>:null }
            {fail ? <div className="alert alert-danger">El rol no pudo ser agregado, por favor trate de nuevo</div>:null }
            <h3 className="card-title">Editar rol</h3>
            <form className="form-floating" onSubmit={handleSubmit}>
                <input type="text" className="form-control" id="floatingInputValue" 
                placeholder="Baños" onChange={handleChanges} name="name" value={role.name}/>
                <label htmlFor="floatingInputValue">Nombre del rol</label>
                <div className="mt-3">
                <NavLink to={'/cpanel/roles'} type="button" className="btn btn-dark me-2">Volver a la lista</NavLink>
                    <button className="btn btn-success" type="submit">Guardar</button>
                </div>
                </form>
        </div>
    </div>
    )
}

export default EditRole;