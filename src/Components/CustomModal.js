import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    <Button variant= {props.buttonStyle} onClick={handleShow}>
      {props.name}
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={()=>{handleClose()}}>Cerrar</Button>
        {props.footer}
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default CustomModal