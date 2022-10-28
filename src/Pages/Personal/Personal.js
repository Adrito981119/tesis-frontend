import {React,useRef} from 'react'
import TablaPersonal from '../../Components/Personal/TablaPersonal.js';
import {Tab, Tabs,Card,Button,Container,Row,Col} from 'react-bootstrap';
import './Personal.css'
import axios from 'axios';
import {Formik, Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import Menu from '../../Components/Menu/Menu'



function Personal() {
   const pRef = useRef()
    const initialValues={
        ci:'',
        fullname:'',
        email:'',
        telefono:'',
        cargo:''
    }
  
    const onSubmit=(data,{resetForm})=>{
        const person = {
          ci: data.ci,
          fullname: data.fullname,
          email: data.email.toLowerCase(),
          telefono: data.telefono,
          cargo: data.cargo
        }
      axios.post('http://localhost:3001/api/personal',person,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      pRef.current.Load()
      resetForm()
    })}



  const ciRegex = '^[0-9]+[0-9]$'
  const nameRegex = '^[a-zA-Z ]+[a-zA-Z ]$'
  const phoneRegex = '^[+53 ]+[5]+[0-9]+[0-9]$'
  
    const personaSchema= Yup.object().shape({
      ci: Yup.string().matches(ciRegex,{message: 'El carnet de identidad no puede contener letras'})
      .min(11,'El carnet de identidad debe contener 11 caracteres')
      .max(11,'El carnet de identidad debe contener 11 caracteres')
      .required('Este campo es obligatorio'),
      fullname:Yup.string().matches(nameRegex,{message: 'El nombre solo puede contener letras'}).required('Este campo es obligatorio'),
      email: Yup.string().email('No es un email valido'),
      telefono: Yup.string('Debe ser un NUMERO').matches(phoneRegex,{message: 'El formato no es valido. Ej: +53 55555555'}),
      cargo:Yup.string(),
    })
  return (
    <div className='component'>
      <Menu/>
      <Container fluid>
        <Tabs defaultActiveKey='tabla' className='mb-3'>
          <Tab eventKey='tabla' title='Tabla de personal'>
          <Row>
            <Col>
            <Card>
              <Card.Header>Personal</Card.Header>
              <Card.Body>
                <TablaPersonal ref={pRef}/>
              </Card.Body>
            </Card>
            </Col>
          </Row>

            
            </Tab>
          <Tab eventKey='formulario' title='Nuevo personal'>

          <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
            <Card.Body>
              <Card.Title>Personal</Card.Title>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={personaSchema}>
                <Form>
                  <Card.Text>Carnet de identidad:</Card.Text>
                  <Field className='form-control' id='ci' name='ci' placeholder='Carnet de identidad' />
                  <ErrorMessage name='ci' component='span' />
                  <Card.Text>Nombre completo:</Card.Text>
                  <Field className='form-control' id='fullname' name='fullname' placeholder='Los apellidos son opcionales' />
                  <ErrorMessage name='fullname' component='span' />
                  <Card.Text>Correo electrónico:</Card.Text>
                  <Field className='form-control' id='email' name='email' type='email' placeholder='Insensible a la mayuscula' />
                  <ErrorMessage name='ci' component='span' />
                  <Card.Text>Telefono</Card.Text>
                  <Field className='form-control' id='telefono' name='telefono' placeholder='Formato +53xxxxxxxx' />
                  <ErrorMessage name='telefono' component='span' />
                  <Card.Text>Cargo</Card.Text>
                  <Field className='form-control' id='cargo' name='cargo' />
                  <ErrorMessage name='ci' component='span' />
                <div style={{marginTop: '35px'}}>
                <Button variant='success' type='submit'>Añadir</Button>
                <Button variant='danger' type='button' style={{marginLeft:'15px'}}>Cancelar</Button>
                </div>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Tab>
        </Tabs>
    </Container>
    </div>
  )
}

export default Personal