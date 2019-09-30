import React from "react";
import "../stylesheets/MovieInput.css";

import CloseModalButton from './CloseModalButton.js';

class MovieInput extends React.Component{

        constructor(props) {
                super(props);
                this.state = {name: "",
                              url : "",
                              creator : ""};
            
                this.onChangeName = this.onChangeName.bind(this);
                this.onChangeURL = this.onChangeURL.bind(this);
                this.onChangeCreator = this.onChangeCreator.bind(this);
                this.submitMovie = this.submitMovie.bind(this);
        }

        submitMovie(event){
                console.log(this.state);
                //submit post for movie
                if(this.state.name.trim() ==="" || this.state.creator.trim() ===""){
                        alert("Must have name and creator id");
                        return;
                }

                this.props.onSubmitMovie({name : this.state.name,
                        url : this.state.url,
                        creator : this.state.creator,
                });

                this.props.onTempAdd(this.state);

        }

        onChangeName(event){
                this.setState({name : event.target.value});
        }

        onChangeURL(event){
                this.setState({url : event.target.value});
        }

        onChangeCreator(event){
                this.setState({creator : event.target.value});
        }



        render(){
                return <div className = "MovieInput">
                <CloseModalButton closeModal = {this.props.closeModal}/>
                <form onSubmit = {(e)=>{e.preventDefault();}}>

                        <div class="form-group">
                                <label htmlFor="inputName">Name of Movie</label>
                                <input type="text" className="form-control" id="inputName" 
                                minLength = {1} maxLength ={128} onChange = {this.onChangeName}
                                value = {this.state.name} 
                                placeholder="Enter name of movie" />
                        </div>



                        <div class="form-group">
                                <label htmlFor="inputURL"> External Link</label>
                                <input type = "url" className = {"form-control"} id = "inputURL"
                                maxLength = {256} onChange = {this.onChangeURL} 
                                value = {this.state.url} placeholder="Optional URL to IMBD/Review"/>
                        </div>
                        
                        <div class="form-group">
                                <label htmlFor={"inputCreator"}> Your Initials(Will be updated in the future)</label>
                                <input type = "text" className = {"form-control"} id = "inputCreator"
                                minLength = {1} maxLength = {5} onChange = {this.onChangeCreator}
                                value = {this.state.creator} placeholder = "Ex. NRG"/>
                        </div>
                        
                        <br />
                        
                      

                        
        {/*Update this to look better later */}
                        <button onClick ={this.submitMovie} class="btn btn-primary"> 
                                Submit
                        </button>
                </form>
        </div>
        }
}


export default MovieInput;
