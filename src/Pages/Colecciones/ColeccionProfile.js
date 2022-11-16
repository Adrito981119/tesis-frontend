import {React,useEffect,useState} from 'react'
import './Colecciones.css'
import { useParams } from 'react-router-dom'
import { Container, Row,Button, Card,Col, Table,ButtonGroup } from 'react-bootstrap';
import { Formik,Field,Form,ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../Components/Menu/Menu';
import CustomModal from '../../Components/CustomModal';
import {BsFillPencilFill,BsCheckLg,BsXLg,} from 'react-icons/bs'
import {MdDeleteForever} from 'react-icons/md'
function ColeccionProfile() {

    const navigate = useNavigate();

    const {id} = useParams();
    const [coleccion,setColeccion]   = useState({});
    const [individuos,setIndividuos] = useState([]);
    const [edit,setEditMode] = useState(false)
    useEffect(()=>{
      LoadColeccion()
      LoadColeccionMembers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[coleccion.id])

        const LoadColeccion=()=>{
          axios.get(`http://localhost:3001/api/coleccion/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
            setColeccion(res.data)
        });
        }
        const LoadColeccionMembers=()=>{
          axios.get(`http://localhost:3001/api/individuos/byColeccion/${id}`,{headers: {'token': localStorage.getItem('token')}}).then((res)=>{
            setIndividuos(res.data)
          });
        }

        const onDelete=()=>{
          axios.delete(`http://localhost:3001/api/coleccion/${id}`,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
            navigate('/colecciones')
          })}


          const initialValues={
            nombreVulgar:coleccion.nombreVulgar,
            nombreCientifico:coleccion.nombreCientifico,
            nombreFamilia:coleccion.nombreFamilia,
            posicion:coleccion.posicion,
        }

        const onSubmit=(data)=>{
          axios.put(`http://localhost:3001/api/coleccion/${coleccion.id}`,data,{headers:{'token':localStorage.getItem('token')}}).then(
            (res)=>{
              setEditMode(false)
              LoadColeccion()
            }
          )
        }
      
        const coleccionSchema= Yup.object().shape({
          nombreVulgar:Yup.string().trim('No puede contener espacios al inicio ni al final').strict().required('Este campo es obligatorio'),
          nombreCientifico:Yup.string().trim('No puede contener espacios al inicio ni al final').strict().required('Este campo es obligatorio'),
          nombreFamilia:Yup.string().trim('No puede contener espacios al inicio ni al final').strict().required('Este campo es obligatorio'),
          posicion:Yup.string().trim('No puede contener espacios al inicio ni al final').strict(),
        })
        
  return (
    <div>
      <Menu />
      <Container fluid='true'>
        <Row mb-1='true'>

          <Col>
           <Table striped='true' hover='true' style={{textAlign: 'center'}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre Vulgar</th>
                <th>Nombre Cientifico</th>
                <th>Ver</th>
              </tr>
            </thead>
            <tbody>
              {
                individuos.map((value)=>{
                  return(
                    <tr key={value.id}>
                      <td>{value.id}</td>
                      <td>{value.nombreVulgar}</td>
                      <td>{value.nombreCientifico}</td>
                      <td><Button variant='primary' onClick={()=>{navigate(`/individuos/${value.id}`)}}>Ver</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
           </Table>
          </Col>


          <Col>
            <Card bg='light'>
              {
                edit===false ? 
                <>
                        <Card.Header className='editCardHeader'> 
                      <p><strong>Coleccion</strong></p>
                      <Button className='editButton' onClick={()=>{setEditMode(true)}}><BsFillPencilFill/></Button>
                    </Card.Header>
                      <Card.Body>
                        <Card.Text>Id: {coleccion.id}</Card.Text>
                        <Card.Text>Nombre Vulgar: {coleccion.nombreVulgar}</Card.Text>
                        <Card.Text>Nombre Cientifico: {coleccion.nombreCientifico}</Card.Text>
                        <Card.Text>Familia: {coleccion.nombreFamilia}</Card.Text>
                        <Card.Text>Posicion: {coleccion.posicion}</Card.Text>
                        <Card.Text>Total de individuos: {coleccion.cant}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                            <ButtonGroup>
                              <CustomModal 
                              name='Eliminar'
                              buttonStyle= 'danger'
                              title='Eliminar coleccion'
                              body={
                                <p>¿Esta seguro que desea eliminar el elemento?<br/>
                                Los elementos eliminados se guardaran en el registro
                                </p>
                              }
                              footer={
                                <>
                                  <Button variant='warning'>Eliminar</Button>
                                  <CustomModal
                                  name='Eliminar Permanentemente'
                                  buttonStyle='danger'
                                  title='Eliminación Permanente'
                                  body={
                                    <p>
                                      ¿Estas seguro que desea eliminar <strong>permanentemente</strong> la coleccion?<br/>
                                      <strong>Esta acción no se podrá deshacer</strong>
                                    </p>
                                  }
                                  footer={
                                    <>
                                    <Button variant='danger' onClick={()=>{onDelete(id)}}><MdDeleteForever/> Eliminar</Button>
                                    </>
                                  }
                                  />
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
                      <p><strong>Editar coleccion Id: {coleccion.id}</strong></p>
                    </Card.Header>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={coleccionSchema}>
                      <Form>
                      <Card.Body>
                        <Card.Text className='form-label'>Nombre Vulgar:</Card.Text>
                        <Field id='nombreVulgar' name='nombreVulgar' className='form-control' defaultValue={coleccion.nombreVulgar} autoComplete='off' />
                        <ErrorMessage name='nombreVulgar'/>
                        <Card.Text className='form-label' >Nombre Científico:</Card.Text>
                        <Field id='nombreCientifico' name='nombreCientifico' className='form-control' defaultValue={coleccion.nombreCientifico} autoComplete='off'/>
                        <ErrorMessage name='nombreCientifico'/>
                        <Card.Text className='form-label'>Familia:</Card.Text>
                        <Field id='nombreFamilia' name='nombreFamilia' className='form-control' defaultValue={coleccion.nombreFamilia} autoComplete='off'/>
                        <ErrorMessage name='nombreFamilia'/>
                        <Card.Text className='form-label'>Posicion:</Card.Text>
                        <Field id='posicion' name='posicion' className='form-control' defaultValue={coleccion.posicion} autoComplete='off'/>
                        <ErrorMessage name='posicion'/>
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

export default ColeccionProfile