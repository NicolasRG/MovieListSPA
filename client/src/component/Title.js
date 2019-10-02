import React from "react";
import '../stylesheets/Title.css';
import Cookies from 'universal-cookie';

function Title(){
    
 
    function onChange(e) {
        const name = document.getElementById("id");
        alert("SET name to "+name.value);
        const cookies = new Cookies();

        cookies.set('name', name.value, { path: '/', sameSite : true});
        console.log(cookies.get('name'));
        //update cookie in the server aswell
        
    }




    return( <div className = "Title">
            <p> Movie List </p>
                First name: <input type="text" name="fname" id= {"id"}/><br />
                        <button onClick = {onChange} > Submit </button>
        </div>
    )
};

export default Title;