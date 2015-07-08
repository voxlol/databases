var models = require('../models');
var bluebird = require('bluebird');
var dbConnection = require('../db/index.js').connection;
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function (req, res) {
      dbConnection.query("SELECT * FROM messages", function(err, results, fields) {
        if(err) console.log(err);
        else{
          console.log('Successful fetch from the database!');
          console.dir(results);
          res.status(200).json(results);
          res.end();
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var entry = {author: req.body.username, text: req.body.message, roomname: req.body.roomname};

      dbConnection.query("INSERT INTO messages SET ?", entry, function(err, results, fields) {
        if(err) console.log(err);
        else{
          console.log('Successful insertion to the database!');
          console.dir(results);
          res.status(201).send('Successful insertion');
          res.end();
        }
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      dbConnection.query("SELECT * FROM users", function(err, results, fields) {
        if(err) console.log(err);
        else{
          console.log('Successful fetch from the database!');
          console.dir(results);
          res.status(200).json(results);
          res.end();
        }
      });
    },
    post: function (req, res) {
      var user = {name: req.body.username};

      dbConnection.query("INSERT INTO users SET ?", user, function(err, results, fields) {
        if(err) console.log(err);
        else{
          console.log('Successful insertion to the database!');
          console.dir(results);
          res.status(201).send('Successful insertion');
          res.end();
        }
      });
    }
  }
};

