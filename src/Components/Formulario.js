import React from 'react'
import {Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';


//props debera ser un array de objetos de forma q [{label, campo}]
function Formulario(props) {
  return (
    <div>
        {
            props.campos.map((value)=>{
                return(
                    <div key = {value.data}>
                            <label className='form-label'>{value.label}</label>
                            <Field className='form-control'
                            autoComplete = 'off'
                            id= {value.data}
                            name={value.data}
                            type={value.type}
                            placeholder={value.placeholder}
                            />
                            <div> <ErrorMessage name={value.data} component='span'/></div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Formulario