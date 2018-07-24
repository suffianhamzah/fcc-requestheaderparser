// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



/**
 * '/api/whoami' parses the http request header it receives,
 * and will send back a JSON containing:
 * { ipaddress: string,
 *   language: string,
 *   software: string
 */
app.get("/api/whoami", (request, response) => {
  console.log(request.headers)
  const softwareGex = /\((.*)\)/;
  const headers = request.headers;
  const respObj = {
    'ipaddress': headers['x-forwarded-for'].split(',')[0],
    'language': headers['accept-language'].split(',')[0],
    'software': headers['user-agent'].match(softwareGex)[1]
  };
  response.send(JSON.stringify(respObj));
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
