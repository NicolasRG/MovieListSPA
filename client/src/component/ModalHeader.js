import React from 'react';
import '../stylesheets/CloseModalButton.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/**
 * Renders the title of the modal and a close button for it
 */
function ModalHeader(props){

    return ( <div className ="container" style={{margin : "0px", padding : "0px",position : "absolute", maxWidth : "100%", width : "100%"}} >
                <div className ="row" >
                <div className = "col CloseModalTitle">
                        Add a Movie 
                    </div>
                    <button onClick = {props.closeModal} className = "closeButton col order-last" >                     
                        <FontAwesomeIcon icon={"times"} />
                    </button>
                </div> 
            </div> );
}

export default ModalHeader