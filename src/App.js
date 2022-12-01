import './App.css';
import {useEffect ,useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login/Login.js'
import Colecciones from './Pages/Colecciones/Colecciones.js';
import ColeccionProfile from './Pages/Colecciones/ColeccionProfile';
import Individuos from './Pages/Individuos/Individuos';
import IndividuosProfile from './Pages/Individuos/IndividuosProfile';
import Personal from './Pages/Personal/Personal';
import PersonProfile from './Pages/Personal/PersonProfile';
import Tareas from './Pages/Tareas/Tareas'
import Usuarios from './Pages/Usuarios/Usuarios'
import Mapa from './Pages/Mapa/Mapa';
import DeadEnd from './Pages/DeadEnd';
import {AuthContext} from './helpers/AuthContext';
import { AdminContext } from './helpers/AdminContext';

function App() {
  const [authState,setAuthState] = useState(false)
  const [adminState,setAdminState] = useState(false)
  useEffect(
    ()=>{
      verifyLogin()
    },[]
  )

  const verifyLogin=()=>{
      axios.get('http://localhost:3001/auth/verify',
      {headers: {'token': localStorage.getItem('token'),'user': localStorage.getItem('user')}})
      .then((response)=>{
        if(response.data.error){
          setAuthState(false)
        }else{
          if(response.data === 0 || response.data === 1){
            setAdminState(true)
          }
          setAuthState(true) 
        }

  });
  }
  return (
    <div> 
      <AuthContext.Provider value={{authState,setAuthState}}>
      <AdminContext.Provider value={{adminState,setAdminState}}> 
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          {
            authState?
            <>
            <Route path='/mapa' element={<Mapa/>}/> 
          <Route path='/colecciones' element={<Colecciones/>}/>
          <Route path='/colecciones/:id' element={<ColeccionProfile/>}/>
          <Route path='/individuos' element={<Individuos/>}/>
          <Route path='/individuos/:id' element={<IndividuosProfile/>}/>
          <Route path='/tareas' element={<Tareas/>}/>               
            {
            adminState?
            <>
          <Route path='/personal' element={<Personal/>}/>
          <Route path='/personal/:ci' element={<PersonProfile/>}/>
          <Route path='/usuarios' element={<Usuarios/>}/>
            </>:
            <>
            </>
          }        
            </>:<></>
          }

          <Route path='*' element={<DeadEnd/>}/>
        </Routes>
      </Router>
      </AdminContext.Provider>
      </AuthContext.Provider>
  </div> 
  );
}


export default App;
