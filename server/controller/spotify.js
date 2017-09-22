/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'c1f01290ed4f4d488afc7863f5d83786'; // Your client id
var client_secret = 'db61b6058b274cb89b26584950e5a2af'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var search = function (req, res) {
  var status = req.body.search

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token
      var options = {
        url: `https://api.spotify.com/v1/search?q=${status}&type=playlist`,
        headers: {
          'Authorization' : 'Bearer ' + token
        },
        json: true
      }
      request.get(options, function(err, response, body) {
        res.send(body)
      })
    }
  })
}

module.exports = {
  search
}
