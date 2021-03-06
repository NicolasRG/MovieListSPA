const expect = require('chai').expect;
const request = require("request");
const Cookies = require('cookies');

const url = "http://localhost";
const cj = request.jar();

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
    Test Cookie Parsing
*/

describe("Cookie logging", function(){
    const route = "/cookie";
    const name = "James";
    it("Logs the cookies and name", function(done){

        cookies.set('name', name, {signed : true});
        
        cj.setCookie(cookies, "http://testScript", [], (err, cookie)=>{
            console.log (err, cookie);
        });//, [{ignoreError : true}]);

        const options = {uri: url+route,
                         json : true,
                         jar : true,
                          jar : cj
                        }

        request.get(options, function(err, repsonse,  body){
            console.log(typeof body);
            expect(body).to.equal(name);
            done();
        
        });
    }).timeout(5000);
    

});


/*
    Test connection to MongoDB
*/

describe("Connect to MongoDB", function(){
    this.enableTimeouts(true);
    const route = '/mongoDBtest';

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
                                name : "Anime part 2",
                                url : "asdf.com",
                                creator : "tim",
                                },
                         json : true,
                        };

        request.post(options, function(err, repsonse,  body){
            console.log(typeof body);
            expect(body).match(/^[a-fA-F0-9]+$/);//mathces hex ids
            done();
        
        });
    }).timeout(5000);

    
    //updates these test when done with base concept
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
        
            expect(body.name).to.equal(options.body.newName);
            done();
        });
    
    }).timeout(5000);

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
    }).timeout(5000);
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