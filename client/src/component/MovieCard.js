import React from "react";
import '../stylesheets/MovieCard.css';

function MovieCard(props){
    let style = "";
    if (props.temp){
        style = " Temp";
    }

    return <div className = {"MovieCard"+style + " Container"} >
                <div className = "row" style = {{margin: 0}}>
                    <button className ={"MovieCardIcon col order-last"}> <i className="fa fa-info"></i> </button>
                    <div className ={"MovieCardName col "}>  {props.name} </div>
                </div>
        </div> 
}

export default MovieCard