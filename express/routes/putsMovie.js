const app = require('express');
const router = app.Router();
const mongoose = require('mongoose');
const Movie = require('../schemas/Movie.js');
const options = {
    new: true,                       // return updated doc
    runValidators: true,              // validate before update
  };

/**
 * Updates name of movie
 */
router.put('/', function(req, res){

    Movie.findOneAndUpdate(
        {
           _id : req.body._id+"", 
        }, 
            {$set : {name : req.body.name+"", url: req.body.url+"" , creator:req.body.creator+"" }
        },
         options)
    .then(function(doc){
        
        console.log(doc, "update");
        res.send(doc);
    
    }).catch(e =>{
       
        console.log(e, "error");
        res.send(false);
    
    });
});

module.exports = router;
