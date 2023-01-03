import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { createDog, getDogTemperaments } from "../../redux/actions/actions"
import defaultdog from "../Images/defaultDog.png"
import logo from "../Images/logo.png"
import "./Form.css"

const Form = ()=> {
    const dispatch = useDispatch()
    const temperamentsState = useSelector(state => state.temperaments)
    const dogs = useSelector(state => state.allDogs)

    
    function validation(input) {
        let errors = {};
        if(!input.name) {
          errors.name = "Debes ponerle un nombre."
        } else if(!/^[A-Za-z]+$/i.test(input.name)) {
          errors.name = "Solo puede contener letras-"
        } else if(parseInt(input.name.length) >= 25) {
          errors.name= "Debe contener menos de 25 caracteres."
        } else if (dogs.find(e => e.name === input.name)) {
            errors.name = "Debe ingresar una raza que no esté creada."
        }

        if(!input.maxHeight) {
          errors.maxHeight = "Altura max requerida."
        } else if(parseInt(input.maxHeight) > 85) {
          errors.maxHeight = "Debe ser menor a 85 CM." 
        } else if(!/^[0-9]+$/.test(input.maxHeight)) {
          errors.maxHeight = "Solo puede contener numeros."
        }

        if(!input.minHeight) {
          errors.minHeight = "Altura min requerida."
        } else if(parseInt(input.minHeight) >= parseInt(input.maxHeight)) {
          errors.minHeight = "Debe ser menor al max"
        } else if(!/^[0-9]+$/.test(input.minHeight)) {
          errors.minHeight = "Solo puede contener numeros."
        }else if(parseInt(input.minHeight) <= 0) {
            errors.minHeight = "Debe ser mayor que cero."
          }

        if(!input.maxWeight) {
          errors.maxWeight = "Peso max requerido."
        } else if(parseInt(input.maxWeight) > 90) {
          errors.maxWeight = "Debe ser menor a 90 KG."
        } else if(!/^[0-9]+$/.test(input.maxWeight)) {
          errors.maxWeight = "Solo puede contener numeros."
        }
      
        if(!input.minWeight) {
          errors.minWeight = "Peso min requerido."
        } else if(parseInt(input.minWeight) >= parseInt(input.maxWeight)) {
          errors.minWeight= "Debe ser menor al max."
        }
        if(input.lifeSpan){
          if(parseInt(input.lifeSpan) > 20) {
            errors.lifeSpan = "Debe ser menor a 20 Años."
          } else if(!/^[0-9]+$/.test(input.lifeSpan)) {
            errors.lifeSpan = "Solo puede contener numeros."
          }
        }
        if(!input.temperaments.length) {
            errors.temperaments = "Debe seleccionar almenos un temperamento."
        }
        return errors;
      }
      
    
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name:"",
        minHeight: "",
        maxHeight: "",
        minWeight:"",
        maxWeight:"",
        lifeSpan:"",
        temperaments:[],
        image:"" || defaultdog
    })
    
    useEffect(()=> {
      dispatch(getDogTemperaments())
    }, [dispatch])
    useEffect(()=>{
        setErrors(validation(input))
    },[input])

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(createDog(input))
    }
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    function handleSelect(e){
        setInput({
          ...input,
          temperaments: [...input.temperaments, e.target.value]
        })
    }
    function handleDelete(temp) {
        setInput({
            ...input,
            temperaments:[...input.temperaments.filter(e => e !== temp)]
        })
    }



    return (
       <div className="formCont">
            <div className="logoHome">
              <Link to="/">
                  <img id="imgHome" src={logo}></img> 
              </Link>
              <div className="btnDetailDiv">
                  <Link to="/home">
                      <button className="btnHome" id="detailButton" >Back</button> 
                  </Link>
              </div>
            </div>
            <h1 className="formTitle"> Crear Raza</h1>
            <form className="form" onSubmit={handleSubmit} >
                <div className="firstDivDetail">
                  <div className="divDetail">
                      <label className="labels" >Nombre:</label>
                      <div className="divInput">
                        <input type="text" name="name" value={input.name} onChange={handleChange}/>
                        {errors.name && (<span className='dato_incorrecto'>{errors.name}</span>)}
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Altura máxima:</label>
                      <div className="divInput">
                        <input type="text" name="maxHeight" value={input.maxHeight} onChange={handleChange}/>
                        {errors.maxHeight && (<span className='dato_incorrecto'>{errors.maxHeight}</span>)}
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Altura mínima:</label>
                      <div className="divInput">
                        <input type="text" name="minHeight" value={input.minHeight} onChange={handleChange}/>
                        {errors.minHeight && (<span className='dato_incorrecto'>{errors.minHeight}</span>)}
                      </div>
                  </div>
                </div>

                <div className="secondDivDetail">
                  <div className="divDetail">
                      <label className="labels">Peso máximo:</label>
                      <div className="divInput">
                        <input type="text" name="maxWeight" value={input.maxWeight} onChange={handleChange}/>
                        {errors.maxWeight && (<span className='dato_incorrecto'>{errors.maxWeight}</span>)}
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Peso mínimo:</label>
                      <div className="divInput"> 
                        <input type="text" name="minWeight" value={input.minWeight} onChange={handleChange}/>
                        {errors.minWeight && (<span className='dato_incorrecto'>{errors.minWeight}</span>)}
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Esperanza de vida:</label>
                      <div className="divInput">
                        <input type="text" name="lifeSpan" value={input.lifeSpan} onChange={handleChange}/>
                        {errors.lifeSpan && (<span className='dato_incorrecto'>{errors.lifeSpan}</span>)}
                      </div>
                  </div>
                </div>

                <div className="thirdDivDetail">
                  <div className="divDetail">
                      <label className="labels">URL de la imagen:</label>
                      <div className="divInput">
                        <input type="text" name="image" value={input.image} onChange={handleChange}/>
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Temperamentos:</label>
                      <div className="divInput">
                        <select onChange={handleSelect} name="temperaments">
                            <option disabled selected defaultValue>Temperaments</option>
                            {
                              temperamentsState?.map(temp => (
                                  <option value={temp.name} key={temp.id} >{temp.name}</option>
                              ))
                            }
                        </select>
                        {errors.temperaments && (<span className="dato_incorrecto">{errors.temperaments}</span>)}
                      </div>
                  </div>
                        
                  <div className="divDetail">
                      <label className="labels" >Borrar Temperamentos:</label>
                      <div className="divInput" id="deleteTemp">
                          {
                            input.temperaments?.map(temp=> (
                                <button className="btnDelete" type="button" value={temp} key={temp} onClick={() => handleDelete(temp)}>{temp}</button>
                            ))
                          }
                      </div>
                  </div>
                </div>
                <input className={errors.name || errors.minHeight || errors.maxHeight || errors.minWeight || errors.maxWeight || errors.temperaments ? "submit none" : "submit"} type="submit" value="Create"/>
            </form>
       </div>
    )
}

export default Form