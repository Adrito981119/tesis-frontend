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

function TablaIndividuos() {

    let navigator = useNavigate();

    const [listIndividuos, setListIndividuos] = useState([]);
  
    useEffect(() => {
    axios.get('http://localhost:3001/api/individuos',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{  
          setListIndividuos(res.data)
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
            <th>Coleccion</th>
            <th>Nombre Vulgar</th>
            <th>Nombre Cientifico</th>
            <th>Nombre de la familia</th>
            <th>Posicion</th>
            <th>Altura</th>
            <th>Diametro</th>
            <th>Ver Ficha</th>
          </tr>
        </thead>
        <tbody>
        {listIndividuos.map((value)=>{
            return (
            <tr key={value.id}>
            <td>{value.id}</td>
            <td style={{cursor: 'pointer', fontWeight:'bold'}} onClick={()=>{navigator('/colecciones/'+value.coleccionID)}}>{value.coleccionID}</td>
            <td>{value.nombreVulgar}</td>
            <td>{value.nombreCientifico}</td>
            <td>{value.nombreFamilia}</td>
            <td>{value.posicion}</td>
            <td>{value.altura}</td>
            <td>{value.diametro}</td>
            <td><Button variant='primary' onClick={()=>{navigator('/individuos/'+value.id)}}>Ver</Button></td>
            </tr>
            )
          })} 
        </tbody>         
      </Table>
    </div>   
  </div>
  )
}

export default TablaIndividuos