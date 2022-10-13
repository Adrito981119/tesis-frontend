import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row,Button, Card,Col} from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteModal from '../../Components/DeleteModal';
import CustomOffCanvas from '../../Components/CustomOffCanvas';
import Menu from '../../Components/Menu/Menu'

function PersonProfile() {
  let navigator = useNavigate();

    const {ci} = useParams();
    const [person,setPerson]   = useState({});
    useEffect(()=>{
            axios.get(`http://localhost:3001/api/personal/${ci}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
                setPerson(res.data)
                console.log(person)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[person.ci])

    const initialValues={
      ci:person.ci,
      nombre: person.nombre,
      pApellido: person.pApellido,
      sApellido: person.sApellido,
      email:person.email,
      telefono:person.telefono,
      cargo:person.cargo
  }


  const onSubmit=(data)=>{
    axios.put(`http://localhost:3001/api/personal/${ci}`,data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    navigator('/personal')
  })
}

  const coleccionSchema= Yup.object().shape({
    ci: Yup.string().min(11,'El carnet de identidad debe contener 11 caracteres').max(11,'El carnet de identidad debe contener 11 caracteres').required('Este campo es obligatorio'),
    nombre:Yup.string().required('Este campo es obligatorio'),
    email: Yup.string().email('No es un email valido'),
    telefono: Yup.number('Deben ser un NUMERO').positive('a ETECSA no le gusta tu numero de telefono'),
    cargo:Yup.string(),
  })


  return (
    <div>
      <Menu/>
            <Container fluid='true'>
        <Row mb-1='true'>
          <Col>
          <p>foto</p>
          </Col>

          <Col>
          <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
              <Card.Body>
                <Card.Title>{person.nombre} {person.pApellido} {person.sApellido}</Card.Title>
                <label className='form-label'>Carnet de identidad: {person.ci}</label><br/>
                <label className='form-label'>Correo electronico: {person.email}</label><br/>
                <label className='form-label'>Telefono: {person.telefono}</label><br/>
                <label className='form-label'>Plaza: {person.cargo}</label><br/>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={coleccionSchema}>
                    <CustomOffCanvas formControls = {[
                      {label:'Carnet de identidad', data:'ci', type: 'number',placeholder: person.ci},
                      {label:'Nombre completo', data:'nombre', type: 'text',placeholder: person.nombre + ' ' + person.sApellido + ' ' + person.sApellido},
                      {label:'Email', data:'email', type: 'email',placeholder: person.email},
                      {label:'Telefono', data:'telefono', type: 'number',placeholder: person.telefono},
                      {label:'Cargo', data:'cargo', type: 'text',placeholder: person.cargo},]}/>
                </Formik>
              </Card.Body>
              <Col>           
              <DeleteModal ruta ={'http://localhost:3001/api/personal/' + ci}  next= {'/personal'} name= {'Eliminar'}/>
              <Button variant='primary' type='button' style={{marginLeft:'15px'}} onClick={()=>{navigator('/personal')}}>Cancelar</Button>
              </Col>
          </Card>
          </Col>  
        </Row>

      </Container>
    </div>
  )
}

export default PersonProfile