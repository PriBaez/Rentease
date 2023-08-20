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
import { UsuarioInfo } from './interface/UsuarioInfo';
import AttributesPanel from './components/Admin/Attributes/AttributesPanel';
import EditAttribute from './components/Admin/Attributes/EditAttribute';
import RmAttribute from './components/Admin/Attributes/RmAttribute';
import AddAttribute from './components/Admin/Attributes/AddAttribute';
import UsersPanel from './components/Admin/Users/UsersPanel';
import AddUser from './components/Admin/Users/AddUser';
import EditUser from './components/Admin/Users/EditUser';
import RmUser from './components/Admin/Users/RmUser';
import RolesPanel from './components/Admin/Roles/RolesPanel';
import AddRole from './components/Admin/Roles/AddRole';
import EditRole from './components/Admin/Roles/EditRole';
import RmRole from './components/Admin/Roles/RmRole';


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
  
  const usuarioInfo: UsuarioInfo = {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email,
    phone: usuario.phone,
    role: usuario.role
  }

  return (
    <BrowserRouter>
        {isAllowed ? <NavBarIn usuario={usuario.name} isAllowed={isAllowed}/>: <NavBarOut usuario={usuario.name} setUsuario={setUsuario} isAllowed={isAllowed} setIsAllowed={setIsAllowed}/>}
        {isAllowed ? <OffCanvasMenu isAllowed={isAllowed} 
                        setIsAllowed={setIsAllowed} 
                        user={usuario.name} 
                        setUsuario={setUsuario}
                        isAdmin={usuario.role === 1} />
                      :null}
        <Routes>
          {/* Ruta no protegida que propaga los estados de autenticacion y datos de usuario */}
          <Route path="/" element={<Login usuario={usuario} setUsuario={setUsuario} 
          setIsAllowed={setIsAllowed}/>}/>

          {/* Ruta no protegida */}
          <Route path="/register" element={<Register/>}/>
  
          {/* Rutas protegidas que son dependientes de la raiz 
          padre properties (details/:id, add, myProperties) */}
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

          {/* Rutas protegidas que no tienen ni son dependientes */}
          <Route element={<ProtectedRoutes isAllowed={isAllowed} redirectTo="/" children={undefined}/>} >
            <Route path="/myUser" element={<MyUserForm userId={usuario.id}/>}/>  
          </Route>

          {/* Rutas protegidas que son dependientes de la raiz 
          padre properties (details/:id, add, myProperties) */}
          
          <Route path='cpanel' element={<ProtectedRoutes isAllowed={isAllowed && usuarioInfo.role === 1} 
            redirectTo='/' children={undefined}/>}>
            <Route path='Propertyattributes'>
              <Route index={true} element={<AttributesPanel/>} />
              <Route path='add' element={<AddAttribute/>} />
              <Route path='edit/:id' element={<EditAttribute/>} />
              <Route path='rm/:id' element={<RmAttribute/>}/>
            </Route>

            <Route path='users'>
                <Route index={true} element={<UsersPanel/>} />
                <Route path='add' element={<AddUser/>} />
                <Route path='edit/:id' element={<EditUser/>} />
                <Route path='rm/:id' element={<RmUser/>}/>
            </Route>

            <Route path='roles'>
                <Route index={true} element={<RolesPanel/>} />
                <Route path='add' element={<AddRole/>} />
                <Route path='edit/:id' element={<EditRole/>} />
                <Route path='rm/:id' element={<RmRole/>}/>
            </Route>
          </Route>


          

        </Routes>
    </BrowserRouter>
  );
}

export default App;
