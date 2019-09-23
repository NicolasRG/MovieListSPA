const app = require('express');
const router = app.Router();
const mongoose = require('mongoose');
const Movie = require('../schemas/Movie.js');
const options = {
    new: true,                       // return updated doc
    runValidators: true,              // validate before update
  };


router.put('/', function(req, res){

    Movie.findOneAndUpdate(
        {
           name : req.body.oldName+"", 
        }, 
            {$set : {name : req.body.newName+""}
        },
         options)
    .then(function(doc){
        
        console.log(doc, "update");
        res.send(true);
    
    }).catch(e =>{
       
        console.log(e, "error");
        res.send(false);
    
    });
});

module.exports = router;
