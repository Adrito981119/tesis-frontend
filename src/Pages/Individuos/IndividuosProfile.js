import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Container, Row,Button, Card,Col,ButtonGroup} from 'react-bootstrap';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import {BsFillPencilFill,BsCheckLg,BsXLg} from 'react-icons/bs'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomModal from '../../Components/CustomModal'
import Menu from '../../Components/Menu/Menu'

function IndividuosProfile() {
  const navigate = useNavigate();

  const {id} = useParams();
  const [individuo,setIndividuo]   = useState({});
  const [edit,setEditMode] = useState(false)
  useEffect(()=>{
          axios.get(`http://localhost:3001/api/individuos/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
              setIndividuo(res.data)
          });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[individuo.id])

      const onDelete=()=>{
        axios.delete(`http://localhost:3001/api/individuos/${id}`,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
          navigate('/individuos')
        })}

        const initialValues={
          nombreVulgar:individuo.nombreVulgar,
          nombreCientifico:individuo.nombreCientifico,
          nombreFamilia:individuo.nombreFamilia,
          diametro:individuo.diametro,
          altura:individuo.altura,
      }
    
      const onSubmit=(data)=>{
        axios.put(`http://localhost:3001/api/individuos/${id}`,data,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
          setEditMode(false)
          console.log(res.data)
        })
      }
    
      const individuoSchema= Yup.object().shape({
          nombreVulgar:Yup.string().required('Este campo es obligatorio'),
          nombreCientifico:Yup.string().required('Este campo es obligatorio'),
          nombreFamilia:Yup.string().required('Este campo es obligatorio'),
          diametro: Yup.number().required(),
          altura: Yup.number().required(),
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
                      <p><strong>Editar individuo Id: {individuo.id}</strong></p>
                    </Card.Header>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={individuoSchema}>
                      <Form>
                      <Card.Body>
                        <Card.Text className='form-label'>Nombre Vulgar:</Card.Text>
                        <Field id='nombreVulgar' name='nombreVulgar' className='form-control' defaultValue={individuo.nombreVulgar} autocomplete='off' />
                        <ErrorMessage name='nombreVulgar'/>
                        <Card.Text className='form-label' >Nombre Científico:</Card.Text>
                        <Field id='nombreCientifico' name='nombreCientifico' className='form-control' defaultValue={individuo.nombreCientifico} autocomplete='off'/>
                        <ErrorMessage name='nombreCientifico'/>
                        <Card.Text className='form-label'>Familia:</Card.Text>
                        <Field id='nombreFamilia' name='nombreFamilia' className='form-control' defaultValue={individuo.nombreFamilia} autocomplete='off'/>
                        <ErrorMessage name='nombreFamilia'/>
                        <Card.Text className='form-label'>Diámetro:</Card.Text>
                        <Field id='posicion' name='diametro' className='form-control' defaultValue={individuo.diametro} autocomplete='off'/>
                        <ErrorMessage name='diametro'/>
                        <Card.Text className='form-label'>Altura:</Card.Text>
                        <Field id='posicion' name='altura' className='form-control' defaultValue={individuo.altura} autocomplete='off'/>
                        <ErrorMessage name='altura'/>
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

export default IndividuosProfile