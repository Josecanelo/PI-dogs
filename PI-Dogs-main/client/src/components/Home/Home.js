import React, { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllDogs, getDogTemperaments, filterByCreated, filterByTemperament, orderedDogs } from "../../redux/actions/actions"
import Card from "../Card/Card"
import Paginate from "../Paginate/Paginate"
import SearchBar from "../SearchBar/SearchBar"
import logo from "../Images/logo.png"
import loader from "../Images/dog_loader.gif"
import "./Home.css"

const Home = ()=> {
    const dispatch = useDispatch()
    const dogsState = useSelector(state => state.dogs)
    const temperamentsState = useSelector(state => state.temperaments)
    const error = useSelector(state => state.error)
    
    
    let [orden,setOrden] = useState("")
    const [currentPage,setCurrentPage] = useState(1)
    const dogsPerPage = 8
    const lastIndex = currentPage * dogsPerPage 
    const firstIndex = lastIndex - dogsPerPage
    const currentDogs = dogsState.slice(firstIndex,lastIndex)

    useEffect(()=>{
        dispatch(getAllDogs())
        dispatch(getDogTemperaments())
    },[dispatch])
    

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const handleOrderedDogs = (e) => {
        e.preventDefault()
        dispatch(orderedDogs(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    const handleFilterByCreated = (e) => {
        e.preventDefault()
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1)
    }
    const handleFilterByTemperament = (e) => {
        dispatch(filterByTemperament(e.target.value))
        setCurrentPage(1)
    }



    if (Object.keys(error).length) {
        return (
            <>
                <h3>{error.message}</h3>
                <div> 
                    Volverás al home en 5 segundos.
                    <div id="dispNone">{setInterval("location.reload()",5000)}</div>
                </div>
            </>
        )
    }

    if (currentDogs.length) {
        return (
            <div className="homeCont">
                <header className="header">
                    <div className="logoHome">
                        <Link to="/">
                            <img id="imgHome" src={logo}></img> 
                        </Link>
                    </div>


                   <div className="contenedorDerecha">
                        <SearchBar className="searchBar" error={error}/>
                        <div className="divSelects">
                            <select onChange={handleOrderedDogs}>
                                <option disabled selected defaultValue>Order</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                                <option value="Heavier">Heavier</option>
                                <option value="Lightier">Lightier</option>
                            </select>
                            <select onChange={handleFilterByCreated}>
                                <option disabled selected defaultValue>Dogs from</option>
                                <option value="All">All</option>
                                <option value="Created">DB</option>
                                <option value="Api">API</option>
                            </select>
                            <select onChange={handleFilterByTemperament}>
                                <option disabled selected defaultValue>Temperaments</option>
                                <option value="All">All</option>
                                {
                                  temperamentsState?.map(temp => (
                                      <option value={temp.name} key={temp.id} >{temp.name}</option>
                                  ))
                                }
                            </select>
                        </div>
                        <button className="btnHome"><Link id="linkCreate" to="/dog">Create breed</Link></button>
                    </div>
                </header>            

                <div className="divCardBg">
                    <Paginate dogsPerPage={dogsPerPage} dogs={dogsState.length} paginado={paginado} currentPage={currentPage}/>
                    <div>
                        {currentDogs.map(e => <Card key={e.id} dog={e}/> )}
                    </div>
                    <Paginate dogsPerPage={dogsPerPage} dogs={dogsState.length} paginado={paginado} currentPage={currentPage}/>
                </div>
                <footer className="footer">
                    <h4>Created by: José Canelo</h4>
                </footer>
            </div>
        )
    } else {
        return (
            <div className="loader">
                <img src={loader}></img>
            </div>
        )
    }
}

export default Home