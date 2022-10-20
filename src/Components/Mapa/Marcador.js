import {React, useState} from 'react'
import { useMapEvents, Marker, Popup } from 'react-leaflet'

function Marcador(props) {
    const [position, setPosition] = useState(null)
    const map =useMapEvents({
        dblclick(p){
           setPosition(p.latlng)
           console.log(p)
        }
    })
  return position ===null?null: (
    <Marker position={position}>
        <Popup>{props.pop}</Popup>
    </Marker>
  )
}

export default Marcador