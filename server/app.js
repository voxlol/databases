var express = require('express');
var db = require('./db');
var reqHandlers = require('./controllers/index.js');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

app.post('/classes/messages', reqHandlers.messages.post);
app.get('/classes/messages', reqHandlers.messages.get);

app.post('/classes/users', reqHandlers.users.post);
app.get('/classes/users', reqHandlers.users.get);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

