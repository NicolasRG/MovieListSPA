import React from "react";
import '../stylesheets/Title.css';
import { useCookies } from 'react-cookie';

function Title(){
    const [cookies, setCookie] = useCookies(['name']);
    
    
 
    function onChange(e) {
        alert("asdf")
        const name = document.getElementById("id");
        console.log(name.value);
        setCookie('name', name.value, { path: '/' })
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