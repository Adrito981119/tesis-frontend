import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row,Button, Card,Col, Table,ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../Components/Menu/Menu';
import CustomModal from '../../Components/CustomModal';
function ColeccionProfile() {

    let navigate = useNavigate();

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

        const onDelete=()=>{
          axios.delete(`http://localhost:3001/api/colecion/${id}`,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
            navigate('/colecciones')
          })}
        
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
            <Card.Header>Coleccion</Card.Header>
              <Card.Body>
                <Card.Text>Id: {coleccion.id}</Card.Text>
                <Card.Text>Nombre Vulgar: {coleccion.nombreVulgar}</Card.Text>
                <Card.Text>Nombre Cientifico: {coleccion.nombreCientifico}</Card.Text>
                <Card.Text>Familia: {coleccion.nombreFamilia}</Card.Text>
                <Card.Text>Posicion: {coleccion.posicion}</Card.Text>
                <Card.Text>Total de individuos: {coleccion.cant}</Card.Text>
              </Card.Body>
              <Col className='edit-control'>
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
              </Col> 
            </Card>
          </Col>  
        </Row>
      </Container>
    </div>
  )
}

export default ColeccionProfile