import React from 'react';
import Modal from  'react-modal';

import '../stylesheets/listController.css';
import '../stylesheets/Modal.css';

import MovieCard from './MovieCard.js';
import AddMovieButton from './AddMovieButton.js';
import MovieInput from './MovieInput.js';

//requests
import getMovies from '../apiRequests/getMovies.js';
import postMovie from '../apiRequests/postMovie.js';

const backend = "http://192.168.1.4";//Need to find a home for this app :(


class ListController extends React.Component{
    constructor(props){
        super(props);

        this.state = {movies: [], //list of movies in the list
                      insertModal : false, //modal controller
                    }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmitMovie = this.onSubmitMovie.bind(this);
        this.onTempAdd = this.onTempAdd.bind(this);
        this.onSuccesfullAdd = this.onSuccesfullAdd.bind(this);
        
    }

    componentDidMount(){
        //React code to for it to get made i think ??
        Modal.setAppElement('body');
        //Reques to get list of Movies
        getMovies("name", this, backend );

    }

    openModal() {
        this.setState({insertModal : true});
      }
    
    closeModal() {
        this.setState({ insertModal: false});
      }

    onSubmitMovie(movie){
        postMovie( movie , this, backend);
        this.closeModal();
    }

    onTempAdd(movie){
        movie.temp = true;
        let  movies = this.state.movies.slice();
        movies.push(movie)
        this.setState({movies : movies});
    }

    onSuccesfullAdd(){
        getMovies("name", this, backend );
    }



    render(){
        const items = this.state.movies.map((d , i)=>{
            return <MovieCard name = {d.name} key = {"MovieCard"+i} temp= {d.temp}/>
        });

        return ( <div className = "ListController">
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
                        />
                        
                    </Modal>

                    <div>
                        {items}
                    </div>   
                    
                    <AddMovieButton onClick = {(e)=> this.openModal}/>
                </div>);
    }
}

export default ListController;
