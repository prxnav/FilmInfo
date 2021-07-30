import React from "react";
import search from "./components/FrontPage/search.js";

function searchView({result}){
    return (
    <>
    {result.map((x) => (
        <div classnName="listWrapper">
            <div key={x.id}>
                <span>
                <h3>{x.original_title}</h3>
                <img src={`http://image.tmdb.org/t/p/w500/${x.poster_path}`}></img>
                <p>{x.release_date}</p>
                <p>{x.voter_average}</p>
                <p>{x.overview}</p>
                </span>
            </div>
        </div>
    ))}    
    
    
    </>
)}

export default searchView;