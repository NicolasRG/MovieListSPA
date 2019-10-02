const Cookies = require('cookies');


const testCookieLogger = async function(req, res, next) {
    let cookies = new Cookies(req, res, {keys: keys});
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
}



module.exports = testCookieLogger;
