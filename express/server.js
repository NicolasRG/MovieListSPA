// module imports 
const express = require("express");
const mongoose  = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");

//route imports 
const mongoDBtest = require("./routes/mongoDBtest.js");
const getListofAllMovies = require('./routes/getListofAllMovies.js');
const postMovie = require('./routes/postMovie.js');
const putsMovie =  require('./routes/putsMovie.js');
const deleteMovie = require('./routes/deleteMovie.js');

//schema imports
const Movie = require("./schemas/Movie.js");


//global server constants

const app = express();
const PORT = 80;

//connect to mongoose
mongoose.connect('mongodb+srv://node:9302019@moviecluster1-duno3.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', function(){
    console.log("Error");
    db.close();
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

//middleware
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


//routes
app.use('/mongoDBtest', mongoDBtest);
app.use('/getListofAllMovies', getListofAllMovies);
app.use('/postMovie', postMovie);
app.use('/putsMovie', putsMovie);
app.use('/deleteMovie', deleteMovie);
app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


//start server
app.listen(PORT);
console.log('listening on port : ' + PORT);
