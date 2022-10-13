import React from 'react'
import axios from 'axios'
import { useEffect, useState} from 'react';
import {Field} from 'formik'

function SelectComponent(props) {

    const [list, setList] = useState([]);
    const [val, setValue] = useState({value: null})

    const handleChange = (v)=>{
        setValue(v)
    }

    useEffect(() => {
    axios.get(props.ruta,{headers:{'token': localStorage.getItem('token')}}).then((res)=>{
      if(res.data.error){
          alert(res.data.error)
        }else{    
          setList(res.data)}
      },)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
        <Field as ='select' className='form-select' name= {props.name} id= {props.id}>
            <option defaultValue = 'null' onChange={()=>{handleChange()}}>Seleccione la coleccion</option>
            {
                list.map((value)=>{
                    return(
                        <option key={value.id} value={value.id} id={value.id} name={value.nombreCientifico}>
                            {value.nombreVulgar}
                        </option>
                    )
                })
            }
        </Field>
    </div>
  )
}

export default SelectComponent