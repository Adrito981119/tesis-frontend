import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login/Login.js'
import Home from './Pages/Home/Home.js'
import Colecciones from './Pages/Colecciones/Colecciones.js';
import ColeccionProfile from './Pages/Colecciones/ColeccionProfile';
import Individuos from './Pages/Individuos/Individuos';
import IndividuosProfile from './Pages/Individuos/IndividuosProfile';
import Personal from './Pages/Personal/Personal';
import PersonProfile from './Pages/Personal/PersonProfile';
import Tareas from './Pages/Tareas/Tareas'
import Usuarios from './Pages/Usuarios/Usuarios'
import Mapa from './Pages/Mapa/Mapa';
function App() {
  return (
    <div>        
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/colecciones' element={<Colecciones/>}/>
          <Route path='/colecciones/:id' element={<ColeccionProfile/>}/>
          <Route path='/individuos' element={<Individuos/>}/>
          <Route path='/individuos/:id' element={<IndividuosProfile/>}/>
          <Route path='/personal' element={<Personal/>}/>
          <Route path='/personal/:ci' element={<PersonProfile/>}/>
          <Route path='/tareas' element={<Tareas/>}/>
          <Route path='/usuarios' element={<Usuarios/>}/>
          <Route path='/mapa' element={<Mapa/>}/>
        </Routes>
      </Router>
  </div> 
  );
}


export default App;
