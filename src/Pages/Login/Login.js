import React from 'react'
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap'
import {Formik, Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState, useEffect}from 'react'

function Login() {

  
 const [authState, setAuthState]=useState(false)

 useEffect(()=>{
  localStorage.removeItem('token')
  axios.get('http://localhost:3001/api/auth/verify',{headers: {'token': localStorage.getItem('token')}}).then((res)=>{
    if(res.data.error){
      setAuthState(false)
    }else{
      setAuthState(true)
    }
  });
 })

  let navigator = useNavigate();
  const initialValues={
    username: '',
    password: ''
}

const onSubmit=(data)=>{axios.post('http://localhost:3001/auth/login',data).then((res)=>{
  if(res.data.error){
    alert(res.data.error)
  }else{
    localStorage.setItem('token',res.data)
    navigator('/home')
  }

})}

const loginSchema= Yup.object().shape({
    username: Yup.string().required('El nombre de usuario esta vacio'),
    password: Yup.string().required('El campo contraseña esta vacio')
})


  return (
    <div className="App App-header">
    <Card style={{ width: '18rem', margin: 'auto', marginTop: '50px' }} className='bg-light'>
      <Card.Body>
        <Card.Title style={{color: 'black'}}>Bienvenido</Card.Title>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginSchema}>
            <Form>
                <label className='form-label' style={{color: 'black'}}>Usuario</label>
                <Field className='form-control' id='username' name='username' placeholder="Entre su usuario" />
                <div><ErrorMessage name='username' component='span'/></div>
                <label className='form-label' style={{color: 'black'}}>Contraseña</label>
                <Field className='form-control' type='password' id='password' name='password' placeholder="Contraseña" />
                <div><ErrorMessage name='password' component='span'/></div>
                <label className="text-muted form-label"style={{fontSize:12}}>Nunca comparta su contraseña con otros</label>

              <Button type='submit' variant="primary">Acceder</Button>
            </Form>
          </Formik>
      </Card.Body>
    </Card>
  </div>
  )
}
export default Login