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


function MembersTable() {
    let navigator = useNavigate();
    const [listTeams, setListTeams] = useState([]);
  
    useEffect(() => {
    axios.get('http://localhost:3001/api/equipos',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      if(res.data.error){
          alert(res.data.err)
        }else{    
          setListTeams(res.data)}
      },)
  }, []);

  return (
    <div>
                <div name='filtrado'>
        <label className='form-label'>Filtrar elementos</label>
        <InputGroup>
          <Form.Control placeholder='ID'></Form.Control>
          <Form.Control style={{width: '50%'}} placeholder='Nombre'></Form.Control>
        </InputGroup>
        </div>
        <div name='tabla de colecciones'>
          <Table striped hover style={{textAlign: 'center'}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Cantidad de miembros</th>
                <th>Ver Ficha</th>
              </tr>
            </thead>
            <tbody>
            {listTeams.map((value)=>{
                return (
                <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.nombre}</td>
                    <td>0</td>
                <td><Button variant='primary' onClick={()=>{navigator('/equipos/'+value.id)}}>Ver</Button></td>
                </tr>
                )
              })} 
            </tbody>         
          </Table>
        </div> 
    </div>
  )
}

export default MembersTable