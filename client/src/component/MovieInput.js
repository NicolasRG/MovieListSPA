import React from "react";
import "../stylesheets/MovieInput.css";

function MovieInput(props){
    return <div className = "MovieInput">
                
                <label> Name of the movie</label>
                <input type = "text" className = {"movieNameInput"} 
                minLength = {1} maxLength ={256}></input>
                
                <label> External Link</label>
                <input type = "text" className = {"movieNameInput"}
                maxLength = {512}></input>
                
                <br />
                
                <button>
                        Submit
                </button>

                <button onClick = {props.closeModal}> 
                        Close modal
                </button>
        </div>
}

export default MovieInput;
