import { React,useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import { Table,Alert,Row,Card,OverlayTrigger,Popover,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer,Marker,TileLayer,Popup } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import axios from 'axios';
import {BsFillEmojiFrownFill} from 'react-icons/bs'

import CustomModal from '../CustomModal';
import { Icon } from 'leaflet';
import 'moment/locale/es';
import moment from 'moment';


const TablaRegistro=forwardRef(
    (props,ref)=>{ 
        const [record, setRecord] = useState([]); 
        useEffect(() => {
          Load()
      }, []);
    
      const Load=()=>{
        axios.get('http://localhost:3001/api/coleccion/record',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{  
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
          <>
          <Alert variant='danger' style={{textAlign: 'center', marginTop: '25px'}}>No existen elementos para mostrar <BsFillEmojiFrownFill/></Alert>
          </>:
          <>
          <div name='filtrado'>
        <label className='form-label'>Filtrar elementos</label>
     {/*    <InputGroup>
          <Form.Control placeholder='ID'></Form.Control>
          <Form.Control placeholder='Nombre Vulgar'></Form.Control>
          <Form.Control placeholder='Nombre científico'></Form.Control>
          <Form.Control placeholder='Nombre familia'></Form.Control>
        </InputGroup> */}
        </div>
        <div name='tabla de colecciones'>
          <Table striped hover style={{textAlign: 'center'}}>
            <thead>
              <tr>
                <th>Fecha de modificación</th>
                <th>Id</th>
                <th>Nombre Vulgar</th>
              </tr>
            </thead>
            <tbody>
            {record.map((value)=>{
                return (
                <tr key={value.fechacambio}>
                <td>{moment(value.fechacambio).locale('es').format('DD [de] MMMM [del] YYYY')}</td>
                <td>{value.nombreVulgar}</td>
                <td>{value.id}</td>
                <td>
                  <CustomModal
                  name='Datos completos'
                  title={`Modificado el ${moment(value.fechacambio).locale('es').format('DD [de] MMMM [del] YYYY')}`}
                  body={
                    <Row>
                      <Card>
                      <Card.Text>Id: {value.id}</Card.Text>
                      <Card.Text>Nombre Vulgar: {value.nombreVulgar}</Card.Text>
                      <Card.Text>Nombre Científico: {value.nombreCientifico}</Card.Text>
                      <Card.Text>Familia de individuos: {value.nombreFamilia}</Card.Text>         
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
                  <Button variant='secondary'>Motivo</Button>
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