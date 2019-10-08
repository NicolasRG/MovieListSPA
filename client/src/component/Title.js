import React from "react";
import '../stylesheets/Title.css';
import AddMovieButton from './AddMovieButton.js';
/**
 * Title of App
 */
function Title(props){
    
    return( <div className = "Title">
            <p style={{"display" : "inline-block"}}> Movie List </p>
            <AddMovieButton onClick = {props.onClick}/>
        </div>
    )
};

export default Title;