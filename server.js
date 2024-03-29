// server.js
// where your node app starts

// init project
const express = require('express');
const path = require('path');
const accepts = require('accepts');
const eua = require('express-useragent');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(eua.express());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// routing
app.get("/", function (request, response) {
  response.redirect('/api/whoami');
  // response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  let headers = accepts(req);
  res.json({
    "ipaddress": req.ip,
    "language": headers.languages()[0],
    "software": req.useragent && req.useragent.source ? req.useragent.source.match(/\(([^)]+)\)/)[1] : ""
  }).end();
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});