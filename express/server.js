// module imports 
const express = require("express");
const mongoose  = require("mongoose");



//global server constants

const app = express();
const PORT = 80;

mongoose.connect('mongodb://node:92219@nicoprojects.com/test', {useNewUrlParser: true});
const db = mongoose.connection;
const movie = db.movie;

db.on('error', function(){
    console.log("wers")
});
db.once('open', function() {
  // we're connected!
  console.log("Mongod Connected");
});

//logging
app.use(function(req, res, next){
    console.log(req.ip , req.path);
    next();
});

//routes
app.get('/', function(req,res){
    res.send("Hello World");
});

app.get('/mongoDBtest', function(req, res){
    try{
        console.log(db);
    }catch(e){
        console.log(e, "we died");
    }
    res.send(true+"");
});

//start server
app.listen(PORT);
console.log('listening on port : ' + PORT);
