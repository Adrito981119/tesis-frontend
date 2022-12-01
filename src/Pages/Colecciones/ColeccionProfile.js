import {React,useEffect,useState} from 'react'
import './Colecciones.css'
import { useParams } from 'react-router-dom'
import { Container, Row,Button, Card,Col, Table,ButtonGroup,Alert,Modal } from 'react-bootstrap';
import { Formik,Field,Form,ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../Components/Menu/Menu';
import CustomModal from '../../Components/CustomModal';
import {BsFillPencilFill,BsCheckLg,BsXLg,BsFillEmojiFrownFill} from 'react-icons/bs'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

function ColeccionProfile() {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

        const onDelete=(data)=>{
          const timestamp = Date.now()
          const d = new Date(timestamp)
          const prevState={
            id: coleccion.id,
            fechacambio:d,
            motivo: data.borrado,
            nombreVulgar: coleccion.nombreVulgar,
            nombreCientifico: coleccion.nombreCientifico,
            nombreFamilia: coleccion.nombreFamilia
          }
          console.log(prevState)
           axios.post('http://localhost:3001/api/coleccion/record',prevState,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{  
         
        },)
           axios.delete(`http://localhost:3001/api/coleccion/${id}`,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
            navigate('/colecciones')
          })  
        }


          const initialValues={
            nombreVulgar:coleccion.nombreVulgar,
            nombreCientifico:coleccion.nombreCientifico,
            nombreFamilia:coleccion.nombreFamilia,
        }
        const deleteValues={
          borrado:'',
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
        })

        const deleteSchema= Yup.object().shape({
          borrado:Yup.string().trim('No puede contener espacios al inicio ni al final').strict().required('Este campo es obligatorio'),
        })
        
  return (
    <div>
      <Menu />
      <Container>
        <Row mb-1='true'>

          <Col>
          {
            individuos.length===0?
            <Alert variant='danger' style={{textAlign: 'center'}}>Esta coleccion no tiene ningún individuo <BsFillEmojiFrownFill/></Alert>
            :
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
          }
           
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
                        <Card.Text>Total de individuos: {individuos.length}</Card.Text>
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

                                <CustomModal 
                              name='Mostrar mapa'
                              buttonStyle= 'primary'
                              title='Mapa de la coleccion'
                              body={
                                <MapContainer center={[23.035655, -81.510356]} zoom={18} style={{height: '350px',width: '100%'}}>
                                    <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  />
                                  {
                                    individuos.map((value)=>{
                                    return(
                                      <Marker key={value.id} position={[value.latitud,value.longitud]} icon={new Icon({iconUrl: markerIcon, iconSize: [25,41]})}>
                                        <Popup>
                                          <p>Nombre Vulgar: {value.nombreVulgar}</p>
                                          <p>Nombre científico: {value.nombreCientifico}</p>
                                          <Button onClick={()=>{navigate(`/individuos/${value.id}`)}}>Ver datos</Button>
                                        </Popup>
                                      </Marker>
                                    )
                                    })
                                  }
                                </MapContainer>
                              }
                              />
                              
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