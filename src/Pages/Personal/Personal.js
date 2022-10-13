import React from 'react'
import TablaPersonal from '../../Components/Personal/TablaPersonal.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import Formulario from '../../Components/Formulario.js';



function Personal() {
    const initialValues={
        ci:'',
        nombre:'',
        pApellido: null,
        sApellido: null,
        email:'',
        telefono:'',
        cargo:''
    }
  
    const onSubmit=(data)=>{
      const FullName = data.nombre.split(' ')
        const person = {
          ci: data.ci,
          nombre: FullName[0],
          pApellido: FullName[1],
          sApellido: FullName[2],
          email: data.email.toLowerCase(),
          telefono: data.telefono,
          cargo: data.cargo
        }
      axios.post('http://localhost:3001/api/personal',person,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      console.log(res.data);
      window.location.reload(false)
    })}


/*     Yup.addMethod(Yup.string,'ValidateCi',(errorMessage)=>{
      return this.test('test-validate-ci',errorMessage,(value)=>{
        const ci = value
        const {path, createError} = this
        if(ci[2]+ci[3]==='02' && ci[4]+ci[5]==='30'){
            return createError({path,message: '30 de febrero :v'})
         }
      })
  }) */

  const ciRegex = '^[0-9]+[0-9]$'
  const nameRegex = '^[a-zA-Z ]+[a-zA-Z ]$'
  
    const coleccionSchema= Yup.object().shape({
      ci: Yup.string().matches(ciRegex,{message: 'El carnet de identidad no puede contener letras'})
      .min(11,'El carnet de identidad debe contener 11 caracteres')
      .max(11,'El carnet de identidad debe contener 11 caracteres')
      .required('Este campo es obligatorio'),
      nombre:Yup.string().matches(nameRegex,{message: 'El nombre solo puede contener letras'}).required('Este campo es obligatorio'),
      email: Yup.string().email('No es un email valido'),
      telefono: Yup.number('Deben ser un NUMERO').positive('a ETECSA no le gusta tu numero de telefono'),
      cargo:Yup.string(),
    })
  return (
    <div>
    <Tabs defaultActiveKey='tabla' className='mb-3'>
      <Tab eventKey='tabla' title='Tabla de personal'><TablaPersonal /></Tab>
      <Tab eventKey='formulario' title='Nuevo personal'>

      <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
        <Card.Body>
          <Card.Title>Personal</Card.Title>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={coleccionSchema}>
            <Form>

            <Formulario campos={[
                {label:'Carnet de identidad', data:'ci', type: 'text',placeholder: 'Carnet de identidad'},
                {label:'Nombre completo', data:'nombre', type: 'text',placeholder: 'Los apellidos son opcionales'},
                {label:'Email', data:'email', type: 'email',placeholder: 'Case insensitive'},
                {label:'Telefono', data:'telefono', type: 'number',placeholder: 'Puede ser movil o fijo'},
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
    </div>
  )
}

export default Personal