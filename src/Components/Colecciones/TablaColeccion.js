import {React,forwardRef,useImperativeHandle} from 'react'
import { useEffect, useState} from 'react';
import {Button,Table,Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BsFillEmojiFrownFill} from 'react-icons/bs'

const TablaColeccion=forwardRef(
  (props,ref)=>{
  const navigate = useNavigate();
  const [colecciones, setColecciones] = useState([]);
  const [individuos,setIndividuos] = useState([]);

  useImperativeHandle(ref,()=>({
    Load
  }))

  useEffect(() => {
    Load()
}, []);

const Load= ()=>{
  axios.get('http://localhost:3001/api/coleccion',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
    if(res.data.error){
        alert(res.data.err)
      }else{    
        setColecciones(res.data)}
    },)
}

const LoadColeccionMembers=(id)=>{
  axios.get(`http://localhost:3001/api/individuos/byColeccion/${id}`,{headers: {'token': localStorage.getItem('token')}}).then((res)=>{
    setIndividuos(res.data)
  });
}
  return (
    <div>
      <div name='tabla de colecciones'>
      {
        colecciones.length===0?
        <Alert variant='danger' style={{textAlign: 'center'}}>No existen elementos para mostrar <BsFillEmojiFrownFill/></Alert>:
        <Table striped hover style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Vulgar</th>
              <th>Nombre Cientifico</th>
              <th>Nombre de la familia</th>
              <th>Ver Ficha</th>
            </tr>
          </thead>
          <tbody>
          {colecciones.map((value)=>{
              return (
              <tr key={value.id}>
              <td>{value.id}</td>
              <td>{value.nombreVulgar}</td>
              <td>{value.nombreCientifico}</td>
              <td>{value.nombreFamilia}</td>
              <td><Button variant='primary' onClick={()=>{navigate(`/colecciones/${value.id}`)}}>Ver</Button></td>
              </tr>
              )
            })} 
          </tbody>         
        </Table>
      }
      </div>   
    </div>
  )
  }
)

export default TablaColeccion