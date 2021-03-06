var models = require('../models');
var Promise = require('bluebird');
var Message = require('../db/index.js').Message;
var User = require('../db/index.js').User;
// var dbConnection = require('../db/index.js').connection;
// var Sequelize = require('sequelize')
// var sequelize = module.exports =  new Sequelize("chat", "root", "");

// var User = exports.User = sequelize.define('User', { username: Sequelize.STRING });
// var Message = exports.Message = sequelize.define('Message', { text: Sequelize.STRING });
// var Room = exports.Room = sequelize.define('Room', { roomname: Sequelize.STRING})

// User.hasMany(Message);
// Room.hasMany(Message);
// Message.belongsTo(User);
// Message.belongsTo(Room);

// User.sync();
// Message.sync();
// Room.sync();

var defaultCorsheaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "ContentType, accept, data, Content-Type",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
}

module.exports = {

  messages: {
    get: function (req, res) {
      Message.find({}).exec(function(err,collection){
        if(err) console.log(err)
        else{
          res.json(collection);
        }
      });
    },
    post: function (req, res) {
      var user = req.body.username,
          room = req.body.roomname,
          text = req.body.message;

      Message.create({author: user, text: text, roomname: room}, function(err, collection){
        if(err) console.log(err)
        else{
          res.json(collection);
        }
      })
    }
  },

  users: {
    get: function (req, res) {
      User.find({}).exec(function(err, collection){
        if(err) console.log(err)
        else{
          res.json(collection);
        }
      })
    },
    post: function (req, res) {

      User.create({username:req.body.username}, function(err,collection){
        if(err) console.log(err)
        else{
          res.json(collection);
        }
      })
    }
  }
}
