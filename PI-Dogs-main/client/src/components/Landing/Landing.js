import React from "react"
import { Link } from "react-router-dom"
import logo from "../Images/logo.png"
import "./Landing.css"
const Landing = ()=> {
    return (
        <div className="body">
            <div className="divLogo">
                <Link to="/"> <img id="imgLanding" src={logo}></img> </Link>        
            </div>
            <div className="landingDiv2">
                <h1 className="">Welcome to my dog app</h1>
                <Link to="/home" >
                    <button className="btn">LET'S GET STARTED</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing