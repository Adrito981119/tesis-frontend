import {React, useEffect, useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Container, Row,Col,Card,Button,Table} from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Menu from '../../Components/Menu/Menu'
import './Equipos.css'

function EquipoProfile() { 

    const navigator = useNavigate()
    const {id} = useParams();
    const [team,setTeam]   = useState({});
    const [members, setMembers] = useState([]);
    const [personList, setPersonList] = useState([]);

    useEffect(()=>{
      axios.get(`http://localhost:3001/api/equipos/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
          setTeam(res.data)
    });

      axios.get(`http://localhost:3001/api/equipos/miembros/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
       setMembers(res.data)
    });

    axios.get('http://localhost:3001/api/personal',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      setPersonList(res.data)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    //elementos de los formularios
    const initialValues={
    nombre:team.nombre,
    }

    const membersInitial={
      PersonalCi: ''
    }

   const onSubmit=(data)=>{
        axios.put(`http://localhost:3001/api/equipos/${id}`,data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
        window.location.reload(false)
      })}

    const addMember=(data)=>{
      const d = {ci: data.PersonalCi}
      axios.post(`http://localhost:3001/api/equipos/miembros/${id}`,d,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
        alert(res.data)
        window.location.reload(false)
      }) 
    }
      
      const teamSchema= Yup.object().shape({
        nombre: Yup.string().required('Este campo es obligatorio'),
      })

      const memberSchema= Yup.object().shape({
        PersonalCi: Yup.string().min(11).max(11).required()
      })



    const deleteMember=(ci)=>{
      axios.delete(`http://localhost:3001/api/equipos/miembros/${id}${ci}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
        alert(res.data)
        window.location.reload(false)
      })
    }

      
  return (
    <div>
      <Menu/>
            <Container fluid='true'>
        <Row mb-1='true'>

          <Col name='data-card'>
            <Card>
                <Card.Title>{team.nombre}</Card.Title>
                <Card>
                 <Card.Body>
                    <Table title='Miembros' responsive='sm' striped hover style={{textAlign: 'center'}} variant='dark'>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Ver Ficha</th>
                            <th>Eliminar miembro</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.map((value)=>{
                            return (
                            <tr key={value.ci}>
                                <td>{value.ci}</td>
                                <td>{value.nombre} {value.pApellido} {value.sApellido}</td>
                                <td>{value.cargo}</td>
                            <td><Button variant='primary' onClick={()=>{navigator('/personal/'+value.ci)}}>Ver</Button></td>
                            <td><Button variant='danger' onClick={()=>{deleteMember(value.ci)}}>Eliminar</Button></td>
                            </tr>
                            )
                        })} 
                        </tbody>         
                    </Table>
                </Card.Body>
                </Card>
            </Card>
          </Col>



          <Col name="formulario">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={teamSchema}>
                <Form>
                    <Field className='form-control' id='nombre' name='nombre'/>
                    <Button variant='success' type='submit' style={{marginTop: '10px'}}>Editar nombre</Button>
                </Form>
            </Formik>
            


          <Col name="añadir" className='addMember'>
            <Formik initialValues={membersInitial} onSubmit={addMember} validationSchema={memberSchema}>
                <Form>
                    <Field as='select' className='form-select' name='PersonalCi' id='PersonalCi'>
                        <option defaultValue='null'>Seleccione a la persona</option>
                        {
                          personList.map((value)=>{
                            return(
                              <option key={value.ci} value={value.ci}>
                               {value.nombre} {value.pApellido} {value.sApellido}
                              </option>
                            )
                          })
                        }
                    </Field>
                    <Button variant='primary' type='submit' style={{marginTop: '15px'}}>Añadir miembro</Button>
                </Form>
            </Formik>
          </Col>

          </Col>
        </Row>
    </Container>
    </div>
  )
}

export default EquipoProfile