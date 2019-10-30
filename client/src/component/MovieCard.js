import React, { useState } from "react";
import '../stylesheets/MovieCard.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/**
 * Renders out movie information along with buttons for actions
 * @param {*} props 
 */
function MovieCard(props){
    //decides if movie is a temporary one or not
    
    const [selected, setSelected] = useState(false);


    // checks to see if temp class needs to be applied
    let style = "";
    if (props.temp){
        style = " Temp";
    }

    const getClassName = () =>{
        if(selected) return 180
        else return 0
    }

    return <div className = {"MovieCard"+style + " Container"} >
                <div className = "row " style = {{margin: 0, height : "50px"}}>
                      
                <div className ={"MovieCardName col "}>
                        <a href ={props.url}>  {props.name} </a></div>
                        
                    <button className ={"MovieCardIcon col order-last"}
                        data-toggle="collapse" data-target= {"#MovieCardInfo"+props._id}
                        aria-expanded="false" aria-controls={"MovieCardInfo"+props._id} 
                        onClick = {()=>{setSelected(!selected)}} 
                        >
                            
                            <FontAwesomeIcon icon = "question-circle" 
                            rotation ={getClassName()}/>
                    
                    </button>
                  
                
                </div>
                <div className="MovieCardInfo row collapse" style = {{margin: 0}} id= {"MovieCardInfo"+props._id}> 
                    
                    <div className = {"MovieCardCreator col order-first"}> 
                          <FontAwesomeIcon icon = "user-edit" onClick = {(e)=>props.onOpenEditModal({name : props.name, creator : props.creator, url : props.url, _id: props._id})}/>  
                          &nbsp;  {"Suggested by : "+props.creator}
                    </div>
                    <div className = {"MovieCardDelete col order-last"}>

                        <button onClick = { (e)=>props.onDelete({name : props.name, creator : props.creator, url : props.url}) }>
                            <FontAwesomeIcon icon = {"times"} />
                        </button>
                    
                    </div>
                </div>
        </div> 
}

export default MovieCard