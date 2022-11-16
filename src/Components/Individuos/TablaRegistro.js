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
        axios.get('http://localhost:3001/api/individuos/record',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{  
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
        <InputGroup>
          <Form.Control placeholder='ID'></Form.Control>
          <Form.Control placeholder='Nombre Vulgar'></Form.Control>
          <Form.Control placeholder='Nombre científico'></Form.Control>
          <Form.Control placeholder='Nombre familia'></Form.Control>
        </InputGroup>
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
                <td>{value.fechacambio}</td>
                <td>{value.nombreVulgar}</td>
                <td>{value.id}</td>
                {
                  value.eliminado===true?
                  <td>
                  <Alert variant='danger'>Eliminado</Alert>
                  </td>:
                  <td>
                  <Alert variant='warning'>Editado</Alert>
                  </td>
                }
                <td>
                  <CustomModal
                  name='Datos completos'
                  title={`Modificado el ${value.fechacambio}`}
                  body={
                    <Row>
                      <Card>
                      <Card.Text>Id: {value.id}</Card.Text>
                      <Card.Text>Nombre Vulgar: {value.nombreVulgar}</Card.Text>
                      <Card.Text>Nombre Científico: {value.nombreCientifico}</Card.Text>
                      <Card.Text>Familia de individuos: {value.nombreFamilia}</Card.Text>         
                      <Card.Text>Altura: {value.altura}</Card.Text>
                      <Card.Text>Diámetro: {value.diametro}</Card.Text>
                      </Card>
                    </Row>
                  }

                  footer={
                    <>
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
                      <CustomModal 
                        name='Posicion'
                        title= {value.nombreCientifico}
                        body={
                      <MapContainer center={[value.latitud, value.longitud]}  zoom={18} style={{height:'350px', width:'100%'}}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[value.latitud,value.longitud]} icon={new Icon({iconUrl: markerIcon, iconSize: [25,41]})}>
                            <Popup>
                                {value.nombreCientifico}
                            </Popup>
                        </Marker>
                      </MapContainer>
              }
              />
                    </>
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