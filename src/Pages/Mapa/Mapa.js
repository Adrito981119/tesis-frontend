import {React} from 'react'
import './Mapa.css'
import 'leaflet/dist/leaflet.css'
import Menu from '../../Components/Menu/Menu'
import { MapContainer,TileLayer} from 'react-leaflet'


function Mapa() {
          //[23.035655, -81.510356]
  

  return (
    <div className='component'>
        <Menu/>
        <MapContainer center={[23.035655, -81.510356]} zoom={18} className='mapa'>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
    </MapContainer>
    </div>
  )
}

export default Mapa