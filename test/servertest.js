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
    this.enableTimeouts(true);
    const route = '/mongoDBtest';
    status200(route);

    it("connects to mongo", function(){
        
        request(url+route, function(error, response, body){

            expect(body).to.equal("true");
        
        });
    });

    it("Retrieves information from get route", function(){

        request(url+"/getListofAllMovies" , function(err, response, body){
            const list = JSON.parse(body);
            expect(list).to.be.instanceOf(Object);

        });
    });

    it("Posts information in the data base", function(done){

        const options = {uri: url+'/postMovie',
                         body : {
                                name : "Anime part 2"
                                },
                         json : true,
                        };

        request.post(options, function(err, repsonse,  body){
            
            expect(body+"").to.be.equal("true");
            done();
        
        });
    }).timeout(500);

    

    it("Updates information in the database", function(done){

        const options ={
            uri : url + '/putsMovie',
            body : {
                oldName : "Anime part 2",
                newName : "Anime part 3"
            },
            json : true,
        }

        request.put(options, function(err, repsonse, body){
        
            expect(body+"").to.equal("true");
            done();
        });
    
    }).timeout(500);

    it("Deletes inforamtion in the data base", function(done){
        const options = { uri : url+'/deleteMovie',
                         body : {
                                    name : "Anime part 3"
                                },
                        json : true,
                        };

        request.delete(options, function(errm, repsonse, body){
            expect(body+"").to.equal("true");
            done();
        
        });
    }).timeout(500);
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