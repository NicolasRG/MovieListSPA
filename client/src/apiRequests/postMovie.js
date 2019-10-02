import Axios from "axios"
Axios.defaults.withCredentials = true;
const postMovie = ( movie, context, backend) => {

    const postOptions = {//options for get operation
        method: 'post',
        url: backend+"/postMovie",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data :{
            name : movie.name,//{"asdf": ("ASDF")},
            url : movie.url,
            creator : movie.creator,
        },
    };


    Axios(postOptions).then(res =>{ 
        const data = res.data;
        if(data.errors){ throw Error}//error checks

        context.onSuccesfullAdd();
        

    }).catch(e =>{
        console.error(e)  
    });
}

export default postMovie;