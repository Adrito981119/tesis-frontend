import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Formulario from './Formulario';
import {Form} from 'formik'

function CustomOffCanvas(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Editar
    </Button>

    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Editar</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
        <Formulario campos={props.formControls}/>
         <Button variant='success' type='submit' style={{marginTop: '15px'}}>Guardar cambios</Button>
         </Form>
      </Offcanvas.Body>
    </Offcanvas>
  </>
);
}

export default CustomOffCanvas