import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row,Button, Card,Col,ButtonGroup,Modal} from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../Components/Menu/Menu'
import {BsFillPencilFill,BsCheckLg,BsXLg} from 'react-icons/bs'

function PersonProfile() {
  const navigate = useNavigate();


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const {ci} = useParams();
    const [person,setPerson]   = useState({});
    const [edit,setEditMode]= useState(false)
    useEffect(()=>{
          Load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])


        const Load = ()=>{
          axios.get(`http://localhost:3001/api/personal/${ci}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
            setPerson(res.data)
        });
        }

          const nameRegex = '^[a-zA-Z ]+[a-zA-Z ]$'
          const phoneRegex = '^[+53 ]+[5]+[0-9]+[0-9]$'

          const editValues={
            fullname:person.fullname,
            email:person.email,
            telefono:person.telefono,
            cargo:person.cargo
        }

        const deleteValues={
          motivo:''
      }
      
        const onEdit=(data)=>{
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

        const onDelete=(data)=>{
         const timestamp = Date.now()
          const d = Date(timestamp)
          const formerEmployee={
            fechacambio: d,
            ci: person.ci,
            fullname: person.fullname,
            email: person.email,
            telefono:person.telefono,
            cargo:person.cargo,
            fechacontratacion: person.createdAt,
            motivo: data.motivo
          }
          axios.post('http://localhost:3001/api/personal/record',formerEmployee,{headers:{'token':localStorage.getItem('token')}}).then(
            ()=>{
              axios.delete(`http://localhost:3001/api/personal/${ci}`,{headers:{'token':localStorage.getItem('token')}}).then(
                ()=>{
                navigate('/personal')
              })
            }
          )

        }

        const editSchema= Yup.object().shape({
          fullname:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
          .matches(nameRegex,{message: 'El nombre solo puede contener letras'})
          .required('Este campo es obligatorio'),

          email: Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
          .email('No es un email valido'),

          telefono: Yup.string('Debe ser un NUMERO').trim('No puede contener espacios al inicio ni al final').strict()
          .matches(phoneRegex,{message: 'El formato no es valido. Ej: +53 55555555'}),
          
          cargo:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
          .required('Debe especificarse la plaza que ocupa esta persona'),
        })

        const deleteSchema= Yup.object().shape({
          motivo:Yup.string().required('Debe especificarse un motivo'),
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
                        <Card.Text>Contratado: {person.createdAt}</Card.Text>
                        <Card.Text>Carnet de identidad: {person.ci}</Card.Text>
                        <Card.Text>Nombre completo: {person.fullname}</Card.Text>
                        <Card.Text>Correo electrónico: {person.email}</Card.Text>
                        <Card.Text>Telefono: {person.telefono}</Card.Text>
                        <Card.Text>Plaza que ocupa: {person.cargo}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                            <ButtonGroup>

                            <Button variant= 'danger' onClick={handleShow}>
                              Eliminar
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Eliminar</Modal.Title>
                              </Modal.Header>
                              <Formik initialValues={deleteValues} onSubmit={onDelete} validationSchema={deleteSchema}>
                              <Form>
                              <Modal.Body>      
                              <p>¿Esta seguro que desea eliminar el elemento?</p>
                                <label className='form-label'>Motivo<br/><strong>
                                  Debe especificarse un motivo por el cual se elimina dicho elemento, esta información puede ser
                                  util para futuras investigaciones.
                                  </strong>
                                  </label>
                                <Field as='textarea' id='motivo' name='motivo' className='form-control' 
                                placeholder='Debe especificarse un motivo'/>
                                <ErrorMessage name='motivo'/>                               
                                </Modal.Body>
                              <Modal.Footer>
                                <Button variant='secondary' onClick={()=>{handleClose()}}>Cerrar</Button>
                                <Button variant='danger' type='submit'>Eliminar</Button>
                              </Modal.Footer>                            
                            </Form>
                            </Formik>
                            </Modal>
                              <Button variant='secondary' type='button' onClick={()=>{navigate('/personal')}}>Atrás</Button>
                            </ButtonGroup>
                      </Card.Footer> 
                </>
                :
                <>
                    <Card.Header className='editCardHeader'> 
                      <p><strong>Editar datos de {person.fullname}</strong></p>
                    </Card.Header>
                    <Formik initialValues={editValues} onSubmit={onEdit} validationSchema={editSchema}>
                      <Form>
                      <Card.Body>
                        <Card.Text className='form-label'>Nombre completo:</Card.Text>
                        <Field id='fullname' name='fullname' className='form-control' defaultValue={person.fullname} autoComplete='off' />
                        <ErrorMessage name='fullname'/>
                        <Card.Text className='form-label' >Correo electrónico:</Card.Text>
                        <Field id='email' name='email' className='form-control' defaultValue={person.email} type='email' autoComplete='off'/>
                        <ErrorMessage name='email'/>
                        <Card.Text className='form-label'>Telefono:</Card.Text>
                        <Field id='telefono' name='telefono' className='form-control' defaultValue={person.telefono} autoComplete='off'/>
                        <ErrorMessage name='telefono'/>
                        <Card.Text className='form-label'>Plaza:</Card.Text>
                        <Field id='posicion' name='cargo' className='form-control' defaultValue={person.cargo} autoComplete='off'/>
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