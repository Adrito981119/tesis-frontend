import React from 'react'
import TablaPersonal from '../../Components/Personal/TablaPersonal.js';
import {Tab, Tabs,Card,Button,Container,Row,Col} from 'react-bootstrap';
import './Personal.css'
import axios from 'axios';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import Formulario from '../../Components/Formulario.js';
import Menu from '../../Components/Menu/Menu'



function Personal() {
    const initialValues={
        ci:'',
        fullname:'',
        email:'',
        telefono:'',
        cargo:''
    }
  
    const onSubmit=(data)=>{
        const person = {
          ci: data.ci,
          fullname: data.fullname,
          email: data.email.toLowerCase(),
          telefono: data.telefono,
          cargo: data.cargo
        }
      axios.post('http://localhost:3001/api/personal',person,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      console.log(res.data);
      window.location.reload(false)
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
      <Container>
        <Tabs defaultActiveKey='tabla' className='mb-3'>
          <Tab eventKey='tabla' title='Tabla de personal'>
          <Row>
            <Col>
            <Card>
              <Card.Header>Personal</Card.Header>
              <Card.Body>
                <TablaPersonal />
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

                <Formulario campos={[
                    {label:'Carnet de identidad', data:'ci', type: 'text',placeholder: 'Carnet de identidad'},
                    {label:'Nombre completo', data:'fullname', type: 'text',placeholder: 'Los apellidos son opcionales', style: {textTransform: 'capitalize'} },
                    {label:'Email', data:'email', type: 'email',placeholder: 'Case insensitive'},
                    {label:'Telefono', data:'telefono', type: 'text',placeholder: 'Puede ser movil o fijo'},
                    {label:'Cargo', data:'cargo', type: 'text',placeholder: 'Plaza que ocupa'},
                ]}/>


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