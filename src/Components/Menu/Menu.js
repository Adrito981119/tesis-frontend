import {React, useState} from 'react'
import './Menu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
import{Container,Nav,Navbar,Button,ButtonGroup,Dropdown,DropdownButton,Form, InputGroup,Modal} from 'react-bootstrap'
import {BsFillPersonLinesFill,BsGeoAltFill,BsShieldLockFill,BsPeopleFill,BsFillHouseFill,
    BsFillCalendarWeekFill,BsFillPersonBadgeFill,BsFillTagFill,BsFillTagsFill} from 'react-icons/bs'



function Menu(props) {
    let navigator = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logout = ()=>{
        localStorage.removeItem('token')
        navigator('/')
    }
  return (
    <div>              
        <div name='navbar'>
            <Navbar bg="dark"  d-flex='true' justify-content-center='true' className='d-flex justify-content-center'>
            <Container fluid>
                <Nav>
                    <div>
                    <Navbar.Brand>Algo</Navbar.Brand>
                    </div>
                    <ButtonGroup>
                    <Button className='boton' type='button' onClick={()=>{navigator('/home')}}><BsFillHouseFill/></Button>
                    <Button className='boton' type='button' onClick={()=>{navigator('/colecciones')}}><BsFillTagsFill/>Colecciones</Button>
                    <Button className='boton' type='button' onClick={()=>{navigator('/individuos')}}><BsFillTagFill/>Individuos</Button>
                    <Button className='boton' type='button' onClick={()=>{navigator('/personal')}}><BsFillPersonBadgeFill/>Personal</Button>
                    <Button className='boton' type='button' onClick={()=>{navigator('/tareas')}}><BsFillCalendarWeekFill/>Tareas</Button>
                    <Button className='boton' type='button' onClick={()=>{navigator('/equipos')}}><BsPeopleFill/>Equipos</Button>
                    <Button className='boton' type='button' disabled={true} onClick={()=>{navigator('/mapa')}}><BsGeoAltFill/>Mapa</Button>
                    <Button className='boton' type='button' onClick={()=>{navigator('/usuarios')}}><BsFillPersonBadgeFill/>Usuarios</Button>
                    <DropdownButton as={ButtonGroup} type='button' title= {<BsFillPersonLinesFill/>}>
                        <Dropdown.Item onClick={handleShow}>
                            <BsShieldLockFill/> Cambiar contraseña
                        </Dropdown.Item>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Cambiar Contraseña</Modal.Title>
                                </Modal.Header>
                                <Form>
                                <Modal.Body>
                                    
                                        <Form.Label>Contraseña anterior</Form.Label>
                                        <Form.Control type='password'></Form.Control>
                                        <Form.Label>Nueva contraseña</Form.Label>
                                        <Form.Control type='password'></Form.Control>
                                   
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type='submit'>Cambiar</Button>
                                </Modal.Footer>
                                </Form>
                            </Modal>

                        <Dropdown.Item onClick={()=>{logout()}}>Cerrar sesion</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                </Nav>
            </Container>
            </Navbar>
        </div>
</div>
  )
}

export default Menu