import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Row,Col,Card,Button,Alert} from 'react-bootstrap'
import { Formik, Form,Field} from 'formik'
import Formulario from '../../Components/Formulario'
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
        axios.get('http://localhost:3001/api/personal',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
            setPeople(res.data)
        });
    },[])

    const initialValues={
        username: '',
        password: '',
        owner:''
        };

        const onSubmit=(data)=>{
            const usuario = {usuario: data.owner}
            axios.post('http://localhost:3001/auth',data,{headers:{'token': localStorage.getItem('token')}})
            
            axios.put(`http://localhost:3001/api/personal/${data.owner}`,usuario).then((res)=>{
                console.log(res.data)
                window.location.reload(false)
            })
        }
        
        
          const userSchema= Yup.object().shape({
              username: Yup.string().required('Este campo es obligatorio'),
              password:Yup.string().required('Este campo es obligatorio'),
              owner:Yup.string().required('Este campo es obligatorio'),
          })
    
  return (
    <div>
        <Menu/>
        <Container fluid>
        <Row>
            <Col><TablaUsuarios /></Col>
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
                        <Formulario campos={[
                            {label:'Usuario', data:'username', type: 'text',placeholder: 'Puede contener letras y números'},
                            {label:'Contraseña', data:'password', type: 'password',}
                        ]}/>
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