const app = require('express');
const router = app.Router();
const mongoose = require("mongoose");
const Movie = require("../schemas/Movie.js");
/**
 * Route get list of movies
 */
router.get('/' , function(req, res){
   try{
        Movie.find().then(function(e){
            console.log(typeof e);
            res.send(e);
        });
   }catch(e){
        res.status(404);
        res.send();
   }
});

module.exports = router;