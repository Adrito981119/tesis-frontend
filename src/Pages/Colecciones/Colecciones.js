import {React,useRef} from 'react'
import TablaColeccion from '../../Components/Colecciones/TablaColeccion.js'
import {Tab, Tabs, Button,Card, Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import Menu from '../../Components/Menu/Menu'
import { useNavigate } from 'react-router-dom';
import TablaRegistro from '../../Components/Colecciones/TablaRegistro.js';

function Colecciones() {
  const navigate = useNavigate()
  const tablaRef = useRef()
  const initialValues={
      id:'',
      nombreVulgar:'',
      nombreCientifico:'',
      nombreFamilia:'',
  }

  const onSubmit=(data,{resetForm})=>{
    axios.post('http://localhost:3001/api/coleccion',data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      tablaRef.current.Load()
      resetForm()
  })
  alert('Coleccion Creada')
}

  const coleccionSchema= Yup.object().shape({
    id: Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
    .required('Este campo es obligatorio'),
    nombreVulgar:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
    .required('Este campo es obligatorio'),
    nombreCientifico:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
    .required('Este campo es obligatorio'),
    nombreFamilia:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
    .required('Este campo es obligatorio'),
  })


  return (
  <div>
    <Menu/>
    <Container>
    <Tabs defaultActiveKey='tabla'>
      <Tab eventKey='tabla' title='Tabla de colecciones'>
        <Row>
          <Col>
          <Card>
            <Card.Header>Tabla de colecciones</Card.Header>
            <Card.Body>
              <TablaColeccion ref={tablaRef}/>
            </Card.Body>
          </Card>

          </Col>
        </Row>

      </Tab>

      <Tab eventKey='record' title='Registro de colecciones'>
        <Row>
          <Col>
          <Card>
            <Card.Header>Registro de colecciones</Card.Header>
            <Card.Body>
              <TablaRegistro/>
            </Card.Body>
          </Card>

          </Col>
        </Row>

      </Tab>

      <Tab eventKey='formulario' title='Crear coleccion'>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={coleccionSchema} >
      <Form>
                  <Card style={{width: '50%', margin: 'auto'}}>
                  <Card.Header>Crear colección</Card.Header>
                  <Card.Body>                 
                          <Card.Text>Id:</Card.Text>
                          <Field className='form-control' id='id' name='id' type='text' autoComplete='off'/>
                          <ErrorMessage name='id' component='span'/>
                          <Card.Text>Nombre vulgar:</Card.Text>
                          <Field className='form-control' id='nombreVulgar' name='nombreVulgar' type='text' autoComplete='off'/>
                          <ErrorMessage name='nombreVulgar' component='span'/>
                          <Card.Text>Nombre Científico:</Card.Text>
                          <Field className='form-control' id='nombreCientifico' name='nombreCientifico' type='text' autoComplete='off'/>
                          <ErrorMessage name='nombreCientifico' component='span'/>
                          <Card.Text>Familia de individuos:</Card.Text>
                          <Field className='form-control' id='nombreFamilia' name='nombreFamilia' type='text' autoComplete='off'/>
                          <ErrorMessage name='nombreFamilia' component='span'/>
                          <div style={{marginTop: '15px'}}>
                          <Button variant='success' type='submit'>Crear Coleccion</Button>
                          </div>
                          
                  </Card.Body>
                </Card>
      </Form>
    </Formik>
    </Tab>
    </Tabs>
    </Container>
    </div>
  )
}

export default Colecciones