import Axios from "axios"
Axios.defaults.withCredentials = true;
/**
 * Creates a POST request to add new moive to the list
 * @param {String} movie 
 * @param {React.Component} context 
 * @param {String} backend 
 */
const putsMovie = ( movie, context, backend) => {

    const postOptions = {//options for post operation
        method: 'put',
        url: backend+"/putsMovie",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data :{
            _id: movie._id,
            name : movie.name,
            url : movie.url,
            creator : movie.creator,
        },
    };

    console.log(movie);
    Axios(postOptions).then(res =>{ 
        const data = res.data;
        if(data.errors){ throw Error}//error checks
            context.onSuccesfullEdit();

    }).catch(e =>{
        console.error(e)  
    });
}

export default putsMovie;