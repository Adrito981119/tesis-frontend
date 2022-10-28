import {React, useEffect, useState,useRef} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Container, Row,Col,Card,Button, Tab, Tabs} from 'react-bootstrap'
import { Formik, Form,Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import TablaTareas from '../../Components/Tareas/TablaTareas'
import TablaTerminadas from '../../Components/Tareas/TablaTerminadas'
import Menu from '../../Components/Menu/Menu'
import {BsFillCalendarPlusFill}from 'react-icons/bs'


function Tareas() {
  const taskRef = useRef()

  const initialValues={
      fechainicio:'',
      fechafin:'',
      descripcion:'',
  }

  const onSubmit=(data,{resetForm})=>{
    const tarea ={
      fechainicio: data.fechainicio,
      fechafin: data.fechafin,
      descripcion: data.descripcion,
      cumplida: false,
      fechacumplida: null
    }
    axios.post('http://localhost:3001/api/tareas',tarea,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    taskRef.current.LoadTask()
    resetForm()
  });
}


  const tareaSchema= Yup.object().shape({
      fechainicio: Yup.date().required('Este campo es obligatorio'),
      fechafin:Yup.date().required('Este campo es obligatorio'),
      descripcion:Yup.string().required('Este campo es obligatorio'),
  })
  
  return (
    <div>
      <Menu/>
      <Container fluid='true'>
      <Tabs>
        <Tab eventKey='pendientes' title='Tareas pendientes'>
              <Row>
                <Col name='tabla'>
                  <Card>
                    <Card.Header>Nueva Tarea</Card.Header>
                    <Card.Body>
                      <TablaTareas ref={taskRef} />
                      </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card> 
                    <Card.Title style={{alignSelf: 'center'}}>Programar tarea</Card.Title>
                    <Card.Body>
                      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={tareaSchema}>
                        <Form>
                          <Card.Text>Fecha de inicio</Card.Text>
                          <Field className='form-control'  name='fechainicio' type='date'/>
                          <Card.Text>Fecha límite</Card.Text>
                          <Field className='form-control' name='fechafin' type='date'/>
                          <Card.Text>Descripción</Card.Text>
                          <Field as='textarea' name='descripcion' className="form-control" placeholder="Descripcion"/>
                          <ErrorMessage name='descripcion' component='span'></ErrorMessage>

                          <div style={{marginTop: '35px'}}>
                          <Button variant='success' type='submit'>Añadir</Button>
                          </div>
                        </Form>
                      </Formik>
                    </Card.Body>
                  </Card>
                </Col>  
              </Row>

        </Tab>

        <Tab eventKey='terminadas' title='Tareas completadas'>
          <TablaTerminadas />
        </Tab>
      </Tabs>
      </Container>
          </div>
  )
}

export default Tareas