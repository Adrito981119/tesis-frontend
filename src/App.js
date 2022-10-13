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
import Equipos from './Pages/Equipos/Equipos';
import EquipoProfile from './Pages/Equipos/EquipoProfile';
import Tareas from './Pages/Tareas/Tareas'
import DeadEnd from './Pages/DeadEnd';
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
          <Route path='/equipos' element={<Equipos />}/>
          <Route path='/equipos/:id' element={<EquipoProfile />}/>
          <Route path='/tareas' element={<Tareas/>}/>
          <Route path='*' element={<DeadEnd />} />
        </Routes>
      </Router>
  </div> 
  );
}


export default App;
