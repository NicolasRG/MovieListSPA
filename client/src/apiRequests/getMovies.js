import Axios from "axios"
import Cookies from 'universal-cookie';

Axios.defaults.withCredentials = true;
/**
 * Creates a GET request to update movie list 
 * @param {String} name 
 * @param {React.Component} context 
 * @param {String} backend 
 */
const getMovies = (name, context, backend) => {

    const getOptions = {//options for get operation
        method: 'get',
        url: backend+"/getListofAllMovies",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },

    };


    Axios(getOptions).then(res =>{ 
        const data = res.data;
        //Assign emails
        const cookies = new Cookies();
        const email  = cookies.get("useremail");

        context.setState({movies : data,  creator :email});
    });
}

export default getMovies;