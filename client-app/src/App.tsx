import React, { useState } from 'react';
import './App.css';
import Register from './components/register/Register';
import  './bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/main/Main';
import ProtectedRoutes from './components/routing/ProtectedRoutes';
import NavBarIn from './components/navbar/NavBarIn';
import AddProperty from './components/properties/AddProperty';
import PropertiesDetails from './components/properties/PropertiesDetails';
import NavBarOut from './components/navbar/NavBarOut';
import MyProperties from './components/properties/MyProperties';
import Properties from './components/properties/Properties';
import OffCanvasMenu from './components/OffCanvasUser/OffCanvasMenu';
import MyUserForm from './components/MyUser/MyUserForm';
import MyOffers from './components/MyOffers/MyOffers';
import Collections from './components/Collection/Collections';


function App() {
  
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [usuario, setUsuario] = useState({
    id: 0,
    name: '',
    pwd: '',
    email: '',
    phone: '',
    createdAt: new Date(),
    role: 0
  });
  
  const usuarioInfo = {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email,
    phone: usuario.phone
  }

  return (
    <BrowserRouter>
        {isAllowed ? <NavBarIn usuario={usuario.name} isAllowed={isAllowed}/>: <NavBarOut usuario={usuario.name} setUsuario={setUsuario} isAllowed={isAllowed} setIsAllowed={setIsAllowed}/>}
        {isAllowed ? <OffCanvasMenu isAllowed={isAllowed} setIsAllowed={setIsAllowed} user={usuario.name} setUsuario={setUsuario} />:null}
        <Routes>
          <Route path="/" element={<Login usuario={usuario} setUsuario={setUsuario} 
          setIsAllowed={setIsAllowed}/>}/>
          
          <Route path="/register" element={<Register/>}/>
          <Route path='/collections' element={<Collections/>}/>

          <Route path="/properties">
            <Route index={true} element={<Properties userId={usuario.id}/>} />
            <Route path="details/:id" element={<PropertiesDetails usuarioInfo={usuarioInfo} />}/>
            <Route element={<ProtectedRoutes isAllowed={isAllowed} 
            redirectTo='/' children={undefined}/>}>
              <Route path='add' element={<AddProperty usuarioInfo={usuarioInfo} />} />
              <Route path='myProperties' element={<MyProperties usuarioId={usuarioInfo.id} />} />
              <Route path='MyOffers' element={<MyOffers userId={usuarioInfo.id} />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoutes isAllowed={isAllowed} redirectTo="/" children={undefined}/>} >
            <Route path="/main" element={<Main usuario={usuario.name} />}/>  
            <Route path="/myUser" element={<MyUserForm userId={usuario.id}/>}/>  
          </Route>
      
        </Routes>
    </BrowserRouter>
  );
}

export default App;
