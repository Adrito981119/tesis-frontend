import React from 'react'
import { useEffect, useState} from 'react';
import {Button, Table,InputGroup,Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {BsFillEmojiFrownFill} from 'react-icons/bs'

function TablaEquipos() {
    let navigator = useNavigate();
  
    const [teams, setTeams] = useState([]);
  
    useEffect(() => {
    axios.get('http://localhost:3001/api/equipos',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      if(res.data.error){
          alert(res.data.err)
        }else{    
          setTeams(res.data)}
      },)
  }, []);
  
    return (
      <div>
        {
          teams.length===0?
          <>
          <Alert variant='danger' style={{textAlign: 'center', marginTop: '25px'}}>No existen elementos para mostrar <BsFillEmojiFrownFill/></Alert>
          </>:
          <>
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
            {teams.map((value)=>{
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
          </>
        }
      </div>
    )
  }

export default TablaEquipos