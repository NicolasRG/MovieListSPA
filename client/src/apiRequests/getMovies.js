import Axios from "axios"

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
        console.log(data);
        context.setState({movies : data});
    });
}

export default getMovies;