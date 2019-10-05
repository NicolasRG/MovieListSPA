import React from 'react';
import '../stylesheets/CloseModalButton.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/**
 * Renders the title of the modal and a close button for it
 */
function ModalHeader(props){

    return ( <div class="container">
                <div className ="row">
                    <button onClick = {props.closeModal} className = "closeButton col order-last" >                     
                        <FontAwesomeIcon icon={"times"} />
                    </button>
                    <div className = "col CloseModalTitle">
                        Add a Movie 
                    </div>
                </div> 
            </div> );
}

export default ModalHeader