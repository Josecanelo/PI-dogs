import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getDogDetail, resetDetail } from "../../redux/actions/actions"
import loader from "../Images/dog_loader.gif"
import logo from "../Images/logo.png"
import "./Details.css"
const Details = ()=> {
    let dogDetail = useSelector((state) => state.detail)
    let dispatch = useDispatch()
    let {id} = useParams()


    useEffect(() => {
    dispatch(getDogDetail(id))
    return () => {
        dispatch(resetDetail())
    }
    },[dispatch,id])


    if (dogDetail.name) {
        return (
            <div>
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
                <div className="detailContent">
                    <div className="dogDetail">
                        <div className="cardDiv">
                            <img src={dogDetail.image} alt=""/>
                        </div>
                        <div className="nameCont">
                            <h1>{dogDetail.name}</h1>
                        </div>
                        <div>
                            <h3>
                                Min. weight: {dogDetail.minWeight} 
                                <br />
                                Max. weight: {dogDetail.maxWeight}
                            </h3>
                        </div>
                        <div>
                            <h3>
                                Min. height: {dogDetail.minHeight} 
                                <br/>
                                Max. height: {dogDetail.maxHeight}
                            </h3>
                        </div>
                        <h3>
                            Life span: {dogDetail.lifeSpan}
                        </h3>
                        <h3 className="tempCard">
                            {dogDetail.temperament ? `Temperaments: ${dogDetail.temperament}.` : "No temperaments found."}
                        </h3>
                     </div>
                    </div>
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

export default Details