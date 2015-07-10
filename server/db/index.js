var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/chat');

var database = mongoose.connection;
database.on("error", function(error){console.log(error)})
database.once("open", function() {
  console.log("MongoDB is ready to go!")
 });



var UserSchema = new mongoose.Schema({
username: {
  type: String,
  required: true
}
})

var User = mongoose.model("User", UserSchema);


var MessageSchema = new mongoose.Schema({
author: String,
text: String,
created_at : {
  type: Date,
  required: true,
  default: Date.now
},
roomname: String
})

var Message = mongoose.model("Message,", MessageSchema);

module.exports.User = User;
module.exports.Message = Message;








/*

var Promise = require('bluebird');
var mysql = require('mysql')
var Sequelize = require('sequelize')

var sequelize = module.exports =  new Sequelize("chat", "root", "");

var User = exports.User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Message = exports.Message = sequelize.define('Message', {
  text: Sequelize.STRING
});

var Room = exports.Room = sequelize.define('Room', {
  roomname: Sequelize.STRING
})

User.hasMany(Message);
Room.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Room);

User.sync();
Message.sync();
Room.sync();
*/
