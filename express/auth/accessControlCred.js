const Cookies = require('cookies');

/**
 * Attach headers needed for google requests
 * @param {Request} req 
 * @param {Response} res 
 * @param {next} next 
 */
const testCookieLogger = async function(req, res, next) {
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}



module.exports = testCookieLogger;
