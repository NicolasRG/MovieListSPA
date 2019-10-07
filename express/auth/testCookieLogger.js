const Cookies = require('cookies');

const keys = ["name"];
/**
 * Testing out how cookies work in node
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const testCookieLogger = async function(req, res, next) {
    let cookies = new Cookies(req, res, {keys: keys});

    //get name
    const name = cookies.get('name', {signed : true} );

    //set the cookie to a value
    
    if(!name){
        cookies.set('name', "Jimmy boberts",{signed : true, httpOnly : false,});
        console.log("you're new: " + new Date().toISOString());
    
    }else{
        console.log("Welcome back "+ name);
    
    }

    console.log(name);

    next();
}



module.exports = testCookieLogger;

