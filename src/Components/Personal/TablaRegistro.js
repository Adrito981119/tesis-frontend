import { React,useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import { Table,InputGroup,Alert,Row,Card,OverlayTrigger,Popover,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer,Marker,TileLayer,Popup } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import axios from 'axios';
import {BsFillEmojiFrownFill} from 'react-icons/bs'
import Form from 'react-bootstrap/Form';
import CustomModal from '../CustomModal';
import { Icon } from 'leaflet';


const TablaRegistro=forwardRef(
    (props,ref)=>{ 
        const [record, setRecord] = useState([]); 
        useEffect(() => {
          Load()
      }, []);
    
      const Load=()=>{
        axios.get('http://localhost:3001/api/personal/record',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{  
          setRecord(res.data)
      },)
      }
    
      
      useImperativeHandle(ref,()=>({
        Load
      }))
    
    
      return (
        <div>
        {
          record.length===0?
          <Alert variant='danger' style={{textAlign: 'center', marginTop: '25px'}}>No existen elementos para mostrar <BsFillEmojiFrownFill/></Alert>:
          <>
          <div name='filtrado'>
        <label className='form-label'>Filtrar elementos</label>
        <InputGroup>
          <Form.Control placeholder='Carnet'></Form.Control>
          <Form.Control placeholder='Nombre'></Form.Control>
        </InputGroup>
        </div>
        <div name='registro de personal'>
          <Table striped hover style={{textAlign: 'center'}}>
            <thead>
              <tr>
                <th>Carnet de identidad</th>
                <th>Nombre Completo</th>
              </tr>
            </thead>
            <tbody>
            {record.map((value)=>{
                return (
                <tr key={value.ci}>
                <td>{value.ci}</td>
                <td>{value.fullname}</td>
                <td>
                  <CustomModal
                  name='Datos completos'
                  title='Ficha de antiguo empleado'
                  body={
                    <Row>
                      <Card>
                      <Card.Text>Carnet de identidad: {value.ci}</Card.Text>
                      <Card.Text>Nombre: {value.fullname}</Card.Text>
                      <Card.Text>Correo Electrónico: {value.email}</Card.Text>
                      <Card.Text>Telefono: {value.telefono}</Card.Text>         
                      <Card.Text>Cargo: {value.car}</Card.Text>
                      <Card.Text>Fecha de salida: {value.fechacambio}</Card.Text>
                      </Card>
                    </Row>
                  }

                  footer={
                    <OverlayTrigger 
                    trigger={['focus','hover']}
                    placement='auto' 
                    overlay={

                      <Popover>
                      <Popover.Header>
                        Motivo de la modificación
                      </Popover.Header>
                      <Popover.Body>
                        {value.motivo}
                      </Popover.Body>
                    </Popover>

                    }           
                    >
                      <Button>Motivo</Button>
                    </OverlayTrigger>
                  }
                  />
                </td>
                </tr>
                )
              })} 
            </tbody>         
          </Table>
        </div>   
          </>
        }
      </div>
      )
      })

export default TablaRegistro