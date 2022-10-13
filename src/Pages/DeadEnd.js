import React from 'react'
import { useNavigate } from 'react-router-dom'

function DeadEnd() {
    let navigator = useNavigate()
  return (
    <div>
        <button onClick={()=>{navigator('/')}}>Vira pa atras mejo -_-</button>
    </div>
  )
}

export default DeadEnd