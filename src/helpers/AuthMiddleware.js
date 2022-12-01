/* import {forwardRef,useImperativeHandle,useState,useRef,useEffect} from 'react'
import axios from 'axios';

const AuthMiddleware = forwardRef(
    (props, ref)=>{
        const [authState, setAuthState]=useState(false)
        const authStateRef = useRef(null)
        useEffect(() => {      
            authStateRef.current = authState
            console.log(`referencia: ${authStateRef.current}`)
        },[authState, authStateRef])

        useImperativeHandle(ref,()=>({
            verify,
            getAuthState
          }))
        const verify = ()=>{
            axios.get('http://localhost:3001/auth/verify',{headers: {'token': localStorage.getItem('token')}}).then(()=>{
                  setAuthState(true)
                  console.log(`verify: ${authState}`)
              });
        }
        const getAuthState = ()=>{
            return authStateRef.current
        }
    }
)

export default AuthMiddleware */


import { createContext } from "react";
export const AuthMiddleware = createContext('')