import {React,useState,useRef,useEffect} from 'react'
import './Individuos.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import {Tab, Tabs, Card, Button, Row, Col, Container, ButtonGroup,Alert} from 'react-bootstrap';
import axios from 'axios';
import { MapContainer,TileLayer,FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import {Formik, Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import TablaIndividuos from '../../Components/Individuos/TablaIndividuos.js';
import { useNavigate } from 'react-router-dom';
import Menu from '../../Components/Menu/Menu'
import CustomModal from '../../Components/CustomModal.js';

function Individuos(props) {
    const navigate = useNavigate()
    const [lat,setLat] = useState()
    const [lng,setLng] = useState()
    const prevLatValue = useRef()
    const prevLngValue = useRef()
    const formikRef = useRef()
    const [list, setList] = useState([]);
    const [a,setA] = useState(true)
      
    useEffect(()=>{

      axios.get('http://localhost:3001/api/coleccion',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
        if(res.data.error){
            alert(res.data.error)
          }else{    
            setList(res.data)}
        },)

      prevLatValue.current = lat
      prevLngValue.current = lng
      formikRef.current.setFieldValue('latitud',lat)
      formikRef.current.setFieldValue('longitud',lng)
    },[lat,lng])
    const initialValues={
        id:'',
        nombreVulgar:'',
        nombreCientifico:'',
        nombreFamilia:'',
        latitud:'',
        longitud:'',
        diámetro:'',
        altura:'',
        coleccionID: ''
    }
  
    const onSubmit=(data)=>{
      axios.post('http://localhost:3001/api/individuos',data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      console.log(res.data);
      window.location.reload(false)
    });
    console.log(data)
  }
  
    const individuoSchema= Yup.object().shape({
        id: Yup.string().required('Este campo es obligatorio'),
        nombreVulgar:Yup.string().required('Este campo es obligatorio'),
        nombreCientifico:Yup.string().required('Este campo es obligatorio'),
        nombreFamilia:Yup.string().required('Este campo es obligatorio'),
        latitud: Yup.number(),
        longitud: Yup.number(),
        diametro: Yup.number().required(),
        altura: Yup.number().required(),
        coleccionID: Yup.string().required('Los individuos deben pertenecer a una coleccion')
    })

    const setLatLng=(p)=>{
      setLat(p.layer._latlng.lat)
      setLng(p.layer._latlng.lng)
      alert('Posicion añadida al formulario, cierre el mapa')
    }


  return (
    <div>
      <Menu/>
      <Container fluid >
        
    <Tabs defaultActiveKey='tabla' style={{marginTop: '15px'}}>
      <Tab eventKey='tabla' title='Tabla de individuos'>
        <Row>
          <Col>
            <Card>
                <Card.Header>Tabla de individuos</Card.Header>
                <Card.Body>
                  <TablaIndividuos />
                </Card.Body>
            </Card> 
          </Col>
        </Row>
      
        </Tab>
      
      <Tab eventKey='formulario' title='Crear individuo'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={individuoSchema} innerRef={formikRef}>
      <Form>
        <Row>
          <Col>
              <Card>
                  <Card.Header>Nombre</Card.Header>
                  <Card.Body>
                    <Card.Text>Id:</Card.Text>
                    <Field className='form-control' id='id' name='id' autocomplete='off'/>
                    <ErrorMessage name='id' component='span'/>
                    <Card.Text>Nombre vulgar:</Card.Text>
                    <Field className='form-control' id='nombreVulgar' name='nombreVulgar' autocomplete='off'/>
                    <ErrorMessage name='ombreVulgar' component='span'/>
                    <Card.Text>Nombre científico:</Card.Text>
                    <Field className='form-control' id='nombreCientifico' name='nombreCientifico' autocomplete='off'/>
                    <ErrorMessage name='nombreCientifico' component='span'/>
                    <Card.Text>Familia de individuos:</Card.Text>
                    <Field className='form-control' id='nombreFamilia' name='nombreFamilia' autocomplete='off'/>
                    <ErrorMessage name='nombreFamilia' component='span'/>
                  </Card.Body>
              </Card>
          </Col>

          <Col>
          <Card>
                  <Card.Header>Datos fisicos</Card.Header>
                  <Card.Body>
                        <Card.Text>Altura:</Card.Text>
                        <Field className='form-control' id='altura' name='altura' />
                        <ErrorMessage name='nombreFamilia' component='span'/>
                        <Card.Text>Diámetro:</Card.Text>
                        <Field className='form-control' id='diametro' name='diametro' />
                        <ErrorMessage name='diametro' component='span'/>
                        <Row>
                          <Col>
                          <Card.Text>Latitud</Card.Text>
                          <Field className='form-control' type='text' id='latitud' name='latitud'autocomplete='off'/>
                          <Card.Text>Longitud</Card.Text>
                          <Field className='form-control' type='text' id='longitud' name='longitud'autocomplete='off'/>           
                          </Col>
                          
                          <Col style={{marginTop: '65px'}}>
                          <CustomModal 
                            name='Localizar en el mapa'
                            title='Localizar'
                            body={
                              <MapContainer center={[23.035655, -81.510356]} zoom= {18} style = {{height: '350px',width: '100%'}}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                  <FeatureGroup>
                                    <EditControl 
                                    position='topleft'
                                    draw={{
                                      circle:false,
                                      rectangle: false,
                                      polygon: false,
                                      circleMarker: false,
                                      polyline: false,
                                    }}
                                    onCreated={setLatLng}
                                    />
                                  </FeatureGroup>
                              </MapContainer>
                            }
                          />
                          </Col>
                    
                        </Row>
                        <label className='form-label'>Coleccion a la q pertenece</label>
                        <Row>
                          
                          {
                            list.length === 0 ?
                            <>
                            <Col>
                              <Alert variant='danger'>No existe colecciones creadas, no es posible crear un nuevo individuo</Alert>
                              <Button variant='primary' onClick={()=>{navigate('/colecciones')}}>Crear Coleccion</Button>
                            </Col>
                            </>:
                            <Col>
                            <Field as ='select' className='form-select' name='coleccionID' id="coleccionID">
                              <option defaultValue='null'>Seleccione la coleccion</option>
                              {
                                list.map((value)=>{
                                  return(
                                    <option key={value.id} value={value.id} id={value.id} name={value.id}>
                                      {value.nombreCientifico}
                                    </option>
                                  )
                                })
                              }
                            </Field>
                          </Col>
                          }                    
                        </Row>                       
                  </Card.Body>
              </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                  <ButtonGroup className='botones'>
                    <Button variant='success' type='submit'>Añadir individuo</Button>
                    <Button variant='danger' type='button'>Cancelar</Button>
                  </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>        
      </Form>
    </Formik>
    </Tab>
  </Tabs>
</Container>
    </div>
  )
}

export default Individuos