import Axios from 'axios';

const deleteMovie  = (movie, context, backend) =>{
    const deleteOptions = {
        method: 'delete',
        url: backend+"/deleteMovie",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data :{
            name : movie.name,
    }}

    Axios(deleteOptions).then(res =>{ 
        const data = res.data;
        if(data.errors){ throw Error}//error checks
        // succesfully deleted item
    }).catch(e =>{
        console.error(e);
        alert("Error Issued: May have not been deleted");  
    }).finally(()=>{
        context.onSuccesfullAdd(); //not intened for this case but works here too
    });

}

export default deleteMovie;