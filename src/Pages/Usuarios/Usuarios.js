import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Row,Col,Card,Button,Alert} from 'react-bootstrap'
import { Formik, Form,Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import TablaUsuarios from '../../Components/Usuarios/TablaUsuarios'
import Menu from '../../Components/Menu/Menu'

function Usuarios() {
    const [people,setPeople] = useState([])
    const [val, setValue] = useState({value: null})

    const handleChange = (v)=>{
        setValue(v)
    }

    useEffect(()=>{
        loadPerson()
    },[])

    const loadPerson=()=>{
        axios.get('http://localhost:3001/api/personal',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
            setPeople(res.data)
        });
    }

    const initialValues={
        username: '',
        password: '',
        role: '',
        owner:''
        };

        const onSubmit=(data)=>{
            axios.post('http://localhost:3001/auth',data,{headers:{'token': localStorage.getItem('token')}}).then(
                (res)=>{
                    if(res.data.error){
                        alert(res.data.error)
                    }
                    alert('Usuario creado')
                    window.location.reload(false)
                }
            )
        }
        
        
          const userSchema= Yup.object().shape({
              username: Yup.string()
              .trim('No puede contener espacios al inicio ni al final').strict()
              .required('Este campo es obligatorio'),

              password:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
              .required('Este campo es obligatorio'),

              owner:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
              .required('Este campo es obligatorio'),

              role:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
              .required('Este campo es obligatorio'),
          })
    
  return (
    <div className='component'>
        <Menu/>
        <Container>
        <Row>
            <Col>
            <Card>
                <Card.Header>Usuarios</Card.Header>
                <Card.Body>
                    <TablaUsuarios />
                    </Card.Body>
            </Card>
            </Col>
            <Col>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={userSchema}>
                <Form>
                <Card style={{ margin: '15px'}}>
                    <Card.Header className='form-label' style={{textAlign: 'center'}}>Nuevo usuario</Card.Header>
                    <Card.Body>
                        {
                            people.length===0?
                            <>
                            <Alert variant='danger'>No existe personal</Alert>
                            </>:
                            <>
                            <Card.Text className='form-label' style={{marginTop: '15px'}}>Dueño</Card.Text>
                            <Field as='select' className="form-select" name='owner' id='owner'>
                            <option defaultValue='' onChange={()=>{handleChange()}}>Seleccione la persona</option>
                            {
                                people.map((value)=>{
                                    return(
                                        <option key={value.ci} value={value.ci} id={value.ci} name={value.fullname} style={{textTransform: 'capitalize'}}>
                                            {value.fullname}
                                        </option>
                                    )
                                })
                            }
                        </Field>
                        <Card.Text>Nombre de usuario</Card.Text>
                        <Field className='form-control' id='username' name='username' placeholder='Puede contener letras y números'  autoComplete='off'/>
                        <ErrorMessage name='username' component='span'/>
                        <Card.Text>Contraseña</Card.Text>
                        <Field className='form-control' id='password' name='password' type='password'  autoComplete='off'/>
                        <ErrorMessage name='password' component='span'/>
                        <Card.Text>Rol</Card.Text>
                        <Field as='select' className='form-control' id='role' name='role'>
                        <option defaultValue=''>Seleccione un rol</option>
                            <option value='1'>Administrador</option>
                            <option value='2'>Especialista</option>
                        </Field>
                    <Card.Footer>
                        <Button type='submit'>Crear usuario</Button>
                    </Card.Footer>
                        </>
                        }
                    </Card.Body>

                </Card>
                </Form>
            </Formik>
            </Col>
        </Row>
    </Container>
    </div>
  )
}

export default Usuarios