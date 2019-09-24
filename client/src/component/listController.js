import React from 'react';
import Axios from 'axios';
import '../stylesheets/listController.css';
const backend = "http://localhost";


class ListController extends React.Component{
    constructor(props){
        super(props);

        this.state = {movies: ""}
    
    }

    componentDidMount(){
        const options = {
            method: 'get',
            url: backend+"/getListofAllMovies",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        };
        async function test(){
            let response = await Axios(options);
            let responseOK = response && response.status === 200 && response.statusText === 'OK';
            if (responseOK) {
                let data = await response.data;
                // do something with data
                this.setState({
                    movies : data
                });
            }
        }
        test();

    }


    render(){
        return ( <div className = "ListController">
            {this.state.movies}
        </div>);
    }
}

export default ListController;