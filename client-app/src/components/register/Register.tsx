import { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()
    const [ok, setOk] = useState(false);

    const [usuario, setUsuario] = useState({
        Id: 0,
        Name: '',
        Pwd: '',
        Email: '',
        Phone: '',
        CreatedAt: new Date(),
        Role: 1
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUsuario({...usuario, [name]:value});
        console.log(usuario)
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const inputValue = {
            Id: usuario.Id,
            Name: usuario.Name,
            Pwd: usuario.Pwd,
            Email: usuario.Email,
            Phone: usuario.Phone,
            CreatedAt: usuario.CreatedAt,
            Role: usuario.Role
        }

        try {
            const res = await fetch('https://localhost:7272/api/User', {
                method: 'POST',
                headers:  {'Content-type':'application/json; charset=UTF-8'},
                body: JSON.stringify(inputValue)
            });
            
            if (res.status === 200)
            {
                setOk(true);
                const timer = setTimeout(() => navigate('/login'), 4000)
                return () => clearTimeout(timer)
            }

           } catch (error) {
            console.log(error)
           }
    }

    const showRegisterStatus = () => {

        if(ok){
            return(
            <div className="alert alert-success" role="alert">usuario registrado correctamente</div>
            );
        } else {
            return( 
            <div className="alert alert-danger" role="alert">lo sentimos, su usuario no pudo ser registrado. Trate nuevame</div>
            );
        }
    }
    
    
    return(
        <section className="vh-100 overflow-auto">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-md-6 col-xl-5">
                        <div className="card shadow-2-strong mb-5">
                            <div className="card-body p-5 text-center">

                                    {ok? showRegisterStatus():null}
                                <form onSubmit={handleSubmit}>
                                <h3 className="mb-5">Registrate</h3>

                                    <div className="form-outline mb-4">
                                        <input type="text" id="inputName" className="form-control form-control-md"
                                        name='Name' onChange={handleChange} />
                                        <label className="form-label" htmlFor="inputName">Nombre</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text" id="inputPhone" className="form-control form-control-md"
                                        name='Phone' onChange={handleChange} />
                                        <label className="form-label" htmlFor="inputPhone">Telefono</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="email" id="inputEmail" className="form-control form-control-md" 
                                        name='Email' onChange={handleChange}/>
                                        <label className="form-label" htmlFor="inputEmail">Correo electronico</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="inputPwd" className="form-control form-control-md" 
                                        name='Pwd' onChange={handleChange}/>
                                        <label className="form-label" htmlFor="inputPwd">Contraseña</label>
                                    </div>

                                    <button className="btn btn-primary btn-md btn-block" type="submit">Acceder</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Register;