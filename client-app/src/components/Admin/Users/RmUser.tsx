import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"

const RmUser = () => {
    
    const {id} = useParams()
    const navigate = useNavigate()
    const [ok, setOk] = useState(false)
    const [fail, setFail] = useState(false)
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
        fetch('https://localhost:7272/api/User/' + id)
        .then((response) => response.json())
        .then((data) => {
            setUser(data)
            console.log(data)
        })
    }, [])

    const handleSubmit = async (e:any) => {
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
                method: 'DELETE',
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
        {ok ? <div className="alert alert-success">Atributo eliminado exitosamente</div>:null }
        {fail ? <div className="alert alert-danger">El Atributo no pudo ser eliminado, por favor trate de nuevo</div>:null }
        <form onSubmit={handleSubmit}>
            <h5 className="card-title">¿Desea eliminar el siguiente atributo?</h5>
                <input type="hidden" name="id" defaultValue={user.id} />
                <p className="card-text">Nombre: {user.name}</p>
                <div className="my-2">
                    <NavLink to={'/cpanel/Users'} type="button" className="btn btn-dark me-2">Volver a la lista</NavLink>
                    <button type="submit" className="btn btn-danger">Estoy seguro</button>
                </div>
        </form>
      </div>
    </div>
    )
}

export default RmUser;