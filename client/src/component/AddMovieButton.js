import React from "react";
import "../stylesheets/AddMovieButton.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/**
 * Small button to trigger modal to add movies
 */
class AddMovieButton extends React.Component{

    render(){
        return <div className = "AddMovieButton" onClick = {this.props.onClick()}>
                <FontAwesomeIcon icon = {"plus"} className = {"icon"}/>
            </div>
    }

}

export default AddMovieButton;