import React from "react";
import '../stylesheets/MovieCard.css';

function MovieCard(props){
    let style = "";
    if (props.temp){
        style = "Temp";
    }

    return <div className = {"MovieCard"+style} >
            {props.name}
        </div> 
}

export default MovieCard