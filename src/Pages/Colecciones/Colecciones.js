import {React,useRef} from 'react'
import TablaColeccion from '../../Components/Colecciones/TablaColeccion.js'
import {Tab, Tabs, Button,Card, Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import Menu from '../../Components/Menu/Menu'

function Colecciones() {

  const initialValues={
      id:'',
      nombreVulgar:'',
      nombreCientifico:'',
      nombreFamilia:'',
      posicion:'',
      cant: '',
  }

  const onSubmit=(data)=>{
    axios.post('http://localhost:3001/api/coleccion',data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      window.location.reload(false)
  })

}

  const coleccionSchema= Yup.object().shape({
    id: Yup.string().required('Este campo es obligatorio'),
    nombreVulgar:Yup.string().required('Este campo es obligatorio'),
    nombreCientifico:Yup.string().required('Este campo es obligatorio'),
    nombreFamilia:Yup.string().required('Este campo es obligatorio'),
    posicion:Yup.string(),
    cant: Yup.number().positive()
  })


  return (
  <div className='component'>
    <Menu/>
    <Container fluid>
    <Tabs defaultActiveKey='tabla'>
      <Tab eventKey='tabla' title='Tabla de colecciones'>
        <Row>
          <Col>
          <Card>
            <Card.Header>Tabla de colecciones</Card.Header>
            <Card.Body>
              <TablaColeccion/>
            </Card.Body>
          </Card>

          </Col>
        </Row>

      </Tab>

      <Tab eventKey='formulario' title='Crear coleccion'>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={coleccionSchema}>
      <Form>
        <Row>
            <Col>
                  <Card bg='light'>
                  <Card.Body>
                    <Card.Header>Id y nombres</Card.Header>
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
                  </Card.Body>
                </Card>
            </Col>

            <Col>
            <Card bg='light'>
                  <Card.Body>
                    <Card.Header>Posicion</Card.Header>
                          <Card.Text>Posicion:</Card.Text>
                          <Field className='form-control' id='posicion' name='posicion' type='text' autoComplete='off' />
                          <ErrorMessage name='posicion' component='span'/>
                          <Card.Text>Cantidad de elementos:</Card.Text>
                          <Field className='form-control' id='cant' name='cant' type='text' autoComplete='off' />
                          <ErrorMessage name='cant' component='span'/>
                  </Card.Body>
                </Card>

                <Row style={{marginTop: '5px', alignContent: 'center'}}>
                <Col>
                <Card bg='light'  style={{width: '50%'}}>
                    <Card.Body>
                      <Button variant='success' type='submit'>Crear Coleccion</Button>
                      <Button variant='danger' type='button' style={{marginLeft:'15px'}}>Cancelar</Button>
                    </Card.Body>
                </Card>
                </Col>
              </Row>

            </Col>
      </Row>
      </Form>
    </Formik>
    </Tab>
    </Tabs>
    </Container>
    </div>
  )
}

export default Colecciones