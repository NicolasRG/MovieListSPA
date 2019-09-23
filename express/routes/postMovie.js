const app = require("express");
const router = app.Router();
const mongoose = require("mongoose");
const Movie = require('../schemas/Movie.js');

router.post('/', function(req, res){
    
    const movie = new Movie({name : req.body.name});

    movie.save().then(function(doc){
        
        console.log(doc, "post");
        res.send("true");

    }).catch(function(e){
        
        console.log(e);
        res.send(e);
    });

});

module.exports = router;