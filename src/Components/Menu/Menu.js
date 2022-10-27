import {React, useState} from 'react'
import './Menu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import{Container,Nav,Navbar,Button,ButtonGroup,Dropdown,DropdownButton,Modal} from 'react-bootstrap'
import {BsFillPersonLinesFill,BsGeoAltFill,BsShieldLockFill,BsPeopleFill,BsFillHouseFill,
    BsFillCalendarWeekFill,BsFillPersonBadgeFill,BsFillTagFill,BsFillTagsFill} from 'react-icons/bs'
import axios from 'axios';




function Menu(props) {
    let navigator = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logout = ()=>{
        localStorage.removeItem('token')
        navigator('/')
    }

    const initialValues={
        oPass : '',
        nPass : '',
    }
    const changePassword=(data)=>{
        axios.put(`http://localhost:3001/auth/users/changepassword/`,data)
    }
    const changeSchema= Yup.object().shape({
        oPass: Yup.string().required('Este campo es obligatorio'),
        nPass: Yup.string().required('Este campo es obligatorio'),
      })
  return (
    <div>              
        <div name='navbar'>
            <Navbar bg="dark" >
            <Container fluid>
                <Nav>
                    <div>
                    <Navbar.Brand>Logo</Navbar.Brand>
                    </div>
                    <ButtonGroup>
                    <Button  type='button' onClick={()=>{navigator('/home')}}><BsFillHouseFill/></Button>
                    <Button  type='button' onClick={()=>{navigator('/colecciones')}}><BsFillTagsFill/>Colecciones</Button>
                    <Button  type='button' onClick={()=>{navigator('/individuos')}}><BsFillTagFill/>Individuos</Button>
                    <Button  type='button' onClick={()=>{navigator('/personal')}}><BsFillPersonBadgeFill/>Personal</Button>
                    <Button  type='button' onClick={()=>{navigator('/tareas')}}><BsFillCalendarWeekFill/>Tareas</Button>
                    <Button  type='button' onClick={()=>{navigator('/equipos')}}><BsPeopleFill/>Equipos</Button>
                    <Button  type='button' onClick={()=>{navigator('/mapa')}}><BsGeoAltFill/>Mapa</Button>
                    <Button  type='button' onClick={()=>{navigator('/usuarios')}}><BsFillPersonBadgeFill/>Usuarios</Button>
                    <DropdownButton as={ButtonGroup} type='button' title= {<BsFillPersonLinesFill/>}>
                        <Dropdown.Item onClick={handleShow}>
                            <BsShieldLockFill/> Cambiar contraseña
                        </Dropdown.Item>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Cambiar Contraseña</Modal.Title>
                                </Modal.Header>
                                <Formik initialValues={initialValues} onSubmit={changePassword} validationSchema={changeSchema}>
                                <Form>
                                <Modal.Body>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type='submit'>Cambiar</Button>
                                </Modal.Footer>
                                </Form>
                            </Formik>
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