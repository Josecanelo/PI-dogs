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
          errors.name = "You have to give a name."
        } else if(!/^[A-Za-z ]+$/i.test(input.name)) {
          errors.name = "It can only contain letters."
        } else if(parseInt(input.name.length) >= 25) {
          errors.name= "Should have less than 25 characters."
        } else if (dogs.find(e => e.name === input.name)) {
            errors.name = "The breed already exists."
        }

        if(!input.maxHeight) {
          errors.maxHeight = "Max. height required."
        } else if(parseInt(input.maxHeight) > 85) {
          errors.maxHeight = "It should be smaller than 85cm." 
        } else if(!/^[0-9]+$/.test(input.maxHeight)) {
          errors.maxHeight = "It can only contain numbers."
        }

        if(!input.minHeight) {
          errors.minHeight = "Min. height required."
        } else if(parseInt(input.minHeight) >= parseInt(input.maxHeight)) {
          errors.minHeight = "It should be lower than max. height."
        } else if(!/^[0-9]+$/.test(input.minHeight)) {
          errors.minHeight = "It can only contain numbers."
        }else if(parseInt(input.minHeight) <= 0) {
            errors.minHeight = "It should be higher than 0."
          }

        if(!input.maxWeight) {
          errors.maxWeight = "Max. weight required."
        } else if(parseInt(input.maxWeight) > 90) {
          errors.maxWeight = "It should be lightier than 90KG."
        } else if(!/^[0-9]+$/.test(input.maxWeight)) {
          errors.maxWeight = "It can only contain numbers."
        }
      
        if(!input.minWeight) {
          errors.minWeight = "Min. weight required."
        } else if(parseInt(input.minWeight) >= parseInt(input.maxWeight)) {
          errors.minWeight= "It should be lower than max. weight."
        }
        if(input.lifeSpan){
          if(parseInt(input.lifeSpan) > 20) {
            errors.lifeSpan = "It can be no more than 20 years."
          } else if(!/^[0-9]+$/.test(input.lifeSpan)) {
            errors.lifeSpan = "It can only contain numbers."
          }
        }
        if(!input.temperaments.length) {
            errors.temperaments = "It should have at least 1 temperament."
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
            <h1 className="formTitle">Create breed</h1>
            <form className="form" onSubmit={handleSubmit} >
                <div className="firstDivDetail">
                  <div className="divDetail">
                      <label className="labels" >Name:</label>
                      <div className="divInput">
                        <input type="text" name="name" value={input.name} onChange={handleChange}/>
                        {errors.name && (<span className='dato_incorrecto'>{errors.name}</span>)}
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Max. height:</label>
                      <div className="divInput">
                        <input type="text" name="maxHeight" value={input.maxHeight} onChange={handleChange}/>
                        {errors.maxHeight && (<span className='dato_incorrecto'>{errors.maxHeight}</span>)}
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Min. height:</label>
                      <div className="divInput">
                        <input type="text" name="minHeight" value={input.minHeight} onChange={handleChange}/>
                        {errors.minHeight && (<span className='dato_incorrecto'>{errors.minHeight}</span>)}
                      </div>
                  </div>
                </div>

                <div className="secondDivDetail">
                  <div className="divDetail">
                      <label className="labels">Max. weight</label>
                      <div className="divInput">
                        <input type="text" name="maxWeight" value={input.maxWeight} onChange={handleChange}/>
                        {errors.maxWeight && (<span className='dato_incorrecto'>{errors.maxWeight}</span>)}
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Min. weight:</label>
                      <div className="divInput"> 
                        <input type="text" name="minWeight" value={input.minWeight} onChange={handleChange}/>
                        {errors.minWeight && (<span className='dato_incorrecto'>{errors.minWeight}</span>)}
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Life span:</label>
                      <div className="divInput">
                        <input type="text" name="lifeSpan" value={input.lifeSpan} onChange={handleChange}/>
                        {errors.lifeSpan && (<span className='dato_incorrecto'>{errors.lifeSpan}</span>)}
                      </div>
                  </div>
                </div>

                <div className="thirdDivDetail">
                  <div className="divDetail">
                      <label className="labels">Image URL:</label>
                      <div className="divInput">
                        <input type="text" name="image" value={input.image} onChange={handleChange}/>
                      </div>
                  </div>

                  <div className="divDetail">
                      <label className="labels" >Temperaments:</label>
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
                      <label className="labels" >Delete temperaments:</label>
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