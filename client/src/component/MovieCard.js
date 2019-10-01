import React from "react";
import '../stylesheets/MovieCard.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function MovieCard(props){
    let style = "";
    if (props.temp){
        style = " Temp";
    }

    return <div className = {"MovieCard"+style + " Container"} >
                <div className = "row" style = {{margin: 0}}>
                    
                    <button className ={"MovieCardIcon col order-last"}
                        data-toggle="collapse" data-target= {"#MovieCardInfo"+props._id}
                        aria-expanded="false" aria-controls={"MovieCardInfo"+props._id} >
                            
                            <FontAwesomeIcon icon = "question-circle" />
                    
                    </button>
                    
                    <div className ={"MovieCardName col "}>  {props.name} </div>
                
                </div>
                <div className="MovieCardInfo row collapse" style = {{margin: 0}} id= {"MovieCardInfo"+props._id}> 
                    <div className = {"MovieCardURL col order-first"} >
                        {" Link :"+props.url}
                    </div>
                    <div className = {"MovieCardCreator col"}> 
                            {"Suggested by : "+props.creator}
                    </div>
                    <div className = {"MovieCardDelete col order-last"}>

                        <div onClick = { (e)=>props.onDelete({name : props.name, creator : props.creator, url : props.url}) }>
                            <FontAwesomeIcon icon = {"times"} size = "xs"/>
                        </div>
                    
                    </div>
                </div>
        </div> 
}

export default MovieCard