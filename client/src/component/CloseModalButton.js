import React from 'react';
import '../stylesheets/CloseModalButton.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function CloseModalButton(props){

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

export default CloseModalButton 