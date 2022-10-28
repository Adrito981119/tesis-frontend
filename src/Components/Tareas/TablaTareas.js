import {React, useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import {Button,Table,Alert} from 'react-bootstrap';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CustomModal from '../CustomModal';
import * as Yup from 'yup'
import {BsFillCalendarXFill}from 'react-icons/bs'

const TablaTareas= forwardRef(
  (props,ref)=>{

    const [taskList, setTaskList] = useState([]);
  
    useEffect(() => {
      LoadTask()
  }, []);

  const LoadTask=()=>{
    axios.get('http://localhost:3001/api/tareas/pendientes',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      setTaskList(res.data)
  },)
  }

  useImperativeHandle(ref,()=>({
    LoadTask
  }))

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

const onDelete=(id)=>{
  axios.delete(`http://localhost:3001/api/tareas/${id}`,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
    LoadTask()
  })
}

  return (
    <div>
        {
          taskList.length===0?
          <>
          <Alert variant='danger' style={{textAlign: 'center', marginTop: '25px'}}>No existen tareas programadas <BsFillCalendarXFill/></Alert>
          </>:
          <>
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
                          
                      <td>
                          <Button variant='primary' disabled>Reprogramar</Button>
                      </td>
                      <td>
                       <Button variant='warning' disabled>Reasignar</Button>
                      </td>
                      <td>
                        <Button variant='success' onClick={()=>{cumplir(value.id)}}>Cumplida</Button>
                      </td>

                      <td>
                        <CustomModal name='Eliminar' title='Eliminar tarea' buttonStyle='danger'
                          body={
                            <p>¿Estás seguro que desea eliminar este elemento?</p>
                          }
                          footer={
                            <Button variant='danger' onClick={()=>{onDelete(value.id)}}>Eliminar</Button>
                          }
                        />
                      </td>
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
)

export default TablaTareas