import {React, useState} from 'react'
import { useMapEvents, Marker, Popup, Polygon } from 'react-leaflet'

function Area(props) {
    const [position, setPosition] = useState([])
    const map =useMapEvents({
        click(p){
           setPosition(position.concat(p.latlng))
           console.log(position)
        }
    })
  return position===null?null: (
    <Polygon positions={position}></Polygon>
  )
}

export default Area