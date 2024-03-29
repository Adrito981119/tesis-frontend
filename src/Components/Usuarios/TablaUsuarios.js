import React from 'react'
import { useEffect, useState} from 'react';
import {Button,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function TablaUsuarios() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      loadUsers()
  }, []);

  const loadUsers=()=>{
    axios.get('http://localhost:3001/auth/users',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      setUsers(res.data)
  },)
  }
  const onDelete = (id)=>{
    axios.delete(`http://localhost:3001/auth/users/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      alert(res.data)
      loadUsers()
    })
  }
  const resetPassword = (id)=>{
    axios.put(`http://localhost:3001/auth/users/resetpassword/${id}`,{headers: {'token': localStorage.getItem('token')}}).then((res)=>{
      alert(res.data)
    })
  }

  return (
    <div>
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
                <tr key={value.username}>
                    <td>{value.PersonalCi}</td>
                    <td>{value.username}</td>
                    <td><Button variant='warning' onClick={()=>{resetPassword(value.username)}}>Reiniciar</Button></td>
                    <td><Button variant='danger' onClick={()=>{onDelete(value.username)}}>Eliminar</Button></td>
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