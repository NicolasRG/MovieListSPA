import React from "react";
import "../stylesheets/MovieInput.css";
import ModalHeader from './ModalHeader.js';
/**
 * Renders Modal that houses the inputs to create a new movie
 */
class MovieInput extends React.Component{
        
        constructor(props) {
                super(props);
                this.state = {name: "",
                              url : "",}; //Fields for movie
            
                this.onChangeName = this.onChangeName.bind(this);
                this.onChangeURL = this.onChangeURL.bind(this);
                this.submitMovie = this.submitMovie.bind(this);
                // eslint-disable-next-line
                this.regExUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
                //regex expression to match against possible urls input by user
        }

        componentDidMount(){
                if(this.props.edit !== null){
                        console.log("in edit mode", this.props.edit);
                        this.setState({
                                name : this.props.edit.name+"",
                                url : this.props.edit.url+"",
                                _id : this.props.edit._id+""
                        });
                }else{
                        console.log("not in edit mode")
                }
        };
        
        /**
         * Click event that error checks and verifies to see information
         * @param {Event} event 
         */
        submitMovie(event){
        
                if(this.state.name.trim() ==="" || this.props.creator.trim() ===""){
                        alert("Must have name and creator id");
                        return;
                }
                if(!this.state.url.match(this.regExUrl) && this.state.url !== ""){
                        alert("Must be a valid URL");
                        return;
                }

                this.props.onSubmitMovie({name : this.state.name,  //submit post for movie
                        url : this.state.url,
                        _id : this.state._id,
                        creator : this.props.creator,
                });

                this.props.onTempAdd(this.state); 
        }

        onChangeName(event){
                this.setState({name : event.target.value});
        }

        onChangeURL(event){
                this.setState({url : event.target.value});
        }

        

        render(){
                return <div className = "MovieInput">
                <ModalHeader closeModal = {this.props.closeModal}/>
                <br />
                <form onSubmit = {(e)=>{e.preventDefault();}} style = {{paddingTop : "10px"}}>

                        <div className="form-group">
                                <label htmlFor="inputName">Name of Movie</label>
                                <input type="text" className="form-control" id="inputName" 
                                minLength = {1} maxLength ={128} onChange = {this.onChangeName}
                                value = {this.state.name} 
                                placeholder="Enter name of movie" />
                        </div>



                        <div className="form-group">
                                <label htmlFor="inputURL"> External Link</label>
                                <input type = "url" className = {"form-control"} id = "inputURL"
                                maxLength = {256} onChange = {this.onChangeURL}
                                pattern= {this.regExUrl} 
                                value = {this.state.url} placeholder="Optional URL to IMBD/Review"/>
                        </div>
                        
                        <div className="form-group" readOnly>
                                <label htmlFor={"inputCreator"}> Your ID </label>
                                <input type = "text" className = {"form-control"} id = "inputCreator"
                                value = {this.props.creator}  readOnly />
                        </div>
                        
                        <br />
                        
                
                        <button onClick ={this.submitMovie} className="btn btn-dark"> 
                                Submit
                        </button>
                </form>
        </div>
        }
}


export default MovieInput;
