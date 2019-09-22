// module imports 
const express = require("express");

//global server constants
const app = express();
const PORT = 80;

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
    res.send(true+"");
});

//start server
app.listen(PORT);
console.log('listening on port : ' + PORT);
