import axios from "axios"
import {
    GET_ALL_DOGS,
    GET_DOG_DETAIL,
    GET_DOGS_BY_NAME,
    GET_DOG_TEMPERAMENTS,
    RESET_DETAIL,
    FILTER_BY_TEMPERAMENT,
    ERROR,
    FILTER_BY_CREATED,
    ORDERED_DOGS,
    CREATE_DOG
} from "./actionTypes"



export const getAllDogs = ()=> {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/dogs")
            dispatch({
                type: GET_ALL_DOGS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    }
}


export const getDogDetail = (id) => {
    return async function (dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`)
            dispatch({
                type: GET_DOG_DETAIL,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    }
}

export const getDogByName = (name) => {
    return async function (dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: {message: "Perro no encontrado"}
            })
        }
    }
}

export const getDogTemperaments = () => {
    return async function (dispatch){
        try {
            const response = await axios.get("http://localhost:3001/temperaments")
            dispatch({
                type: GET_DOG_TEMPERAMENTS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    }
}

export const createDog = (payload) => {
    return async function (dispatch){
        try {
            const response = await axios.post("http://localhost:3001/dogs", payload)
            alert(response.data)
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
    }
}


export const resetDetail = () => {
    return async function(dispatch) {
        return dispatch({
            type: RESET_DETAIL,
            payload: "Hola corrector!"
        })
        
    }
}



//filtros y ordenamientos

export const filterByTemperament = (payload) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export const filterByCreated = (payload) => {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}


export const orderedDogs = (payload) => {
    return {
        type: ORDERED_DOGS,
        payload
    }
}


