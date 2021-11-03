// connect to sqlite database or create new one
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(process.cwd() + "/database.sqlite", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the database.");
});

// create table to store users, passwords and scores
db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, score INTEGER)"
  );
});

module.exports = {
  getScore,
  userExists,
  getPasswordHash,
  registerUser,
};

// check if user exists, use a promise
function userExists(username) {
    return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row !== undefined);
      }
    );
  });
}


// register user
async function registerUser(username, password) {
  // check if user already exists
  let exists = await userExists(username);
  if (exists) {
    return false;
  }

  const { randomBytes, scryptSync } = require("crypto");
  // hash password with salt
  var salt = randomBytes(16);
  var passwordHash = scryptSync(password, salt, 64);

  console.log(
    "registered User",
    username,
    passwordHash.toString("hex"),
    salt.toString("hex")
  );

  db.serialize(function () {
    db.run(
      "INSERT INTO users VALUES (?, ?, ?)",
      username,
      `${salt.toString("hex")}:${passwordHash.toString("hex")}`,
      0
    );
  });
}

// return hashed password of user, use a promise
function getPasswordHash(username) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      db.get(
        "SELECT * FROM users WHERE username = ?",
        username,
        function (err, row) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (row) {
              resolve(row.password);
            } else {
              reject("User not found");
            }
          }
        }
      );
    }
    );
  });
}


// return score of user, use a promise
function getScore(username) {
    return new Promise((resolve, reject) => {
    db.serialize(function () {
      db.get(
        "SELECT * FROM users WHERE username = ?",
        username,
        function (err, row) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (row) {
              resolve(row.score);
            } else {
              reject("User not found");
            }
          }
        }
      );
    }
    );
  });
}
