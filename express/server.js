// module imports 
const express = require("express");
const mongoose  = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
//const validateAssertion = require("./auth/google-utils");
const got = require('got');
const jwt = require('jsonwebtoken');

//route imports 
const mongoDBtest = require("./routes/mongoDBtest.js");
const getListofAllMovies = require('./routes/getListofAllMovies.js');
const postMovie = require('./routes/postMovie.js');
const putsMovie =  require('./routes/putsMovie.js');
const deleteMovie = require('./routes/deleteMovie.js');

//auth/cookie imports
const testCookieLogger = require('./auth/testCookieLogger.js');

//schema imports
const Movie = require("./schemas/Movie.js");


//global server constants
let certs;
let aud;
const app = express();
const PORT = process.env.PORT || 80;

//settup CORS
var whitelist = ['http://localhost:3000', 'http://localhost','https://localhost:3000','https://localhost' ,'https://moielist.appspot.com']
var corsOptions = {
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
app.use(testCookieLogger);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//Middleawre to set access control headers



//routes
app.use('/mongoDBtest', cors(corsOptions),mongoDBtest);
app.use('/getListofAllMovies', cors(corsOptions),getListofAllMovies);
app.use('/postMovie', cors(corsOptions),postMovie);
app.use('/putsMovie', cors(corsOptions),putsMovie);
app.use('/deleteMovie', cors(corsOptions),deleteMovie);
app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/*', cors(corsOptions), async function(req,res){
  const assertion = req.header('X-Goog-IAP-JWT-Assertion');
  let email = 'None';
  try {
    const info = await validateAssertion(assertion);
    email = info.email;
  } catch (error) {
      console.log(error);
  }
  res
    .status(200)
    .send('Hello' + email)
    .end();
  
    //res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });




//start server
app.listen(PORT);
console.log('listening on port : ' + PORT);


//functions ////
//

async function certificates(){
  if(!certs){
    
    let response = await got('https://www.gstatic.com/iap/verify/public_key');
    certs = JSON.parse(response.body);
  }

  return certs;
}

async function getMetadata(itemName) {
const endpoint = 'http://metadata.google.internal';
const path = '/computeMetadata/v1/project/';
const url = endpoint + path + itemName;

let response = await got(url, {
  headers: {'Metadata-Flavor': 'Google'},
});
return response.body;
}

async function audience() {
if (!aud) {
  let project_number = await getMetadata('numeric-project-id');
  let project_id = await getMetadata('project-id');

  aud = '/projects/' + project_number + '/apps/' + project_id;
}

return aud;
}

async function validateAssertion(assertion) {
if (!assertion) {
  return {};
}
// Decode the header to determine which certificate signed the assertion
const encodedHeader = assertion.split('.')[0];
const decodedHeader = Buffer.from(encodedHeader, 'base64').toString('utf8');
const header = JSON.parse(decodedHeader);
const keyId = header.kid;

// Fetch the current certificates and verify the signature on the assertion
const certs = await certificates();
const payload = jwt.verify(assertion, certs[keyId]);

// Check that the assertion's audience matches ours
const aud = await audience();
if (payload.aud !== aud) {
  throw new Error('Audience mismatch. '+payload.aud+' should be '+aud+'.');
}

// Return the two relevant pieces of information
return {
  email: payload.email,
  sub: payload.sub,
};
}