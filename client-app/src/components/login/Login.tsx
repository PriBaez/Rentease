import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({usuario, setUsuario, setIsAllowed}: 
    {usuario:{Email:string, Pwd:string}, setUsuario:Function, setIsAllowed: Function }) => {

    const navigate = useNavigate();
    const [logInError, setLogInError] = useState<boolean>(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUsuario({...usuario, [name]:value})
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const inputValue = {
            Email: usuario.Email,
            Pwd: usuario.Pwd
        }

        try {
            let res = await fetch('https://localhost:7272/api/User/login', {
                method: 'POST',
                headers:  {'Content-type':'application/json; charset=UTF-8'},
                body: JSON.stringify(inputValue)
            });
            
            if(res.ok){
                setIsAllowed(true)
                navigate('/main')
            
            } else if (res.status === 401){
                navigate('/login')
                setLogInError(true);
                setIsAllowed(true);
            }


        } catch (error) {
        console.log(error)
        }
    }

    const showError = () => {
        if(logInError){
            return( 
            <div className="alert alert-danger" role="alert">datos incorrectos, por favor verifique y trate de nuevo</div>
            );    
        } 
    }

    return(
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong">
                    <div className="card-body p-5 text-center">
                        
                        {/* Mostrar mensaje de error al usuario */}
                        {logInError? showError():null}

                        <form onSubmit={handleSubmit}>
                        <h3 className="mb-5">Bienvenido</h3>

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
        </div>
    );
}

export default Login;