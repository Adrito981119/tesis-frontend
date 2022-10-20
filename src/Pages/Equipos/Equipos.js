import React from 'react'
import axios from 'axios'
import {Container, Row,Col,Button,Card} from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TablaEquipos from '../../Components/Equipos/TablaEquipos'
import Formulario from '../../Components/Formulario'
import Menu from '../../Components/Menu/Menu'
import './Equipos.css'

function Equipos() {

  const initialValues={
    nombre:'',
}

const onSubmit=(data)=>{
  axios.post('http://localhost:3001/api/equipos',data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
  console.log(res.status)
  window.location.reload(false)
})

}

const teamSchema= Yup.object().shape({
  nombre: Yup.string().required('Este campo es obligatorio'),
})

  return (
    <div className='component'>
      <Menu/>
    <Container fluid='true'>
        <Row>
        <Col name='tabla'>
            <Card>
              <Card.Header>Equipos de trabajo</Card.Header>
              <Card.Body>
              <TablaEquipos />
              </Card.Body>
            </Card>
            
          </Col>

          <Col name="formulario" >
            <Card>
              <Card.Header>Crear equipo</Card.Header>
              <Card.Body>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={teamSchema}>
                <Form>
                    <Formulario campos={[
                    {label: 'Nombre', data: 'nombre', placeholder: 'Nombre del equipo'}
                    ]} />
                    <Button variant='success' type='submit' style={{marginTop: '10px'}}>Añadir equipo</Button>
                </Form>
            </Formik>
              </Card.Body>
            </Card>
          </Col>  
        </Row>
    </Container>
    </div>
  )
}

export default Equipos