const { createHash } = require("crypto");

const users = require(process.cwd() + "/users.json");

module.exports = function (data) {
  if (!data) return false;

  let [user, password] = Buffer.from(data.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (!users[user]) return false;

  const passHash = createHash("sha256").update(password).digest("hex");

  if (users[user].passwordHash == passHash) return true;

  return false;
};
