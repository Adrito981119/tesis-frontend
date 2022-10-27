import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row,Button, Card,Col} from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteModal from '../../Components/DeleteModal';
import Menu from '../../Components/Menu/Menu'

function PersonProfile() {
  let navigator = useNavigate();

    const {ci} = useParams();
    const [person,setPerson]   = useState({});
    useEffect(()=>{
            axios.get(`http://localhost:3001/api/personal/${ci}`,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
                setPerson(res.data)
                console.log(person)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[person.ci])


  return (
    <div>
      <Menu/>
            <Container fluid='true'>
        <Row mb-1='true'>
          <Col>
          <p>foto</p>
          </Col>

          <Col>
          <Card style={{ width: '75%', margin: 'auto', marginTop: '50px' }} bg='light'>
              <Card.Body>
                <Card.Title>{person.nombre} {person.pApellido} {person.sApellido}</Card.Title>
                <label className='form-label'>Carnet de identidad: {person.ci}</label><br/>
                <label className='form-label'>Correo electronico: {person.email}</label><br/>
                <label className='form-label'>Telefono: {person.telefono}</label><br/>
                <label className='form-label'>Plaza: {person.cargo}</label><br/>
              </Card.Body>
              <Col>           
              <DeleteModal ruta ={'http://localhost:3001/api/personal/' + ci}  next= {'/personal'} name= {'Eliminar'}/>
              <Button variant='primary' type='button' style={{marginLeft:'15px'}} onClick={()=>{navigator('/personal')}}>Cancelar</Button>
              </Col>
          </Card>
          </Col>  
        </Row>

      </Container>
    </div>
  )
}

export default PersonProfile