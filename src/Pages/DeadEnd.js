import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'

function DeadEnd() {
    let navigate = useNavigate()
  return (
    <div className="App App-header">
    <Card style={{ width: '18rem', margin: 'auto', marginTop: '50px' }} className='bg-light'>
      <Card.Body>
        <Card.Title style={{color: 'black'}}>Acceso denegado</Card.Title>
          <Button onClick={()=>{navigate('/')}}>Regresar</Button>
      </Card.Body>
    </Card>
  </div>
  )
}

export default DeadEnd