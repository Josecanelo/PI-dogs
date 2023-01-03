import React from "react";
import "./Paginate.css"

export default function Paginate({dogsPerPage,dogs,paginado,currentPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    const handleArrows = (e) => {
        e.preventDefault()
        e.target.value === "Prev" && currentPage !== 1 && paginado(currentPage-1)
        e.target.value === "Next" && currentPage !== Math.ceil(dogs/dogsPerPage) && paginado(currentPage+1)
    }


    return (
        <nav>
            <ul className="paginate">
                <button className="btnPaginate" value="Prev" onClick={handleArrows} >⮜</button>
                {
                    pageNumbers && pageNumbers.map(num => (
                    <button className={num === currentPage ? "current" : "btnPaginate"} onClick={()=> paginado(num)} key={num}>{num}</button>
                    ))
                }
                <button className="btnPaginate" value="Next" onClick={handleArrows}>⮞</button>
            </ul>
        </nav>
    )

}