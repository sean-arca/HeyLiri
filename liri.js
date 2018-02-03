// Requires
require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// APIs
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Test LIRI
// console.log("Testing LIRI 1,2,3");

// User Inputs
var cmd = process.argv[2];
var searchInput = process.argv[3];

// LIRI Commands
switch(cmd) {
    // Tweets
    case "my-tweets": 
        myTweets();
        break;
    // Spotify
    case "spotify-this-song":
        spotifyThisSong();
        break;
    // OMDB
    case "movie-this":
        movieThis();
        break;
    // Do What it says
    case "do-what-it-says":
        doWhatItSays();
        break;
    // Instructions
    default: console.log("Hi! I'm Liri, Please Choose One of the Options Below!\n" + 
        "\n 1. my-tweets - Shows Your Last 20 Tweets " +
        "\n 2. spotify-this-song 'song name' - Searches Spotify For A Song"+
        "\n 3. movie-this 'movie name' - Searches The Movie Database"+
        "\n 4. do-what-it-says. - Just Do It."+ "\n" +
        "\n Ex: node liri.js my-tweets\n" +
        "\n**********\nBe sure to put the movie or song name in quotation \nmarks if it's more than one word.\n**********\n\n\n");
}

// Functions
// Twitter
function myTweets() {
    var params = {screen_name: 'liri_sean'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // console.log(error); use if errors
        if (!error) {
            var twitterInit = "Hi Sean, Here are your last 20 tweets.\n\n";
            console.log(twitterInit);
            for (var i = 0; i < tweets.length; i++) {
                console.log(`Tweet ${i+1}: ${tweets[i].created_at}`);
                console.log(`${tweets[i].text} \n\n`);
            }
        }
    });
}

// Spotify
function spotifyThisSong () {
    spotify.search({ type: 'track', query: searchInput }, function(err, data) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Song Search Complete.");
        };

        // Display Arist - Song
        console.log(`${data.tracks.items[0].artists[0].name} - ${data.tracks.items[0].name}`);
        // Display Album Name
        console.log(`Album: ${data.tracks.items[0].album.name}`);
        // Display Preview Link
        console.log(`Preview: ${data.tracks.items[0].preview_url}`);
        
    });
}

// OMDB

// Do What It Says