var models = require('../models');
var Promise = require('bluebird');
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
      Message.findAll({
      }).then(function(messages){
        res.json(messages);
      })
    },
    post: function (req, res) {
      var user = req.body.username,
          room = req.body.roomname,
          text = req.body.message;

      User.find({username: user}).then(function(user){
        var userid = user.id
        console.log(userid);
        Room.findOrCreate({where: {roomname: room}, defaults: {roomname: room}}).then(function(room){
          var roomId = room[0].dataValues.id;
          Message.create({UserId: userid, text: text, RoomId: roomId}).then(function(message){
            res.status(201).send("message created!")
          });
        });
      });   // find the username, and find the room
    }
  },

  users: {
    get: function (req, res) {
      User.findAll().then(function(users){ res.json(users) })
    },
    post: function (req, res) {
      User.create({username:req.body.username}).then(function(){
        console.log('post success!');
        res.status(201).end('post success')
      })
    }
  }
}
