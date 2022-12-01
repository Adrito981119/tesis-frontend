import {React, useEffect, useState,useRef} from 'react'
import axios from 'axios'
import {Container, Row,Col,Card,Button, Tab, Tabs,ListGroup,ButtonGroup,ToggleButton, Alert} from 'react-bootstrap'
import { Formik, Form,Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import TablaTareas from '../../Components/Tareas/TablaTareas'
import TablaTerminadas from '../../Components/Tareas/TablaTerminadas'
import Menu from '../../Components/Menu/Menu'



function Tareas() {
  const pendingTaskRef = useRef()
  const completeTaskRef = useRef()
  const [colecciones,setColecciones]=useState([])
  const [individuos,setIndividuos]=useState([])
  const [selectColeccion, setColeccion] = useState(null)
  const [selectInd,setInd]= useState([])


  const [radioValue, setRadioValue] = useState('2');

  const radios = [
    { name: 'Mantenimiento', value: '1' },
    { name: 'Otras', value: '2' },
  ];

  const LoadColecciones= ()=>{
    axios.get('http://localhost:3001/api/coleccion',{headers:{'token': localStorage.getItem('token')}}).then((res)=>{ 
          setColecciones(res.data)}
          )
  }

  const LoadColeccionMembers=(id)=>{
    axios.get(`http://localhost:3001/api/individuos/byColeccion/${id}`,{headers: {'token': localStorage.getItem('token')}}).then((res)=>{
      setIndividuos(res.data)
    });
  }
  const handleColeccionSelect= (id)=>{
    setColeccion(id)
    LoadColeccionMembers(id)
  }

  const handleIndSelect=(id)=>{
    selectInd.push(id)
  }

  useEffect(() => {
    LoadColecciones()
}, []);
  const initialValues={
      id:'',
      fechainicio:'',
      fechafin:'',
      descripcion:''
  }
  const onSubmit=(data,{resetForm})=>{
       let tarea = {}
       const lm=[]
      if(radioValue !=='1'){
          tarea ={
          id: data.id,
          fechainicio: data.fechainicio,
          fechafin: data.fechafin,
          descripcion: data.descripcion,
          cumplida: false,
          fechacumplida: null,
        }
      }else{
        for (const element of selectInd) {
          lm.push({IndividuoId: element})
        }
        tarea ={
          id: data.id,
          fechainicio: data.fechainicio,
          fechafin: data.fechafin,
          descripcion: data.descripcion,
          cumplida: false,
          Mantenimientos: lm
        }
      }
       if(data.fechafin> data.fechainicio){
          axios.post('http://localhost:3001/api/tareas',tarea,{headers:{'token': localStorage.getItem('token')}}).then(
            (res)=>{
              pendingTaskRef.current.LoadTask()
            }
          )
          resetForm()
          pendingTaskRef.current.LoadTask()
          window.location.reload(false)
          alert('Tarea programada con exito')
      }else
      {
        alert('La fecha de culminación de un tarea no puede ser anterior a su fecha de inicio')
      }
      

}

  const fecha = ()=>{
    const timestamp = Date.now()
    return Date(timestamp)
  }

  const tareaSchema= Yup.object().shape({
      id: Yup.string().required('Este campo es obligatorio'),
      fechainicio: Yup.date()
      .min(fecha(),'No se puede programar una tarea para un dia anterior a hoy')
      .required('Este campo es obligatorio'),
      fechafin:Yup.date()
      .min(fecha(),'No se puede programar una tarea para un dia anterior a hoy')
      .required('Este campo es obligatorio'),
      descripcion:Yup.string().required('Este campo es obligatorio'),
  })
  
  return (
    <div>
      <Menu/>
      <Container>
      <Tabs>
        <Tab eventKey='pendientes' title='Tareas pendientes'>
              <Row>
                <Col name='tabla'>
                  <Card>
                    <Card.Header>Tabla de tareas pendientes</Card.Header>
                    <Card.Body>
                      <TablaTareas ref={pendingTaskRef} />
                      </Card.Body>
                  </Card>
                </Col>

              </Row>
        </Tab>
        <Tab eventKey='terminadas' title='Tareas completadas'>
          <TablaTerminadas ref={completeTaskRef}/>
        </Tab>

        <Tab eventKey='add tarea' title='Programa nueva tarea'>
        <Container fluid>
          <Row>
            <Col xs='5'>
              <Card> 
                      <Card.Header>Programar tarea</Card.Header>
                      <Card.Body>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={tareaSchema}>
                          <Form>
                          <Card.Text>Id</Card.Text>
                            <Field className='form-control'  name='id' type='text' autoComplete='off'/>
                            <ErrorMessage name='id' component='span' />
                            <Card.Text>Fecha de inicio</Card.Text>
                            <Field className='form-control'  name='fechainicio' type='date'/>
                            <ErrorMessage name='fechainicio' component='span' />
                            <Card.Text>Fecha límite</Card.Text>
                            <Field className='form-control' name='fechafin' type='date'/>
                            <ErrorMessage name='fechafin' component='span' />
                            <Card.Text>Tipo</Card.Text>
                            <ButtonGroup>
                                {radios.map((radio, idx) => (
                                  <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={idx % 2 ? 'outline-success' : 'outline-primary'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                  >
                                    {radio.name}
                                  </ToggleButton>
                                ))}
                              </ButtonGroup>
                            <Card.Text>Descripción</Card.Text>
                            <Field as='textarea' name='descripcion' className="form-control" placeholder="Descripcion"/>
                            <ErrorMessage name='descripcion' component='span' />
                            <div style={{marginTop: '35px'}}>
                            <Button variant='success' type='submit'>Añadir</Button>
                            </div>
                          </Form>
                        </Formik>
                      </Card.Body>
                    </Card>
            </Col>
            <Col>
                    {
                      radioValue==='1'?
                      <Card> 
                        <Card.Header>Seleccionar individuos</Card.Header>
                        <Card.Body>
                          <Row>
                            <Col>
                            <ListGroup>
                              {
                                colecciones.map(
                                  (value)=>{
                                    return(
                                      <ListGroup.Item key={value.id} action onClick={()=>{handleColeccionSelect(value.id)}}>{value.nombreVulgar}</ListGroup.Item>
                                    )
                                  }
                                )
                              }
                            </ListGroup>
                            </Col>
                            <Col>
                            {
                              selectColeccion === null?
                              <Alert variant='danger'>Seleccione una coleccion</Alert>
                              :                           
                              <ListGroup>
                              {
                                individuos.length===0?
                                <Alert>Las coleccion no tiene ningún individuo</Alert>:
                                individuos.map(
                                  (value)=>{
                                    return(
                                      <ListGroup.Item key={value.id} action onClick={()=>{handleIndSelect(value.id)}}>{value.nombreVulgar}</ListGroup.Item>
                                    )
                                  }
                                )
                              }
                              </ListGroup>
                            }
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>:
                      <></>
                    }
            </Col>
          </Row>
        </Container>
        </Tab>
      </Tabs>
      </Container>
          </div>
  )
}

export default Tareas