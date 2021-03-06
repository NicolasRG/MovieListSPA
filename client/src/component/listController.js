import React from 'react';
import Modal from  'react-modal';

import '../stylesheets/listController.css';
import '../stylesheets/Modal.css';

import MovieCard from './MovieCard.js';
import MovieInput from './MovieInput.js';
import Title  from './Title.js';

//requests
import getMovies from '../apiRequests/getMovies.js';
import postMovie from '../apiRequests/postMovie.js';
import deleteMovie from '../apiRequests/deleteMovie.js';
import putsMovie from '../apiRequests/putsMovie.js';
//SSE Request
//import setupSSeGet from  '../apiRequests/sses.js'; Google App Engine doesn't support Keep - alive headers :////////////////////////////


const backend = "https://moielist.appspot.com/";//Production server
//const backend = "http://localhost"


/**
 * Control crud operations and connects them to UI
 */
class ListController extends React.Component{
    constructor(props){
        super(props);

        this.state = {movies: [], //list of movies in the list
                      insertModal : false, //modal controller
                      creator : "",
                      edit : null,  
                    }
        
        this.getInterval = null;  //interval to update movie list          
    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmitMovie = this.onSubmitMovie.bind(this);
        this.onTempAdd = this.onTempAdd.bind(this);
        this.onSuccesfullEdit = this.onSuccesfullEdit.bind(this);
        this.onTempDeleteMovie = this.onTempDeleteMovie.bind(this);
        this.onTempEdit = this.onTempEdit.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        
    }

    componentDidMount(){
        Modal.setAppElement('body');
       
        getMovies("name", this, backend);  //Request to get list of Movies
        
        this.getInterval = setInterval( ()=>{ //create interval to retrieve movies 
            console.log("trying to update")
            getMovies("name", this, backend)}, 5000);
    }

    componentWillUnmount(){
        clearInterval(this.getInterval); 
    }

    openModal() {
        this.setState({insertModal : true,});
      }

    openEditModal(movie){
        this.setState({insertModal : true,
                        edit: movie});
    }
    
    closeModal() {
        this.setState({ insertModal: false,
                        edit : null});
      }

    onSubmitMovie(movie){
        if(this.state.edit !== null){
            console.log("Update existing movie");
            putsMovie(movie, this, backend);
        }
        else {postMovie( movie , this, backend);}
        this.closeModal();
    }
    
    /**
     * Adds a movie to the list but with a different style
     * @param {Object} movie 
     */
    onTempAdd(movie){
        movie.temp = true;
        let  movies = this.state.movies.slice();
        movies.push(movie)
        this.setState({movies : movies});
    }

    onTempEdit(){
        console.log();
    }
    
    /**
     * Makes sure that users wants to delete movie and then create request
     * @param {Object} movie 
     */
    onTempDeleteMovie(movie){
        //Verify that user wants to delete movie
        if(! window.confirm("Confirm that you want to delete :"+ movie.name)){
            return;
        }

        deleteMovie(movie, this, backend);
        
        //update the list of movies
        movie.temp = true;
        const movies = this.state.movies.slice().filter(mov => mov.name !== movie.name);
        movies.push(movie);
        this.setState({
            movies : movies,
        });
    }

    onSuccesfullEdit(){
        console.log("successfully edited movie list");
    }


    render(){
        const items = this.state.movies.map((d , i)=>{
            return <MovieCard name = {d.name} 
                    url = {d.url}
                    _id = {d._id}
                    creator = {d.creator}
                    onDelete = {this.onTempDeleteMovie}
                    onOpenEditModal= {this.openEditModal}
                    key = {"MovieCard"+i} temp= {d.temp}/>
        });

        return ( <div className = "ListController">
                    <Title onClick =  {(e)=> this.openModal}/>
                    <Modal
                        isOpen={this.state.insertModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.closeModal}
                        shouldCloseOnOverlayClick={true}
                        overlayClassName = {"modal-overlay"}
                        className = {"modal-content"}
                    >
                        
                        <MovieInput closeModal ={this.closeModal}
                        onSubmitMovie = {this.onSubmitMovie}
                        onTempAdd = {this.onTempAdd}
                        creator = {this.state.creator}
                        edit = {this.state.edit}
                        />
                        
                    </Modal>

                    <div className = "ListMovies"> 
                        {items}
                    </div>   
                </div>);
    }
}

export default ListController;
