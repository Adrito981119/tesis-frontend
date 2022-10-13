import React from 'react'
import { useEffect, useState} from 'react';
import {Button,Table,Alert,InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Pages/Colecciones/Colecciones.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {BsFillEmojiFrownFill} from 'react-icons/bs'

function TablaColeccion() {
  let navigator = useNavigate();

  const [colecciones, setColecciones] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:3001/api/coleccion',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    if(res.data.error){
        alert(res.data.err)
      }else{    
        setColecciones(res.data)}
    },)
}, []);

  return (
    <div>
      <div name='filtrado'>
      </div>
      <div name='tabla de colecciones'>
      {
        colecciones.length===0?
        <>
        <Alert variant='danger' style={{textAlign: 'center'}}>No existen elementos para mostrar <BsFillEmojiFrownFill/></Alert>
        </>:
        <>
          <label className='form-label'>Filtrar elementos</label>
          <InputGroup>
            <Form.Control placeholder='ID'></Form.Control>
            <Form.Control placeholder='Nombre Vulgar'></Form.Control>
            <Form.Control placeholder='Nombre cientifico'></Form.Control>
            <Form.Control placeholder='Nombre familia'></Form.Control>
          </InputGroup>
         <Table striped hover style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Vulgar</th>
              <th>Nombre Cientifico</th>
              <th>Nombre de la familia</th>
              <th>Posicion</th>
              <th>Cantidad de individuos</th>
              <th>Ver Ficha</th>
            </tr>
          </thead>
          <tbody>
          {colecciones.map((value)=>{
              return (
              <tr key={value.id}>
              <td>{value.id}</td>
              <td>{value.nombreVulgar}</td>
              <td>{value.nombreCientifico}</td>
              <td>{value.nombreFamilia}</td>
              <td>{value.posicion}</td>
              <td>{value.cant}</td>
              <td><Button variant='primary' onClick={()=>{navigator('/colecciones/'+value.id)}}>Ver</Button></td>
              </tr>
              )
            })} 
          </tbody>         
        </Table>
        </>
      }
      </div>   
    </div>
  )
}

export default TablaColeccion