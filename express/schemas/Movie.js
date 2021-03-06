const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
//creates schema for movies
const movieSchema = new mongoose.Schema({name : String, url : String, creator : String}, {collection : "movie"}) ;

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;