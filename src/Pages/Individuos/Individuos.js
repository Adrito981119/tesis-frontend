import React from 'react'
import {Tab, Tabs, Card, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import Formulario from '../../Components/Formulario.js';
import SelectComponent from '../../Components/SelectComponent.js';
import TablaIndividuos from '../../Components/Individuos/TablaIndividuos.js';
import { useNavigate } from 'react-router-dom';

function Individuos() {
    const navigator = useNavigate()
    const initialValues={
        id:'',
        nombreVulgar:'',
        nombreCientifico:'',
        nombreFamilia:'',
        posicion:'',
        diametro:'',
        altura:'',
        coleccionID: ''
    }
  
    const onSubmit=(data)=>{
      axios.post('http://localhost:3001/api/individuos',data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      console.log(res.data);
      window.location.reload(false)
    });
  }
  
    const coleccionSchema= Yup.object().shape({
        id: Yup.string().required('Este campo es obligatorio'),
        nombreVulgar:Yup.string().required('Este campo es obligatorio'),
        nombreCientifico:Yup.string().required('Este campo es obligatorio'),
        nombreFamilia:Yup.string().required('Este campo es obligatorio'),
        posicion:Yup.string(),
        diametro: Yup.number().required(),
        altura: Yup.number().required(),
        coleccionID: Yup.string().required('Los individuos deben pertenecer a una coleccion')
    })


  return (
    <div>
        <Tabs defaultActiveKey='tabla' className='mb-3'>
      <Tab eventKey='tabla' title='Tabla de individuos'><TablaIndividuos /></Tab>
      <Tab eventKey='formulario' title='Crear individuo'>

      <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
        <Card.Body>
          <Card.Title>Nuevo individuo</Card.Title>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={coleccionSchema}>
            <Form>
            <Formulario campos={[
              {label: 'ID', data: 'id', type: 'text'},
              {label: 'Nombre Vulgar', data: 'nombreVulgar', type: 'text'},
              {label: 'Nombre Cientifico', data: 'nombreCientifico', type: 'text'},
              {label: 'Familia de individuos', data: 'nombreFamilia', type: 'text'},
              {label: 'Posicion', data: 'posicion', type: 'text'},
              {label: 'Altura', data: 'altura', type: 'text'},
              {label: 'Diametro', data: 'diametro', type: 'text'},
            ]}/>
            <Row>
            <label className='form-label'>Coleccion a la q pertenece</label>
              <Col>
              <SelectComponent ruta='http://localhost:3001/api/coleccion' name='coleccionID' id='coleccionID'/>
              </Col>
              <Col>
                <Button variant='primary' onClick={()=>{navigator('/colecciones')}}>Crear Coleccion</Button>
              </Col>
            </Row>
            <div style={{marginTop: '35px'}}>
            <Button variant='success' type='submit'>Añadir individuo</Button>
            <Button variant='danger' type='button' style={{marginLeft:'15px'}}>Cancelar</Button>
            </div>
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </Tab>
    </Tabs>
    </div>
  )
}

export default Individuos