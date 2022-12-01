import {React, useState,useContext} from 'react'
import './Menu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {Formik,Form,Field} from 'formik'
import{Container,Nav,Navbar,Button,ButtonGroup,Dropdown,DropdownButton,Modal} from 'react-bootstrap'
import {BsFillPersonLinesFill,BsGeoAltFill,BsShieldLockFill,BsPeopleFill,
    BsFillCalendarWeekFill,BsFillPersonBadgeFill,BsFillTagFill,BsFillTagsFill} from 'react-icons/bs'
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { AdminContext } from '../../helpers/AdminContext';


function Menu(props) {
    const {setAuthState} = useContext(AuthContext)
    const {setAdminState} = useContext(AdminContext)
    const navigator = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setAuthState(false)
        setAdminState(false)
        navigator('/')
    }

    const initialValues={
        oPass : '',
        nPass : '',
    }
    const changePassword=(data)=>{
        const user = localStorage.getItem('user')
        axios.put(`http://localhost:3001/auth/users/changepassword/${user}`,data,
        {headers: {'token': localStorage.getItem('token')}})
        .then((res)=>{
            if(res.data.error){
                alert(res.data.error)
            }else{
                alert(res.data)
            }
        })
    }
    const changeSchema= Yup.object().shape({
        oPass: Yup.string().required('Este campo es obligatorio'),
        nPass: Yup.string().required('Este campo es obligatorio'),
      })
  return (
    <div>              
        <div name='navbar'>
            <Navbar bg="dark" expand='sm'>
            <Container fluid>
                <Nav>
                    <div style={{display: 'flex'}}>
                    <Navbar.Brand>JBM</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </div>
                    <Navbar.Collapse id="responsive-navbar-nav">
                   
                    <ButtonGroup>
                    <Button  type='button' onClick={()=>{navigator('/mapa')}}><BsGeoAltFill/></Button>
                    <Button  type='button' onClick={()=>{navigator('/colecciones')}}><BsFillTagsFill/>Colecciones</Button>
                    <Button  type='button' onClick={()=>{navigator('/individuos')}}><BsFillTagFill/>Individuos</Button>
                    <Button  type='button' onClick={()=>{navigator('/personal')}}><BsPeopleFill/>Personal</Button>
                    <Button  type='button' onClick={()=>{navigator('/tareas')}}><BsFillCalendarWeekFill/>Tareas</Button>
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
                                    <label className='form-label'>Contraseña antigua</label>
                                    <Field className="form-control" type='password' name= 'oPass' id= 'oPass' />
                                    <label className='form-label'>Nueva contraseña</label>
                                    <Field className="form-control" type='password' name= 'nPass' id= 'nPass' />
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
                    </Navbar.Collapse>

 
                </Nav>
            </Container>
            </Navbar>
        </div>
</div>
  )
}

export default Menu