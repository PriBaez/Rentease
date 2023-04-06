import React, { useState } from 'react';
import './App.css';
import Register from './components/register/Register';
import  './bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/main/Main';
import ProtectedRoutes from './components/routing/ProtectedRoutes';
import NavBarIn from './components/navbar/NavBarIn';
import Properties from './components/properties/Properties';
import AddProperty from './components/properties/AddProperty';


function App() {
  
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [usuario, setUsuario] = useState({
    Email: '',
    Pwd: '',
  });
  
  return (
    <BrowserRouter>
      <NavBarIn usuario={usuario.Email} setUsuario={setUsuario} isAllowed={isAllowed}/>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login usuario={usuario} setUsuario={setUsuario} 
        setIsAllowed={setIsAllowed}/>}/>
        
        <Route element={<ProtectedRoutes isAllowed={isAllowed} redirectTo="/login" children={undefined}/>} >
          <Route path="/main" element={<Main usuario={usuario.Email} />}/>  
          <Route path="/properties">
            <Route index={true} element={<Properties/>} />
            <Route path="add" element={<AddProperty/>}/>
          </Route>
        </Route>
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
