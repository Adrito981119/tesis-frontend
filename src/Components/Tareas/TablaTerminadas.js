import React from 'react'
import { useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import {Table,Alert,Button,OverlayTrigger,Popover} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {BsFillCalendarXFill}from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/es';
import { useNavigate } from 'react-router-dom';
const TablaTerminadas = forwardRef(
  (props,ref)=>{
    
    const [taskList, setTaskList] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
      Load()
  }, []);

  const Load=()=>{
    axios.get('http://localhost:3001/api/tareas/cumplidas',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
          setTaskList(res.data)
      },)
  }
  useImperativeHandle(ref,()=>({
    Load
  }))
  return (
    <div>
      {
        taskList.length===0?
        <><Alert variant='danger' style={{textAlign: 'center', marginTop: '25px'}}>No existe elementos para mostrar <BsFillCalendarXFill/></Alert></>:
        <>
        <div name='tabla de colecciones'>
          <Table striped hover style={{textAlign: 'center'}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Fecha de cumplimiento</th>
                <th>Fecha de inicio</th> 
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
            {taskList.map((value)=>{
                return (
                <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{moment(value.fechacumplida).locale('es').format('DD [de] MMMM [del] YYYY')}</td>
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
                </tr>
                )
              })} 
            </tbody>         
          </Table>
        </div></>
      }
    </div>
  )
  }
)

export default TablaTerminadas