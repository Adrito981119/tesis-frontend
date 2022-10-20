import React from 'react'
import Menu from '../../Components/Menu/Menu'
import {MapContainer, TileLayer,FeatureGroup,Circle} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Mapa.css'
import Marcador from '../../Components/Mapa/Marcador'
import Area from '../../Components/Mapa/Area'

function Mapa() {
  return (
    <div className='component text-center'>
        <Menu/>
        <MapContainer center={[23.035655, -81.510356]} zoom= {18} className='mapa'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    </div>
  )
}

export default Mapa