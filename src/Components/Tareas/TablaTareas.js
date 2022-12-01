import {React, useEffect, useState,forwardRef,useImperativeHandle,useRef} from 'react';
import {Table,Alert,Dropdown, DropdownButton,OverlayTrigger,Popover,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import moment from 'moment';
import {BsFillCalendarXFill}from 'react-icons/bs';
import 'moment/locale/es';
import TablaTerminadas from './TablaTerminadas';

const TablaTareas= forwardRef(
  (props,ref)=>{
    const navigate = useNavigate()
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
      cumplida:true,
      fechacumplida: date
    }
      axios.put(`http://localhost:3001/api/tareas/cumplir/${id}`,data,{headers:{'token': localStorage.getItem('token')}}).then(
        ()=>{
          LoadTask()
          window.location.reload(false)
        }
       )

  }

const onDelete=(id)=>{
  axios.delete(`http://localhost:3001/api/tareas/${id}`,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
    LoadTask()
  })
}

  return (
    <div>
        {
          taskList.length===0?
          <Alert variant='danger' style={{textAlign: 'center', marginTop: '25px'}}>No existen tareas programadas <BsFillCalendarXFill/></Alert>
          :
          <div name='tabla de colecciones'>
            <Table striped hover style={{textAlign: 'center'}}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha limite</th>
                  <th>Descripción</th>
                  <th>Tipo de tarea</th>
                </tr>
              </thead>
              <tbody>
              {taskList.map((value)=>{
                      
                  return (
                  <tr key={value.id}>
                      <td>{value.id}</td>
                      <td>{moment(value.fechainicio).locale('es').format('DD [de] MMMM [del] YYYY')}</td>
                      <td>{moment(value.fechafin).locale('es').format('DD [de] MMMM [del] YYYY')}</td>
                      <td>{value.descripcion}</td>
                      <td>
                        {
                        value.Mantenimientos.length !==0 ?
                          <>                
                          <OverlayTrigger 
                          trigger={['click']}
                          placement='auto' 
                          overlay={
            
                            <Popover>
                            <Popover.Header>
                              Individuos
                            </Popover.Header>
                            <Popover.Body>
                            <Table>
                                      <thead>
                                        <tr>
                                          <th>Id de individuo</th>
                                          <th>Ver datos</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {
                                          value.Mantenimientos.map(
                                            (value)=>{
                                              return(
                                                <tr key={value.IndividuoId}>
                                                  <td>{value.IndividuoId}</td>
                                                  <td><Button onClick={()=>{navigate(`/individuos/${value.IndividuoId}`)}}>Ver datos</Button></td>
                                                </tr>
                                              )
                                            }
                                          )
                                        }
                                      </tbody>
                          </Table>                           
                            </Popover.Body>
                          </Popover>
            
                          }           
                          >
                          <Alert variant='danger'>Mantenimiento</Alert>
                          </OverlayTrigger></>
                        :
                        <Alert variant='success'>Otras</Alert>  
                      }
                      </td>
                      <td>
                        <DropdownButton title='Opciones' variant='secondary'>
                          <Dropdown.Item onClick={()=>{cumplir(value.id)}}>Cumplida</Dropdown.Item>
                          <Dropdown.Item onClick={()=>{onDelete(value.id)}}>Cancelar</Dropdown.Item>
                        </DropdownButton>                            
                      </td>
                  </tr>
                  )
                })} 
              </tbody>         
            </Table>
          </div>
        }
    </div>
  )
}
)

export default TablaTareas