import React from "react";
import '../stylesheets/MovieCard.css';

function MovieCard(props){

    return <div className = "MovieCard">
            {props.name}
        </div> 
}

export default MovieCard