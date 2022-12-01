import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Container, Row,Button, Card,Col,ButtonGroup,Table,Modal} from 'react-bootstrap';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import {BsFillPencilFill,BsCheckLg,BsXLg,BsThreeDots} from 'react-icons/bs'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Individuos.css'
import CustomModal from '../../Components/CustomModal'
import Menu from '../../Components/Menu/Menu'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import 'moment/locale/es';
import moment from 'moment';

function IndividuosProfile() {
  const navigate = useNavigate();

  const {id} = useParams();
  const [individuo,setIndividuo]   = useState({});
  const [record,setRecord] = useState([])
  const [edit,setEditMode] = useState(false)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
      LoadInd()
      LoadRecord()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[individuo.id])

      const LoadInd=()=>{
        axios.get(`http://localhost:3001/api/individuos/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
          setIndividuo(res.data)
      });
      }

      const LoadRecord=()=>{
        axios.get(`http://localhost:3001/api/individuos/record/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
          setRecord(res.data)
      });
      }

        //valores iniciales
        const editValues={
          nombreVulgar:individuo.nombreVulgar,
          nombreCientifico:individuo.nombreCientifico,
          nombreFamilia:individuo.nombreFamilia,
          diametro:individuo.diametro,
          altura:individuo.altura,
          motivo: '',
      } 

      const deleteValues= {
        borrado:''
      }
    
      //funciones formularios
      const onEdit=(data)=>{
        const nextState = {
          nombreVulgar: data.nombreVulgar,
          nombreCientifico:data.nombreCientifico,
          nombreFamilia:data.nombreFamilia,
          diametro: data.diametro,
          altura: data.altura,
        }
        const timestamp = Date.now()
        const d = new Date(timestamp)
        const prevState={
          id: individuo.id,
          fechacambio:d,
          motivo: data.motivo,
          eliminado: false,
          nombreVulgar: individuo.nombreVulgar,
          nombreCientifico: individuo.nombreCientifico,
          nombreFamilia: individuo.nombreFamilia,
          latitud: individuo.latitud,
          longitud: individuo.longitud,
          diametro: individuo.diametro,
          altura: individuo.altura,
          coleccionID: individuo.coleccionID
        }
        axios.put(`http://localhost:3001/api/individuos/${id}`,nextState,{headers:{'token':localStorage.getItem('token')}}).then(
          ()=>{
            axios.post('http://localhost:3001/api/individuos/record',prevState,{headers:{'token':localStorage.getItem('token')}})
                setEditMode(false)
                LoadInd()          
          }
        )
      }

      const onDelete=(data)=>{
        if(data.borrado!==''){
          const timestamp = Date.now()
          const d = new Date(timestamp)
          const prevState={
            id: individuo.id,
            fechacambio:d,
            motivo: data.borrado,
            eliminado: true,
            nombreVulgar: individuo.nombreVulgar,
            nombreCientifico: individuo.nombreCientifico,
            nombreFamilia: individuo.nombreFamilia,
            latitud: individuo.latitud,
            longitud: individuo.longitud,
            diametro: individuo.diametro,
            altura: individuo.altura,
            coleccionID: individuo.coleccionID
          }
          axios.post('http://localhost:3001/api/individuos/record',prevState,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
          })
        }
          axios.delete(`http://localhost:3001/api/individuos/${individuo.id}`,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
          navigate('/individuos')
        })
      }

        //esquemas de validacion
      const editSchema= Yup.object().shape({
          nombreVulgar:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
          .required('Este campo es obligatorio'),
          nombreCientifico:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
          .required('Este campo es obligatorio'),
          nombreFamilia:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
          .required('Este campo es obligatorio'),
          diametro: Yup.number().required(),
          altura: Yup.number().required(),
          motivo:Yup.string().trim('No puede contener espacios al inicio ni al final').strict()
          .required('Se debe especificar motivo del cambio'),
      })

      const deleteSchema= Yup.object().shape(
        {
          borrado: Yup.string().trim('No puede contener espacios al inicio ni al final').strict().required('Especifique un motivo')
        }
      )

  return (
    <div>
      <Menu/>
      <Container>
        <Row mb-1='true'>
        <Col>
            <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
            {
                edit===false ? 
                <>
                        <Card.Header className='editCardHeader'> 
                      <p><strong>Individuo</strong></p>
                      <Button className='editButton' onClick={()=>{setEditMode(true)}}><BsFillPencilFill/></Button>
                    </Card.Header>
                      <Card.Body>
                        <Card.Text>Id: {individuo.id}</Card.Text>
                        <Card.Text>Nombre Vulgar: {individuo.nombreVulgar}</Card.Text>
                        <Card.Text>Nombre Cientifico: {individuo.nombreCientifico}</Card.Text>
                        <Card.Text>Familia: {individuo.nombreFamilia}</Card.Text>
                        <Card.Text>Altura: {individuo.altura}</Card.Text>
                        <Card.Text>Diámetro: {individuo.diametro}</Card.Text>
                        <Card.Text>Coleccion: {individuo.coleccionID}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                            <ButtonGroup>
                            {
                              record.length !== 0?
                              <>
                                                          <CustomModal
                            name='Mostrar registro'
                            title='Registro del individuo'
                            body={
                              <>
                              <Table striped hover>
                                <thead>
                                  <tr>
                                    <th>Fecha del cambio</th>
                                    <th>Motivo</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    record.map(
                                      (value)=>{
                                        return(
                                          <tr>
                                            <td>{moment(value.fechacambio).locale('es').format('DD [de] MMMM [del] YYYY')}</td>
                                            <td>{value.motivo}</td>
                                          </tr>
                                        )
                                      }
                                    )
                                  }
                                </tbody>
                              </Table>
                              </>
                            }
                            />
                              </>:<></>
                            }
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
                                <Field as='textarea' id='borrado' name='borrado' className='form-control' 
                                placeholder='Debe especificarse un motivo'/>
                                <ErrorMessage name='borrado'/>
                                
                                </Modal.Body>

                              <Modal.Footer>
                                <Button variant='secondary' onClick={()=>{handleClose()}}>Cerrar</Button>
                                <Button variant='danger' type='submit'>Eliminar</Button>
                              </Modal.Footer>
                              
                            </Form>
                            </Formik>
                            </Modal>
                              <Button variant='secondary' type='button' onClick={()=>{navigate('/individuos')}}>Atrás</Button>
                            </ButtonGroup>
                      </Card.Footer> 
                </>
                :
                <>
                    <Card.Header className='editCardHeader'> 
                      <p><strong>Editar individuo Id: {individuo.id}</strong></p>
                    </Card.Header>
                    <Formik initialValues={editValues} onSubmit={onEdit} validationSchema={editSchema}>
                      <Form>
                      <Card.Body>
                        <Row>
                        <Col>
                        <Card.Text className='form-label'>Nombre Vulgar:</Card.Text>
                        <Field id='nombreVulgar' name='nombreVulgar' className='form-control' defaultValue={individuo.nombreVulgar} autoComplete='off' />
                        <ErrorMessage name='nombreVulgar'/>
                        <Card.Text className='form-label' >Nombre Científico:</Card.Text>
                        <Field id='nombreCientifico' name='nombreCientifico' className='form-control' defaultValue={individuo.nombreCientifico} autoComplete='off'/>
                        <ErrorMessage name='nombreCientifico'/>
                        <Card.Text className='form-label'>Familia:</Card.Text>
                        <Field id='nombreFamilia' name='nombreFamilia' className='form-control' defaultValue={individuo.nombreFamilia} autoComplete='off'/>
                        <ErrorMessage name='nombreFamilia'/>
                        <Card.Text className='form-label'>Diámetro:</Card.Text>
                        <Field id='posicion' name='diametro' className='form-control' defaultValue={individuo.diametro} autoComplete='off'/>
                        <ErrorMessage name='diametro'/>
                        <Card.Text className='form-label'>Altura:</Card.Text>
                        <Field id='posicion' name='altura' className='form-control' defaultValue={individuo.altura} autoComplete='off'/>
                        <ErrorMessage name='altura'/>
                        </Col>
                        <Col>
                        <Card.Text className='form-label editConfirmLabel'>Este mensaje es util para comprender 
                                          la razón de cambio de información, no se puede
                                          modificar información sin especificar el motivo.<br/> <strong>Los datos previamente registrados irán al
                                            registro para futuras investigaciones</strong></Card.Text>
                                          <Field as='textarea' className='form-control' name='motivo' id='motivo'
                                          placeholder='Mensaje'
                                          />
                        </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                            <ButtonGroup>
                            <Button type='submit' variant= 'success'><BsCheckLg/></Button>
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

export default IndividuosProfile