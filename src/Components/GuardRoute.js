import { Route,Navigate} from 'react-router-dom'
import React from 'react'
import Login from '../Pages/Login/Login'

function GuardRoute(props) {

  return (
    <div>
        {
            props.auth?
            <><Navigate to = {props.path}/></>
            :
            <><Navigate to = '/' /></>
        }
    </div>
  )
}

export default GuardRoute