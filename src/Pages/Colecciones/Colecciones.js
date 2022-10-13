import {React} from 'react'
import TablaColeccion from '../../Components/Colecciones/TablaColeccion.js'
import {Tab, Tabs, Button,Card} from 'react-bootstrap';
import axios from 'axios';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import Formulario from '../../Components/Formulario.js';
import Menu from '../../Components/Menu/Menu'

function Colecciones() {

  
  const initialValues={
      id:'',
      nombreVulgar:'',
      nombreCientifico:'',
      nombreFamilia:'',
      posicion:'',
      cant:''
  }

  const onSubmit=(data)=>{
    axios.post('http://localhost:3001/api/coleccion',data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    console.log(res.status)
    window.location.reload(false)
  })

}

  const coleccionSchema= Yup.object().shape({
    id: Yup.string().required('Este campo es obligatorio'),
    nombreVulgar:Yup.string().required('Este campo es obligatorio'),
    nombreCientifico:Yup.string().required('Este campo es obligatorio'),
    nombreFamilia:Yup.string().required('Este campo es obligatorio'),
    posicion:Yup.string(),
    cant:Yup.number('El valor debe ser un numero').positive('La cantidad no puede ser un numero menor que 0').required('Este campo es obligatorio'),
  })


  return (
  <div>
    <Menu/>
    <Tabs defaultActiveKey='tabla' className='mb-3'>
      <Tab eventKey='tabla' title='Tabla de colecciones'><TablaColeccion /></Tab>
      <Tab eventKey='formulario' title='Crear coleccion'>

      <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
        <Card.Body>
          <Card.Title>Nueva coleccion</Card.Title>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={coleccionSchema}>
            <Form>

            <Formulario campos={[
              {label: 'ID', data: 'id', type: 'text'},
              {label: 'Nombre Vulgar', data: 'nombreVulgar', type: 'text'},
              {label: 'Nombre Cientifico', data: 'nombreCientifico', type: 'text'},
              {label: 'Nombre Familia', data: 'nombreFamilia', type: 'text'},
              {label: 'Posicion', data: 'posicion', type: 'text'},
              {label: 'Cantidad de individuos', data: 'cant', type: 'text'}
            ]}/>


            <div style={{marginTop: '35px'}}>
            <Button variant='success' type='submit'>Crear Coleccion</Button>
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

export default Colecciones