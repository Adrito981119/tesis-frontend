import React, { useState } from 'react';
import { Formik,Form } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const form = props.form
    const initialValues = props.initialValues
    const onSubmit = props.onSubmit
    const validationSchema = props.validationSchema

  return (
    <>
    <Button variant= {props.buttonStyle} onClick={handleShow}>
      {props.name}
    </Button>
    {
      form?
      <>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant={props.submitStyle} type='submit'>{props.submitText}</Button>
        {props.footer}
        <Button variant='secondary' onClick={()=>{handleClose()}}>Cerrar</Button>
      </Modal.Footer>
      </Form>
      </Formik>
    </Modal>
      </>
      :
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        {props.footer}
        <Button variant='secondary' onClick={()=>{handleClose()}}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
    }

  </>
  )
}

export default CustomModal