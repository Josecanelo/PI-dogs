import React from "react"
import { Link } from "react-router-dom"
import "./Card.css"

const Card = ({dog})=> {

    let id = dog.id

    return (
        
            <div className="dogCards">
                <Link className="dogCard" to={`/dogs/${id}`}>
                    <div className="cardDiv">
                        <img src={dog.image} alt=""/>
                    </div>
                    <div className="nameCont">
                        <h3>{dog.name}</h3>
                    </div>
                    <div className="weightCont">
                        <h5>
                            Max. weight: {dog.maxWeight} 
                            <br/>
                            Min. weight: {dog.minWeight}
                        </h5>
                    </div>
                       <h5 className="tempCont">
                           {dog.temperament ? `Temperaments: ${dog.temperament}.` : "No temperaments found."}
                       </h5>
                </Link>
             </div>
        
    )
}

export default Card