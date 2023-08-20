import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"

const RmAttribute = () => {
    
    const {id} = useParams()
    const navigate = useNavigate()
    const [ok, setOk] = useState(false)
    const [fail, setFail] = useState(false)
    const [attribute, setAttribute] = useState({
        id: id,
        description: '',
        status: false
    })

    useEffect(() => {
        fetch('https://localhost:7272/api/Attribute/' + id)
        .then((response) => response.json())
        .then((data) => {
            setAttribute(data)
            console.log(data)
        })
    }, [])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        const inputValue = {
            id: attribute.id,
            description: attribute.description,
            status: attribute.status
        }

        try {
            let res = await fetch('https://localhost:7272/api/Attribute/' + id, {
                method: 'DELETE',
                headers:  {'Content-type':'application/json; charset=UTF-8'},
                body: JSON.stringify(inputValue)
            });
            
            if(res.ok) 
            {
                setOk(true)
                setTimeout(() => {
                    setOk(false)
                    navigate('/cpanel/Propertyattributes')
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
                <input type="hidden" name="id" defaultValue={attribute.id} />
                <p className="card-text">Nombre: {attribute.description}</p>
                <div className="my-2">
                    <NavLink to={'/cpanel/Propertyattributes'} type="button" className="btn btn-dark me-2">Volver a la lista</NavLink>
                    <button type="submit" className="btn btn-danger">Estoy seguro</button>
                </div>
        </form>
      </div>
    </div>
    )
}

export default RmAttribute;