import {React,useContext, useEffect} from 'react'
import { AuthContext } from '../../helpers/AuthContext';
import { AdminContext } from '../../helpers/AdminContext';
import axios from 'axios';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap'
import {Formik, Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'


function Login() {
  const navigate = useNavigate();
  const {setAuthState} = useContext(AuthContext)
  const {setAdminState} = useContext(AdminContext)
 useEffect(()=>{
      if(localStorage.getItem('token'))
      {verify()}
 })

 const verify = ()=>{
  axios.get('http://localhost:3001/auth/verify',{headers: {'token': localStorage.getItem('token'), 'user': localStorage.getItem('user')
}}).then((response)=>{
    if(response.data.error){
      navigate('/')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }else{
      console.log(response.data)
      if(response.data === 0 || response.data ===1){
        setAdminState(true)
      }
      navigate('/mapa')
    }
});
 }
  const initialValues={
    username: '',
    password: ''
}

const onSubmit=(data)=>{axios.post('http://localhost:3001/auth/login',data).then((res)=>{
  if(res.data.error){
    alert(res.data.error)
  }else{
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('user',res.data.user)
    setAuthState(true)
    if(res.data.rol===0 ||res.data.rol===1)
    setAdminState(true)
    navigate('/mapa')
  }
})}

const loginSchema= Yup.object().shape({
    username: Yup.string().required('El nombre de usuario esta vacío'),
    password: Yup.string().required('El campo contraseña esta vacío')
})


  return (
    <div className="App App-header">
    <Card style={{ width: '18rem', margin: 'auto', marginTop: '50px' }} className='bg-light'>
      <Card.Body>
        <Card.Title style={{color: 'black'}}>Bienvenido</Card.Title>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginSchema}>
            <Form>
                <label className='form-label' style={{color: 'black'}}>Usuario</label>
                <Field className='form-control' id='username' name='username' placeholder="Entre su usuario" autoComplete='off'/>
                <div><ErrorMessage name='username' style={{color: 'black'}} component='span'/></div>
                <label className='form-label' style={{color: 'black'}}>Contraseña</label>
                <Field className='form-control' type='password' id='password' name='password' placeholder="Contraseña" autoComplete='off'/>
                <div><ErrorMessage name='password' style={{color: 'black'}} component='span'/></div>
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