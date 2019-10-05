const app = require('express');
const router = app.Router();
const Mongoose = require("mongoose");
const Movie = require("../schemas/Movie.js");
/**
 * route to delete movie
 */
router.delete('/', function(req, res){
    const title = {name : req.body.name };
    
    Movie.deleteOne(title).then(function(doc){
        
        console.log(doc, "deleted");
        res.send(true);
    
    }).catch(e => {
        
        console.log(e);
        res.send(false);
    
    });
});

module.exports = router;
