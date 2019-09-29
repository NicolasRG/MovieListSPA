import React from 'react';
import Axios from 'axios';
import '../stylesheets/listController.css';
import MovieCard from './MovieCard.js';
import AddMovieButton from './AddMovieButton.js';
import Modal from  'react-modal';


const backend = "http://localhost";//Need to find a home for this app :(


class ListController extends React.Component{
    constructor(props){
        super(props);

        this.state = {movies: [], //list of movies in the list
                      insertModal : false, //modal controller
                    }

        this.getOptions = {//options for get operation
            method: 'get',
            url: backend+"/getListofAllMovies",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    
    }

    componentDidMount(){
        //hmm ??
        Modal.setAppElement('body');
        //Reques to get list of Movies
        Axios(this.getOptions).then(res =>{ 
            const data = res.data;
            console.log(data);
            this.setState({movies : data});
        });

    }

    openModal() {
        this.setState({insertModal : true});
      }
    
    closeModal() {
        this.setState({ insertModal: false});
      }



    render(){
        const items = this.state.movies.map((d , i)=>{
            return <MovieCard name = {d.name} key = {"MovieCard"+i}/>
        });

        return ( <div className = "ListController">
                    <Modal
                        isOpen={this.state.insertModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.closeModal}
                        shouldCloseOnOverlayClick={true}
                    >
                        <button
                            onClick = {this.closeModal}
                            > 
                            Close modal
                        </button>
                    </Modal>

                    <div>
                        {items}
                    </div>   
                    
                    <AddMovieButton onClick = {(e)=> this.openModal}/>
                </div>);
    }
}

export default ListController;
