import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Container, Row,Button, Card,Col } from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteModal from '../../Components/DeleteModal';
import CustomOffCanvas from '../../Components/CustomOffCanvas';
import Menu from '../../Components/Menu/Menu'

function IndividuosProfile() {
  let navigator = useNavigate();

  const {id} = useParams();
  const [individuo,setIndividuo]   = useState({});
  useEffect(()=>{
          axios.get(`http://localhost:3001/api/individuos/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
              setIndividuo(res.data)
          });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[individuo.id])

  const initialValues={
    id:individuo.id,
    nombreVulgar: individuo.nombreVulgar,
    nombreCientifico:individuo.nombreCientifico,
    nombreFamilia:individuo.nombreFamilia,
    posicion:individuo.posicion,
    diametro:individuo.diametro,
    altura:individuo.altura,
    coleccionID:individuo.coleccionID
}

const onSubmit=(data)=>{
  //axios.put('http://localhost:3001/api/individuos',data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
  console.log(data);
  //window.location.reload(false)
//})
}


const individuosSchema= Yup.object().shape({
  id: Yup.string(),//.required('Este campo es obligatorio'),
  nombreVulgar:Yup.string(),//.required('Este campo es obligatorio'),
  nombreCientifico:Yup.string(),//.required('Este campo es obligatorio'),
  nombreFamilia:Yup.string(),//.required('Este campo es obligatorio'),
  posicion:Yup.string(),
  diametro: Yup.number(),//.required(),
  altura: Yup.number(),//.required(),
  coleccionID: Yup.string()
})

  return (
    <div>
      <Menu/>
      <Container fluid='true'>
        <Row mb-1='true'>
        <Col>
        <p>Foto del individuo</p>
        </Col>

        <Col>
            <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={individuosSchema}>
              <Card.Body>
                <Card.Title>Coleccion</Card.Title>
                <Card.Text>ID: {individuo.id}</Card.Text>
                <Card.Text>Nombre Vulgar: {individuo.nombreVulgar}</Card.Text>
                <Card.Text>Nombre Cientifico: {individuo.nombreCientifico}</Card.Text>
                <Card.Text>Familia: {individuo.nombreFamilia}</Card.Text>
                <Card.Text>Posicion: {individuo.posicion}</Card.Text>
                <Card.Text>Diametro: {individuo.diametro}</Card.Text>
                <Card.Text>Altura: {individuo.altura}</Card.Text>
                <Card.Text>Coleccion donde se encuentra: {individuo.coleccionID}</Card.Text>
                  <CustomOffCanvas formControls={[
                                  {label: 'ID', data: 'id', type: 'text', placeholder: individuo.id},   
                                  {label: 'Nombre Vulgar', data: 'nombreVulgar', type: 'text', placeholder: individuo.nombreVulgar},
                                  {label: 'Nombre Cientifico', data: 'nombreCientifico', type: 'text', placeholder: individuo.nombreCientifico},
                                  {label: 'Familia', data: 'nombreFamilia', type: 'text',placeholder: individuo.nombreFamilia},
                                  {label: 'Posicion', data: 'posicion', type: 'text', placeholder: individuo.posicion},
                                  {label: 'Altura', data: 'altura', type: 'number',placeholder: individuo.altura},
                                  {label: 'Diametro', data: 'diametro', type: 'number',placeholder: individuo.diametro},
                                  {label: 'Coleccion', data: 'coleccionID', type: 'text',placeholder: individuo.coleccionID}
                  ]}/>

                <Button style={{marginLeft: '15px'}}>Ver Historial</Button>
              </Card.Body>
            </Formik>
            <Col className='edit-control'>
            <div style={{marginTop: '35px'}}>
              <DeleteModal ruta ={'http://localhost:3001/api/individuo/' + id} next= {'/colecciones'} name= {'Eliminar individuo'}/>
              <Button variant='primary' type='button' style={{marginLeft:'15px'}} onClick={()=>{navigator('/individuos')}}>Cancelar</Button>
            </div>
            </Col> 
            </Card>
          </Col> 
        </Row>
      </Container>
    </div>
  )
}

export default IndividuosProfile