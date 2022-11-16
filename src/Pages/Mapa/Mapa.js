import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Mapa.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet';
import Menu from '../../Components/Menu/Menu'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {Button, Card} from 'react-bootstrap'
import axios from 'axios';


function Mapa() {
          //[23.035655, -81.510356]
  const navigate = useNavigate()
  const [markers,setMarkers] = useState([])
  useEffect(
    ()=>{
      axios.get('http://localhost:3001/api/individuos',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
        setMarkers(res.data)
      })
    }
    ,[])
  return (
    <div className='component'>
        <Menu/>
        <MapContainer center={[23.035655, -81.510356]} zoom={18} className='mapa'>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          {
            markers.map((value)=>{
              return(
                <Marker key={value.id} position={[value.latitud,value.longitud]} icon={new Icon({iconUrl: markerIcon, iconSize: [25,41]})}>
                <Popup>
                <p>Nombre Vulgar: {value.nombreVulgar}</p>
                 <p>Nombre científico: {value.nombreCientifico}</p>
                 <Button onClick={()=>{navigate(`/individuos/${value.id}`)}}>Ver datos</Button>
                </Popup>
            </Marker>
              )
            })
          }
    </MapContainer>
    </div>
  )
}

export default Mapa