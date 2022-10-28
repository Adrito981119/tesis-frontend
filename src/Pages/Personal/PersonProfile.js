import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row,Button, Card,Col,ButtonGroup} from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../Components/Menu/Menu'
import CustomModal from '../../Components/CustomModal'
import {BsFillPencilFill,BsCheckLg,BsXLg} from 'react-icons/bs'

function PersonProfile() {
  let navigate = useNavigate();

    const {ci} = useParams();
    const [person,setPerson]   = useState({});
    const [edit,setEditMode]= useState(false)
    useEffect(()=>{
          Load()
        },[])


        const Load = ()=>{
          axios.get(`http://localhost:3001/api/personal/${ci}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
            setPerson(res.data)
        });
        }


        const onDelete=()=>{
          axios.delete(`http://localhost:3001/api/personal/${ci}`,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
            navigate('/personal')
          })}

          const nameRegex = '^[a-zA-Z ]+[a-zA-Z ]$'
          const phoneRegex = '^[+53 ]+[5]+[0-9]+[0-9]$'

          const initialValues={
            fullname:person.fullname,
            email:person.email,
            telefono:person.telefono,
            cargo:person.cargo
        }
      
        const onSubmit=(data)=>{
            const person = {
              fullname: data.fullname,
              email: data.email.toLowerCase(),
              telefono: data.telefono,
              cargo: data.cargo
            }
          axios.put(`http://localhost:3001/api/personal/${ci}`,person,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
          setEditMode(false)
          Load();
        })}

        const personaSchema= Yup.object().shape({
          fullname:Yup.string().matches(nameRegex,{message: 'El nombre solo puede contener letras'}).required('Este campo es obligatorio'),
          email: Yup.string().email('No es un email valido'),
          telefono: Yup.string('Debe ser un NUMERO').matches(phoneRegex,{message: 'El formato no es valido. Ej: +53 55555555'}),
          cargo:Yup.string(),
        })

  return (
    <div>
      <Menu/>
            <Container fluid='true'>
        <Row mb-1='true'>
          <Col>
          <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
          {
                edit===false ? 
                <>
                        <Card.Header className='editCardHeader'> 
                      <p><strong>Persona</strong></p>
                      <Button className='editButton' onClick={()=>{setEditMode(true)}}><BsFillPencilFill/></Button>
                    </Card.Header>
                      <Card.Body>
                        <Card.Text>Carnet de identidad: {person.ci}</Card.Text>
                        <Card.Text>Nombre completo: {person.fullname}</Card.Text>
                        <Card.Text>Correo electrónico: {person.email}</Card.Text>
                        <Card.Text>Telefono: {person.telefono}</Card.Text>
                        <Card.Text>Plaza que ocupa: {person.cargo}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                            <ButtonGroup>
                              <CustomModal 
                              name='Eliminar'
                              buttonStyle= 'danger'
                              title='Eliminar coleccion'
                              body={
                                <p>¿Esta seguro que desea eliminar el elemento?</p>
                              }
                              footer={
                                <>
                                  <Button variant='danger' onClick={()=>{onDelete()}}>Eliminar</Button>
                                </>
                              }
                              />
                              <Button>Ver Historial</Button>
                              <Button variant='secondary' type='button' onClick={()=>{navigate('/colecciones')}}>Atrás</Button>
                            </ButtonGroup>
                      </Card.Footer> 
                </>
                :
                <>
                    <Card.Header className='editCardHeader'> 
                      <p><strong>Editar datos de {person.fullname}</strong></p>
                    </Card.Header>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={personaSchema}>
                      <Form>
                      <Card.Body>
                        <Card.Text className='form-label'>Nombre completo:</Card.Text>
                        <Field id='fullname' name='fullname' className='form-control' defaultValue={person.fullname} autocomplete='off' />
                        <ErrorMessage name='fullname'/>
                        <Card.Text className='form-label' >Correo electrónico:</Card.Text>
                        <Field id='email' name='email' className='form-control' defaultValue={person.email} type='email' autocomplete='off'/>
                        <ErrorMessage name='email'/>
                        <Card.Text className='form-label'>Telefono:</Card.Text>
                        <Field id='telefono' name='telefono' className='form-control' defaultValue={person.telefono} autocomplete='off'/>
                        <ErrorMessage name='telefono'/>
                        <Card.Text className='form-label'>Plaza:</Card.Text>
                        <Field id='posicion' name='cargo' className='form-control' defaultValue={person.cargo} autocomplete='off'/>
                        <ErrorMessage name='cargo'/>
                      </Card.Body>
                      <Card.Footer>
                            <ButtonGroup>
                              <Button type='submit' variant='success'><BsCheckLg/></Button>
                              <Button onClick={()=>{setEditMode(false)}} variant='secondary'><BsXLg/></Button>
                            </ButtonGroup>
                      </Card.Footer>   
                      </Form>
                  </Formik>            
                </>

              }
          </Card>
          </Col>  
        </Row>

      </Container>
    </div>
  )
}

export default PersonProfile