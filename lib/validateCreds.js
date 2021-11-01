const { scryptSync, timingSafeEqual } = require("crypto");

const { userExists, getPasswordHash } = require("./database-controller");

module.exports = function (data) {
  if (!data) return false;

  let [user, password] = Buffer.from(data.split(" ")[1], "base64")
    .toString()
    .split(":");

  console.log(user, password);

  if (!userExists(user)) return false;

  const [salt, storedHash] = getPasswordHashAndSalt(user).split(":");

  const newHash = scryptSync(password, salt, 64);

  if (timingSafeEqual(newHash, Buffer.from(storedHash, "hex"))) return true;

  return false;
};
