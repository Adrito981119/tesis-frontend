import { React,useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import {Button,Table,Form, InputGroup,Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BsFillEmojiFrownFill} from 'react-icons/bs'

const TablaPersonal = forwardRef(
  (props,ref)=>{
    const navigator = useNavigate();

    const [personal, setPersonal] = useState([]);
  
    useEffect(() => {
      Load()
  }, []);

  const Load=()=>{
    axios.get('http://localhost:3001/api/personal',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{ 
      setPersonal(res.data)
  },)
  }
  useImperativeHandle(ref,()=>({
    Load
  }))

  
  return (
    <div>
      {
        personal.length===0?
        <Alert variant='danger' style={{textAlign: 'center', marginTop: '25px'}}>No existe elementos para mostrar<BsFillEmojiFrownFill/></Alert>:
        <>
        <div name='filtrado'>
    <label className='form-label'>Filtrar elementos</label>
{/*     <InputGroup>
      <Form.Control placeholder='Carnet de identidad'></Form.Control>
      <Form.Control placeholder='Nombre'></Form.Control>
    </InputGroup> */}
    </div>
    <div name='tabla de personal'>
      <Table striped hover style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Nombre completo</th>
            <th>Ver Ficha</th>
          </tr>
        </thead>
        <tbody>
        {personal.map((value)=>{
            return (
            <tr key={value.ci}>
            <td>{value.ci}</td>
            <td style={{textTransform: 'capitalize'}}>{value.fullname}</td>
            <td><Button variant='primary' onClick={()=>{navigator(`/personal/${value.ci}`)}}>Ver</Button></td>
            </tr>
            )
          })} 
        </tbody>         
      </Table>
    </div>   
        </>
      }
    
  </div>
  )
  }
)

export default TablaPersonal