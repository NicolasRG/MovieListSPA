import React from "react";
import '../stylesheets/MovieCard.css';

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
                            
                            <i className="fa fa-caret-down"></i>
                    
                    </button>
                    
                    <div className ={"MovieCardName col "}>  {props.name} </div>
                
                </div>
                <div className="row collapse" style = {{margin: 0}} id= {"MovieCardInfo"+props._id}> 
                    <div className = {"MovieCardInfo"} >
                        {props.creator +" "+props.url}
                    </div>
                </div>
        </div> 
}

export default MovieCard