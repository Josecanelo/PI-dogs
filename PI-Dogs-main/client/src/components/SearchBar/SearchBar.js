import React from "react"
import { useDispatch } from "react-redux"
import { getDogByName } from "../../redux/actions/actions"
import "./SearchBar.css"

export default function Searchbar() {
    const dispatch = useDispatch()
    const handleInputChange = (e) => {
        e.preventDefault()
        dispatch(getDogByName(e.target.value))
    }

    return (
        <div className="divSearchBar" >
            <input className="searchBarInput" type="text" onChange={handleInputChange} placeholder="Search..."></input>
        </div>
    )
}