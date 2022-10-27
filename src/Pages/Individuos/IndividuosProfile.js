import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Container, Row,Button, Card,Col,ButtonGroup} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomModal from '../../Components/CustomModal'
import Menu from '../../Components/Menu/Menu'

function IndividuosProfile() {
  let navigate = useNavigate();

  const {id} = useParams();
  const [individuo,setIndividuo]   = useState({});
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
              <Card.Body>
                <Card.Title>Coleccion</Card.Title>
                <Card.Text>ID: {individuo.id}</Card.Text>
                <Card.Text>Nombre Vulgar: {individuo.nombreVulgar}</Card.Text>
                <Card.Text>Nombre Cientifico: {individuo.nombreCientifico}</Card.Text>
                <Card.Text>Familia: {individuo.nombreFamilia}</Card.Text>
                <Card.Text>Diámetro: {individuo.diametro}</Card.Text>
                <Card.Text>Altura: {individuo.altura}</Card.Text>
                <Card.Text>Coleccion donde se encuentra: {individuo.coleccionID}</Card.Text>
                
              </Card.Body>
            <Col className='edit-control'>
              <ButtonGroup>
              <CustomModal 
                      name='Eliminar'
                      buttonStyle= 'danger'
                      title='Eliminar individuo'
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
                <Button variant='secondary' type='button'onClick={()=>{navigate('/individuos')}}>Atrás</Button>
              </ButtonGroup>
            </Col> 
            </Card>
          </Col> 
        </Row>
      </Container>
    </div>
  )
}

export default IndividuosProfile