import {
    GET_ALL_DOGS,
    GET_DOG_DETAIL,
    GET_DOGS_BY_NAME,
    GET_DOG_TEMPERAMENTS,
    CREATE_DOG,
    RESET_DETAIL,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_CREATED,
    ERROR,
    ORDERED_DOGS,
} from "./actions/actionTypes";


let initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail:[],
    created:[],

    error: {}
}

export default function rootReducer(state=initialState, action) {

    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            };
        case GET_DOG_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            };
        case GET_DOG_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case RESET_DETAIL:
            return {
              ...state,
              detail: [],
            };           
        case FILTER_BY_CREATED:
            let dogsCreated = state.allDogs
            let filteredByCreated = action.payload === "Created" ? dogsCreated.filter(e => e.createdInDb) : dogsCreated.filter(e => !e.createdInDb)
            return {
                ...state,
                dogs: action.payload === "All" ? dogsCreated : filteredByCreated
            };
        case FILTER_BY_TEMPERAMENT:
            let dogsTemperament = state.allDogs
            if (action.payload !== "All") {
                dogsTemperament = dogsTemperament.filter((e) => e.temperament.includes(action.payload))
            } 
            return {
                ...state,
                dogs: dogsTemperament
            };
        case ORDERED_DOGS:
            let unorderedDogs = state.allDogs
            if (action.payload === "A-Z") {
                let orderedAZ = unorderedDogs.sort((a,b) => {
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                })
                return {
                    ...state,
                    dogs:orderedAZ
                }
            }
            if (action.payload === "Z-A") {
                let orderedZA = unorderedDogs.sort((a,b) => {
                    if(a.name > b.name) return -1
                    if(a.name < b.name) return 1
                    return 0
                })
                return {
                    ...state,
                    dogs:orderedZA
                }
            }
            
            if (action.payload === "Heavier") { 
                let heavierOrdered = unorderedDogs.sort(function(dogA,dogB) {
                    if (parseInt(dogA.maxWeight) > parseInt(dogB.maxWeight)) return -1
                    if (parseInt(dogA.maxWeight) < parseInt(dogB.maxWeight)) return 1
                    return 0
                })

                return {
                    ...state,
                    dogs:heavierOrdered
                }
            }
            if (action.payload === "Lightier") {
                let lightierOrdered = unorderedDogs.sort(function(dogA,dogB) {
                    if (parseInt(dogA.minWeight) > parseInt(dogB.minWeight)) return 1
                    if (parseInt(dogA.minWeight) < parseInt(dogB.minWeight)) return -1
                    return 0
                })
                 return {
                    ...state,
                    dogs:lightierOrdered
                }
            }


            return {
                ...state,
                dogs: unorderedDogs
            };
        case ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return {...state}
    }
}
