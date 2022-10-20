import React from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../Components/Menu/Menu';
import {Container,Row,Col,Button,Card,Tabs,Tab} from 'react-bootstrap'

function Home() {


  return (
    <div  className='component-bg'>
      <Menu />
      <div name = 'dashboard' >
        <Container fluid>
          <Row name= 'notificaciones'>
            <Col sm={3}>
            <Card>
              <Card.Header>Notificaciones</Card.Header>
              <Card.Body>
                <Tabs>
                  <Tab eventKey='tareas pendientes' title='Tareas'>
                    <Card.Text>Tarea 1</Card.Text>
                    <Card.Text>Tarea 2</Card.Text>
                    <Card.Text>Tarea 3</Card.Text>
                    <Card.Text>Tarea 4</Card.Text>
                  </Tab>
                  <Tab eventKey='' title='Eventos'>
                  <Card.Text>Trabajo voluntario mañana</Card.Text>
                  <Card.Text>Visita a ******* en 4 días</Card.Text>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
            </Col>
          </Row>
        </Container>
      </div>
   </div>
  )
}

export default Home