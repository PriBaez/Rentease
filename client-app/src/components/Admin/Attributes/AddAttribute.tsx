import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const AddAttribute = () => {

    const navigate = useNavigate()
    const [ok, setOk] = useState(false)
    const [fail, setFail] = useState(false)
    const [attribute, setAttribute] = useState({
        id: 0,
        description: '',
        status: true
    })

    const handleChanges = (e:any) => {
        const { name, value } = e.target;
        setAttribute({...attribute, [name]:value})
        console.log(attribute)
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        const inputValue = {
            id: attribute.id,
            description: attribute.description,
            status: true
        }

        try {
            let res = await fetch('https://localhost:7272/api/Attribute', {
                method: 'POST',
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
        {ok ? <div className="alert alert-success">Attributo agregado  exitosamente</div>:null }
        {fail ? <div className="alert alert-danger">El Atributo no pudo ser agregado, por favor trate de nuevo</div>:null }
          <h3 className="card-title">Crear nuevo attributo</h3>
          <form className="form-floating" onSubmit={handleSubmit}>
            <input type="text" className="form-control" id="floatingInputValue" 
            placeholder="Baños" onChange={handleChanges} name="description"/>
            <label htmlFor="floatingInputValue">Nombre del attributo</label>
            <div className="mt-3">
            <NavLink to={'/cpanel/Propertyattributes'} type="button" className="btn btn-dark me-2">Volver a la lista</NavLink>
                <button className="btn btn-success" type="submit">Guardar</button>
            </div>
            </form>
        </div>
      </div>
    )
}

export default AddAttribute;