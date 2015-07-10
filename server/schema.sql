CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) UNIQUE,
  created_at timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id int(11) NOT NULL AUTO_INCREMENT,
  roomname varchar(255) UNIQUE,
  created_at timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int(11) NOT NULL AUTO_INCREMENT,
  author int,
  text text,
  roomname int,
  created_at timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (author) REFERENCES users(id),
  FOREIGN KEY (roomname) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */
-- users table - uniqueID
-- room table - uniqueID
-- INSERT INTO messages (author, text, roomname, created_at) values('allen', 'is this working?', 'allenroom', NOW());

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

