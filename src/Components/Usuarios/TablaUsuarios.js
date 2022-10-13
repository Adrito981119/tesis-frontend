import React from 'react'
import { useEffect, useState} from 'react';
import {Button,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function TablaUsuarios() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
    axios.get('http://localhost:3001/auth/users',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
          setUsers(res.data)
      },)
  }, []);

  return (
    <div>
        <div name='filtrado'>
        <label className='form-label'>Filtrar elementos</label>
{/*         <InputGroup>
          <Form.Control placeholder='Fecha inicio'></Form.Control>
          <Form.Control placeholder='Fecha limite'></Form.Control>
        </InputGroup> */}
        </div>
        <div name='tabla de colecciones'>
          <Table striped hover style={{textAlign: 'center'}}>
            <thead>
              <tr>
                <th>Dueño</th>
                <th>Usuario</th>
                <th>Reiniciar contraseña</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
            {users.map((value)=>{
                
                return (
                <tr key={value.owner}>
                    <td>{value.owner}</td>
                    <td>{value.username}</td>
                    <td><Button variant='warning'>Reiniciar</Button></td>
                    <td><Button variant='danger'>Eliminar</Button></td>
                </tr>
                )
              })} 
            </tbody>         
          </Table>
        </div>
    </div>
  )
}

export default TablaUsuarios