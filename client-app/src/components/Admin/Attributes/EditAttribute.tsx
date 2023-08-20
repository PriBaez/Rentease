import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const EditAttribute = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [ok, setOk] = useState(false)
    const [fail, setFail] = useState(false)
    const [checked, setChecked] = useState(false)
    const [attribute, setAttribute] = useState({
        id: id,
        description: '',
        status: false
    })

    useEffect(() => {
        fetch('https://localhost:7272/api/Attribute/' + id)
        .then((response) => response.json())
        .then((data) => setAttribute(data))
    }, [id])

    const handleChanges = (e:any) => {
        const { name, value } = e.target;
        setAttribute({...attribute, [name]:value})
        console.log(attribute)
    }

    const handleChecked = (e:any) => {
        setChecked(e.target.checked)
        console.log(attribute)
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        const inputValue = {
            id: attribute.id,
            description: attribute.description,
            status: checked
        }

        try {
            let res = await fetch('https://localhost:7272/api/Attribute/' + id, {
                method: 'PUT',
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
        {ok ? <div className="alert alert-success">Attributo modificado exitosamente</div>:null }
        {fail ? <div className="alert alert-danger">El Atributo no pudo ser modificado, por favor trate de nuevo</div>:null }
            <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" defaultValue={attribute.id} />
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="description" 
                name="description" defaultValue={attribute.description} onChange={handleChanges} />
                <label htmlFor="description">Description</label>
            </div>
            <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="status" name="status" 
                defaultChecked={attribute.status} onChange={handleChecked} />
                <label className="form-check-label" htmlFor="status">Estado</label>
            </div>

            <div className="form-group mb-3">
                <NavLink to={'/cpanel/Propertyattributes'} type="button" className="btn btn-dark me-2">Volver a la lista</NavLink>
                 <button type="submit" className="btn btn-warning">Editar</button>
            </div>
            </form>
        </div>
      </div>
    )
}

export default EditAttribute;