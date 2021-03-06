const app = require("express");
const mongoose = require("mongoose");
const Movie = require('../schemas/Movie.js');
const router = app.Router();
/**
 * Small test to make sure that MongoDB is settup correctly
 */
router.get('/', function(req, res){
    try{
        
        Movie.find().then(function(doc){
            res.send(doc !==  null+"");
        });

    }catch(e){
        console.log(e, "we died");
        res.send(false+"");
    }
});

module.exports =  router;