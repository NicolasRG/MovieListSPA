import React from 'react';
import '../stylesheets/CloseModalButton.css'

function CloseModalButton(props){

    return ( <div class="container">
                <div class="row">
                    <button onClick = {props.closeModal} className = "closeButton col order-last" >                     
                        <i class="fa fa-close"> </i>
                    </button>
                    <div className = "col">

                    </div>
                </div> 
            </div> );
}

export default CloseModalButton 