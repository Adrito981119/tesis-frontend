
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteModal(props) {
    const navigator = useNavigate()
    const ruta = props.ruta
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDelete=()=>{
        axios.delete(ruta,{headers:{'token':localStorage.getItem('token')}}).then((res)=>{
          console.log(res.data)
          setShow(false)
        })
      }

            return (
                <>
                <Button variant="danger" onClick={handleShow}>
                  {props.name}
                </Button>
          
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{props.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Estas seguro que desea eliminar este elemento</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cerrar
                    </Button>
                    <Button variant="danger" onClick={()=>{
                      onDelete();
                      navigator(props.next)
                      }}>
                      Eliminar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )
}


export default DeleteModal