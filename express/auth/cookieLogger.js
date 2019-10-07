const Cookies = require('cookies');
const validateAssertion = require('./google-utils.js');

const keys = ["name"];
/**
 * Attach cookies for google requests
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const cookieLogger = async function(req, res, next) {
    let cookies = new Cookies(req, res, {keys: keys});

    const assertion = req.header('X-Goog-IAP-JWT-Assertion');
    let email = 'None';
    const cookieEmail = cookies.get('useremail', {signed : true});

    try {
        const info = await validateAssertion(assertion); //checks to see if user is authenticated
        email = info.email;
        //console.log("email is :" + email);

        if( email !== cookieEmail){ //updates to cookie if correct email is not found
            cookies.set('useremail', email ,{signed : true, httpOnly : false,});
            console.log("Welcome new user " + email);
        }

    } catch (error) {
        console.log(error);
        next();
    };

    next();
    
}



module.exports = cookieLogger;

