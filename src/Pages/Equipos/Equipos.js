import React from 'react'
import axios from 'axios'
import {Container, Row,Col,Button} from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TablaEquipos from '../../Components/Equipos/TablaEquipos'
import Formulario from '../../Components/Formulario'
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
    <div>
    <Container fluid='true'>
        <Row mb-1='true'>

          <Col name='tabla'>
            <TablaEquipos />
          </Col>

          <Col name="formulario">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={teamSchema}>
                <Form>
                    <Formulario campos={[
                    {label: 'Nombre', data: 'nombre', placeholder: 'Nombre del equipo'}
                    ]} />
                    <Button variant='success' type='submit' style={{marginTop: '10px'}}>Añadir equipo</Button>
                </Form>
            </Formik>
          </Col>  
        </Row>
    </Container>
    </div>
  )
}

export default Equipos