const { createHash } = require("crypto");

const { userExists, getPasswordHash } = require("./database-controller");

module.exports = function (data) {
  if (!data) return false;

  let [user, password] = Buffer.from(data.split(" ")[1], "base64")
    .toString()
    .split(":");

  console.log(user, password);

  if (!userExists(user)) return false;

  const passHash = createHash("sha256").update(password).digest("hex");

  if (getPasswordHash(user) == passHash) return true;

  return false;
};
