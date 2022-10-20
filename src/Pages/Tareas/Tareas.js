import {React, useEffect, useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Container, Row,Col,Card,Button, Tab, Tabs} from 'react-bootstrap'
import { Formik, Form,Field, ErrorMessage} from 'formik'
import Formulario from '../../Components/Formulario'
import * as Yup from 'yup'
import TablaTareas from '../../Components/Tareas/TablaTareas'
import TablaTerminadas from '../../Components/Tareas/TablaTerminadas'
import Menu from '../../Components/Menu/Menu'
import {BsFillCalendarPlusFill}from 'react-icons/bs'


function Tareas() {

  const navigator = useNavigate()

  const initialValues={
      fechainicio:'',
      fechafin:'',
      descripcion:'',
      cumplida: false,
      fechacumplida: null,
  }

  const onSubmit=(data)=>{
    axios.post('http://localhost:3001/api/tareas',data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    console.log(res.data);
    window.location.reload(false)
  });
}


  const tareaSchema= Yup.object().shape({
      fechainicio: Yup.date().required('Este campo es obligatorio'),
      fechafin:Yup.date().required('Este campo es obligatorio'),
      descripcion:Yup.string().required('Este campo es obligatorio'),
  })
  
  return (
    <div className='component'>
      <Menu/>
      <Container fluid>
      <Tabs>
        <Tab eventKey='pendientes' title='Tareas pendientes'>
              <Row>
                <Col name='tabla'>
                  <Card>
                    <Card.Header>Nueva Tarea</Card.Header>
                    <Card.Body>
                      <TablaTareas />
                      </Card.Body>
                  </Card>
                </Col>

                <Col name="formulario">
                  <Card style={{width: '95%'}}> 
                    <Card.Title style={{alignSelf: 'center'}}>Programar tarea</Card.Title>
                    <Card.Body>
                      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={tareaSchema}>
                        <Form>
                          <Formulario campos={[
                              {label:'Fecha de inicio', data:'fechainicio', type: 'date'},
                              {label:'Fecha limite', data:'fechafin', type: 'date'},
                          ]}/>
                          <Card.Text>Descripcion</Card.Text>
                          <Field as='textarea' name='descripcion' className="form-control" placeholder="Descripcion"></Field>
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