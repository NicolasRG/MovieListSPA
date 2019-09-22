const expect = require('chai').expect;
const request = require("request");


const url = "http://localhost";

/*
    Makes sure the server works in general
*/
describe("Hello World Get", function() {
    
    const route = "/";
    status200(route);

    it("body is Hello World", function(){
        request(url, function(error, repsonse , body){

            expect(body).to.equal("Hello World");

        });
    });
});

/*
    Test connection to MongoDB
*/

describe("Connect to MongoDB", function(){

    const route = '/mongoDBtest';
    status200(route);

    it("connects to mongo", function(){
        
        request(url+route, function(error, response,body){

            expect(body).to.equal("true");
        
        });
    });

});

/*
    Checks to make sure status is 200
*/
function status200(route){
    
    it("recieves 200 status", function(){
        request(url+route , function(error, response, body){

            expect(response.statusCode).to.equal(200);
        
        });
    });
}