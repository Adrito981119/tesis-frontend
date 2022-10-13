import React from 'react'
import { useEffect, useState} from 'react';
import {Button,Table,InputGroup,Card,Modal} from 'react-bootstrap';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Pages/Colecciones/Colecciones.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Formulario from '../../Components/Formulario'
import CustomModal from '../CustomModal';
import * as Yup from 'yup'

function TablaTareas() {
    let navigator = useNavigate();
    const [taskList, setTaskList] = useState([]);
  
    useEffect(() => {
    axios.get('http://localhost:3001/api/tareas/pendientes',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
          setTaskList(res.data)
      },)
  }, []);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cumplir = (id)=>{
    const timestamp= Date.now()
    const date = Date(timestamp)
    const data ={
      cumplida: true,
      fechacumplida: date
    }

    axios.put(`http://localhost:3001/api/tareas/cumplir/${id}`,data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    console.log(res.data)
    window.location.reload(false)
    })
  }


  const initialValues={
    fechainicio:'',
    fechafin:'',
}

const Reprogramar=(data)=>{
    console.log(data)
}

const Reasignar=(data)=>{
  console.log(data)
}


  const tareaSchema= Yup.object().shape({
    fechainicio: Yup.date().required('Este campo es obligatorio'),
    fechafin:Yup.date().required('Este campo es obligatorio'),
})

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
                <th>Fecha de inicio</th>
                <th>Fecha limite</th>
                <th>Descripcion</th>
                <th>Reprogramar</th>
                <th>Reasignar</th>
                <th>Cumplida</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
            {taskList.map((value)=>{
                
                return (
                <tr key={value.fechainicio}>
                    <td>{value.fechainicio}</td>
                    <td>{value.fechafin}</td>
                    <td>{value.descripcion}</td>
                    
                <td><CustomModal name='Reprogramar' title='Reprogramar fechas' buttonStyle='primary'
                      body= {
                          <Formik initialValues={initialValues} onSubmit={Reprogramar} validationSchema={tareaSchema}>
                          <Form>
                          <Formulario campos={[
                              {label:'Fecha de inicio', data:'fechainicio', type: 'date'},
                              {label:'Fecha limite', data:'fechafin', type: 'date'},
                          ]}/>
                          <Button style={{marginTop: '15px'}}>Reprogramar</Button>
                          </Form>
                        </Formik>
                      }
                /></td>

                <td><Button variant='success' >Reasignar</Button></td>

                <td><CustomModal name='Cumplida' title='Cumplir tarea' buttonStyle='success'
                body='Estas seguro que desea dar la tarea por cumplida. Se registrara la fecha actual'
                footer={
                  <>
                  <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                  <Button variant="success" onClick={()=>{cumplir(value.id)}}>Aceptar</Button>
                  </>
                }
                /></td>

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

export default TablaTareas