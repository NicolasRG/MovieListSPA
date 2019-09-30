import React from "react";
import "../stylesheets/AddMovieButton.css";

class AddMovieButton extends React.Component{


    render(){
        return <div className = "AddMovieButton" onClick = {this.props.onClick()}> 
                <i className="fa fa-plus icon"></i>
            </div>
    }

}

export default AddMovieButton;