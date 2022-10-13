import React from 'react'
import { useEffect, useState} from 'react';
import {Button,Table,InputGroup,Form,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Pages/Colecciones/Colecciones.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TablaTerminadas() {

    const [taskList, setTaskList] = useState([]);
  
    useEffect(() => {
    axios.get('http://localhost:3001/api/tareas/cumplidas',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
          setTaskList(res.data)
      },)
      
  }, []);

  return (
    <div>

        <div name='filtrado'>
        <label className='form-label'>Filtrar elementos</label>
        <InputGroup>
          <Form.Control placeholder='Fecha de cumplimiento'></Form.Control>
        </InputGroup>  
        </div>


        <div name='tabla de colecciones'>
          <Table striped hover style={{textAlign: 'center'}}>
            <thead>
              <tr>
                <th>Fecha de cumplimiento</th>
                <th>Fecha de inicio</th>
                <th>Fecha limite</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
            {taskList.map((value)=>{
                return (
                <tr key={value.fechacumplida}>
                    <td>{value.fechacumplida}</td>
                    <td>{value.fechainicio}</td>
                    <td>{value.fechafin}</td>
                    <td>{value.descripcion}</td>
                </tr>
                )
              })} 
            </tbody>         
          </Table>
        </div>
    </div>
  )
}

export default TablaTerminadas