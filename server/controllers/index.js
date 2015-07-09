var models = require('../models');
var Promise = require('bluebird');
var dbConnection = require('../db/index.js').connection;


module.exports = {
  messages: {
    get: function (req, res) {
      // select * from messages, join users,rooms, where
      var queryString = "SELECT users.username, text, rooms.roomname FROM messages JOIN users ON users.id = messages.author JOIN rooms ON rooms.id = messages.roomname"
      dbConnection.query(queryString, function(err, results, fields) {
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
      var roomname = {roomname : req.body.roomname};
        // insert the room, and get an id back
          // retrive the ID frmo the query(in a cb) and we're going to call the insert inside that cb

      dbConnection.query("SELECT id FROM users WHERE username='" + req.body.username + "'", function(err,results,fields){
        // query with the req.body.username to SELECT from Useres where name = username
        if(err)console.log(err);
        else{
          var userId = results[0].id;

          dbConnection.query("INSERT INTO rooms SET ?", roomname, function(err, results2, fields){
            if(err) console.log(err)
            else{
              var roomId = results2.insertId;
              // retrive the ID from the query and now insert into the messages
              var entry = {author: userId, text: req.body.message, roomname: roomId};

              dbConnection.query("INSERT INTO messages SET ?", entry, function(err, results3, fields) {
                if(err) console.log(err);
                else{
                  console.log('Successful insertion to the database!');
                  res.status(201).send('Successful insertion');
                  res.end();
                }
              });
            } // ends the room else
          }) // end the query to the room insert
        } // end of the username else cb
      }); // end of INSERT query USERNAME
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log(dbConnection);
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
      var user = {username: req.body.username};

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

