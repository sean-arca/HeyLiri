// Requires
require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

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
function movieThis() {
    var movie = searchInput;
    if (!movie) {
        movie = "mr nobody"
    };

    request(`http://www.omdbapi.com/?t=${movie}&plot=short&apikey=trilogy`, function (error, response, body) {
        // If no errors, parse through movie object
        if (!error && response.statusCode == 200) {
            // Create movieObject var for typing efficiency
            var movieObject = JSON.parse(body);
            // View the object (testing)
            // console.log(movieObject);
            
            // Title
            console.log(`Title: ${movieObject.Title}`);
            // Year
            console.log(`Year: ${movieObject.Year}`);
            // IMDB Rating
            console.log(`IMDB Rating: ${movieObject.imdbRating}`);
            // Rotten Tomatoes
            console.log(`Rotten Tomatoes Rating: ${movieObject.Ratings[1].Value}`);
            // Country Produced
            console.log(`Produced In: ${movieObject.Country}`);
            // Language
            console.log(`Language: ${movieObject.Language}`);
            // Plot
            console.log(`Plot: ${movieObject.Plot}`);
            // Actors/Actresses
            console.log(`Actors/Actresses: ${movieObject.Actors}`);

        } else {
            console.log("Error :"+ error);
            return;
        };
    });
};

// Do What It Says
function doWhatItSays () {
    // Read thru random.txt using fs
    fs.readFile("random.txt", 'utf8' ,function(error, data) {
        if (error) {
            return console.log(error);
        }
        var logTxt = data.split(',');
        // console.log(logTxt); view data

        var command = logTxt[0];
        var param = logTxt[1];

        // Clean up param
        param = param.replace('"', '');
        param = param.replace('"', '');

        // Switch cases based on random.txt
        switch (command) {
            case 'my-tweets':
                searchInput = param;
                myTweets();
                break;

            case 'spotify-this-song':
                searchInput = param;
                spotifyThisSong();
                break;

            case 'movie-this':
                searchInput = param;
                movieThis();
                break;
        }
    });
}