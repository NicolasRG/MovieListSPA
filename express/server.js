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
//const sseUpdateSettup = require('./routes/sseUpdate.js'); No keep alive headers allowed in App Engine

//middleware imports
const cookieLogger = require('./auth/cookieLogger.js');
//const sseUpdate = require('./middleware/sse');             ^ :(



//global server constants
const app = express();
const PORT = process.env.PORT || 80;
const authConfig = require('../cred/config.json');

//setup CORS
const whitelist = ['http://localhost:3000', 
'http://localhost','https://localhost:3000',
'https://localhost' ,'https://moielist.appspot.com',
'https://acounts.google.com/'];



const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS' + origin));
    }
  },
  credentials : true,

}

//connect to mongoose
mongoose.connect('mongodb+srv://'
+authConfig.MongoDB.username+':'
+authConfig.MongoDB.password 
+'@moviecluster1-duno3.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
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
app.use(cookieLogger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//routes
app.use('/mongoDBtest', cors(corsOptions),mongoDBtest);
app.use('/getListofAllMovies', cors(corsOptions),getListofAllMovies);
app.use('/postMovie', cors(corsOptions),postMovie);
app.use('/putsMovie', cors(corsOptions),putsMovie);
app.use('/deleteMovie', cors(corsOptions),deleteMovie);
app.use(express.static(path.join(__dirname, '../client/build')));

// sends static react files
app.get('/*', cors(corsOptions), async function(req,res){
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });




//start server
app.listen(PORT);
console.log('listening on port : ' + PORT);
