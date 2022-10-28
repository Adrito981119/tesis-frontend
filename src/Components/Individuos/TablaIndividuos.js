import { React,useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import {Button, Table,InputGroup,Alert,OverlayTrigger,Popover} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BsFillEmojiFrownFill} from 'react-icons/bs'
import Form from 'react-bootstrap/Form';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import CustomModal from '../CustomModal'
import { Icon } from 'leaflet';

const TablaIndividuos=forwardRef(
(props,ref)=>{

    const navigate = useNavigate();

    const [individuos, setIndividuos] = useState([]); 
    useEffect(() => {
      Load()
  }, []);

  const Load=()=>{
    axios.get('http://localhost:3001/api/individuos',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{  
      setIndividuos(res.data)
  },)
  }

  
  useImperativeHandle(ref,()=>({
    Load
  }))


  return (
    <div>
    {
      individuos.length===0?
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
            <th>Id</th>
            <th>Nombre Vulgar</th>
            <th>Nombre Cientifico</th>
            <th>Nombre de la familia</th>
            <th>Altura</th>
            <th>Diámetro</th>
            <th>Posicion</th>
            <th>Ver Ficha</th>
          </tr>
        </thead>
        <tbody>
        {individuos.map((value)=>{
            return (
            <tr key={value.id}>
            <td>{value.id}</td>
            <td>{value.nombreVulgar}</td>
            <td>{value.nombreCientifico}</td>
            <td>{value.nombreFamilia}</td>
            <td>{value.altura}</td>
            <td>{value.diametro}</td>
            <td>
              {
                value.latitud == null & value.longitud ==null ? 
                <OverlayTrigger 
                trigger={['focus','hover']}
                placement='auto' 
                overlay={

                  <Popover>
                  <Popover.Header>
                    ¿Por qué sucede esto?
                  </Popover.Header>
                  <Popover.Body>
                    <p>
                      El individuo no tiene una posicion registrada, puede añadirse una en el menu de Ver Ficha
                    </p>
                  </Popover.Body>
                </Popover>

                }           
                >
                  <Button variant='secondary'>Ver en el mapa</Button>
                </OverlayTrigger> 
                :
              <CustomModal 
              name='Ver mapa'
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
              }
            </td>
            <td><Button variant='primary' onClick={()=>{navigate(`/individuos/${value.id}`)}}>Ver</Button></td>
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

export default TablaIndividuos