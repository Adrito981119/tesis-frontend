import React from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigator = useNavigate();
  let logout =()=>{
    localStorage.removeItem('token')
    navigator('/')
  }

  return (
    <div>
    <div name='navbar'>
          <Navbar bg="dark">
            <Container fluid>
                <Nav>
                  <div>
                   <Navbar.Brand>Algo</Navbar.Brand>
                  </div>
                  <div className='botones'>
                  <Button className='boton' type='button' onClick={()=>{navigator('/colecciones')}}>Colecciones</Button>
                  <Button className='boton' type='button' onClick={()=>{navigator('/individuos')}}>Individuos</Button>
                  <Button className='boton' type='button' onClick={()=>{navigator('/personal')}}>Personal</Button>
                  <Button className='boton' type='button' onClick={()=>{navigator('/tareas')}}>Tareas</Button>
                  <Button className='boton' type='button' onClick={()=>{navigator('/equipos')}}>Equipos</Button>
                  <Button className='boton' type='button' onClick={()=>{navigator('/mapa')}}>Mapa</Button>
                </div>

                <div className='logout'>
                  <Button type='button'onClick={logout}>Cerrar Sesion</Button>
                </div>
               </Nav>
            </Container>
          </Navbar>
      </div>
   </div>
  )
}

export default Home