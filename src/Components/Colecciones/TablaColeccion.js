import React from 'react'
import { useEffect, useState} from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Pages/Colecciones/Colecciones.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function TablaColeccion() {
  let navigator = useNavigate();

  const [listColeccion, setListColeccion] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:3001/api/coleccion',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    if(res.data.error){
        alert(res.data.err)
      }else{    
        setListColeccion(res.data)}
    },)
}, []);

  return (
    <div>
      <div name='filtrado'>
      <label className='form-label'>Filtrar elementos</label>
      <InputGroup>
        <Form.Control placeholder='ID'></Form.Control>
        <Form.Control placeholder='Nombre Vulgar'></Form.Control>
        <Form.Control placeholder='Nombre cientifico'></Form.Control>
        <Form.Control placeholder='Nombre familia'></Form.Control>
      </InputGroup>
      </div>
      <div name='tabla de colecciones'>
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
          {listColeccion.map((value)=>{
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
      </div>   
    </div>
  )
}

export default TablaColeccion