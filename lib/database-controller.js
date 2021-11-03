// connect to sqlite database or create new one
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(process.cwd() + './database.db');

// create table to store users, passwords and scores
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, score INTEGER)");
});



module.exports = {

  // return score of user
  getScore: function(username) {
    var score = 0;
    db.serialize(function() {
      db.get("SELECT score FROM users WHERE username = ?", username, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          score = row.score;
        }
      });
    });
    return score;
  },

  // check if user exists
  userExists: function(username) {
    var exists = false;
    db.serialize(function() {
      db.get("SELECT * FROM users WHERE username = ?", username, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          if (row) {
            exists = true;
          }
        }
      });
    });
    return exists;
  },

  // get user password
  getUserPassword: function(username) {
    var password = "";
    db.serialize(function() {
      db.get("SELECT password FROM users WHERE username = ?", username, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          password = row.password;
        }
      });
    });
    return password;
  },

  // register user with username and password
  registerUser: function(username, password) {
    db.serialize(function() {
      db.run("INSERT INTO users VALUES (?, ?, ?)", username, password, 0);
    });
  }
};
