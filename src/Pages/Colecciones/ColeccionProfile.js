import {React,useEffect,useState} from 'react'
import './Colecciones.css'
import { useParams } from 'react-router-dom'
import { Container, Row,Button, Card,Col, Table } from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomOffCanvas from '../../Components/CustomOffCanvas';
import DeleteModal from '../../Components/DeleteModal'
import Menu from '../../Components/Menu/Menu';
function ColeccionProfile() {

    let navigator = useNavigate();

    const {id} = useParams();
    const [coleccion,setColeccion]   = useState({});
    const [individuos,setIndividuos] = useState([]);
    useEffect(()=>{
            axios.get(`http://localhost:3001/api/coleccion/${id}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
                setColeccion(res.data)
            });
            axios.get(`http://localhost:3001/api/individuos/byColeccion/${id}`,{headers: {'token': localStorage.getItem('token')}}).then((res)=>{
              setIndividuos(res.data)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[coleccion.id])
  
    const initialValues={
      id:coleccion.id,
      nombreVulgar:coleccion.nombreVulgar,
      nombreCientifico:coleccion.nombreCientifico,
      nombreFamilia:coleccion.nombreFamilia,
      posicion:coleccion.posicion,
      cant:coleccion.cant
  }

  const onSubmit=(data)=>{
    axios.put(`http://localhost:3001/api/coleccion/${coleccion.id}`,data,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    window.location.reload(false)
  })
}

  const coleccionSchema= Yup.object().shape({
    id: Yup.string().required('Este campo es obligatorio'),
    nombreVulgar:Yup.string().required('Este campo es obligatorio'),
    nombreCientifico:Yup.string().required('Este campo es obligatorio'),
    nombreFamilia:Yup.string().required('Este campo es obligatorio'),
    posicion:Yup.string(),
    cant:Yup.number('El valor debe ser un numero').positive('La cantidad no puede ser un numero menor que 0').required('Este campo es obligatorio'),
  })

  return (
    <div>
      <Menu />
      <Container fluid='true'>
        <Row mb-1='true'>

          <Col>
           <Table striped='true' hover='true' style={{align: 'center'}}>
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
                    <tr>
                      <td>{value.id}</td>
                      <td>{value.nombreVulgar}</td>
                      <td>{value.nombreCientifico}</td>
                      <td><Button variant='primary' onClick={()=>{navigator(`/individuos/${value.id}`)}}>Ver</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
           </Table>
          </Col>


          <Col>
            <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
              <Card.Body>
                <Card.Title>Coleccion</Card.Title>
                <Card.Text>ID: {coleccion.id}</Card.Text>
                <Card.Text>Nombre Vulgar: {coleccion.nombreVulgar}</Card.Text>
                <Card.Text>Nombre Cientifico: {coleccion.nombreCientifico}</Card.Text>
                <Card.Text>Familia: {coleccion.nombreFamilia}</Card.Text>
                <Card.Text>Posicion: {coleccion.posicion}</Card.Text>
                <Card.Text>Total de individuos: {coleccion.cant}</Card.Text>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={coleccionSchema}>
                  <CustomOffCanvas formControls={[
                                  {label: 'ID', data: 'id', type: 'text', placeholder: coleccion.id},   
                                  {label: 'Nombre Vulgar', data: 'nombreVulgar', type: 'text', placeholder: coleccion.nombreVulgar},
                                  {label: 'Nombre Cientifico', data: 'nombreCientifico', type: 'text', placeholder: coleccion.nombreCientifico},
                                  {label: 'Familia', data: 'nombreFamilia', type: 'text',placeholder: coleccion.nombreFamilia},
                                  {label: 'Posicion', data: 'posicion', type: 'text', placeholder: coleccion.posicion},
                                  {label: 'Cantidad de individuos', data: 'cant', type: 'text',placeholder: coleccion.cant}
                  ]}/>
                </Formik>
                <Button style={{marginLeft: '15px'}}>Ver Historial</Button>
              </Card.Body>
              <Col className='edit-control'>
                    <div style={{marginTop: '35px'}}>
                      <DeleteModal ruta ={'http://localhost:3001/api/coleccion/' + id} next= {'/colecciones'} name= {'Eliminar coleccion'}/>
                      <Button variant='primary' type='button' style={{marginLeft:'15px'}} onClick={()=>{navigator('/colecciones')}}>Cancelar</Button>
                    </div>
              </Col> 
            </Card>
          </Col>  
        </Row>
      </Container>
    </div>
  )
}

export default ColeccionProfile