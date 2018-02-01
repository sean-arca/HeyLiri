require("dotenv").config();
var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log("Testing LIRI 1,2,3")

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`