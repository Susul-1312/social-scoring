const { scryptSync, timingSafeEqual } = require("crypto");

const {
  userExists,
  getPasswordHash,
  registerUser,
} = require("./database-controller");

// register debug user
registerUser("debug", "debug");

module.exports = async function (data) {
  // Check if data was provided
  if (!data) return false;

  // get password and username from data
  let [user, password] = Buffer.from(data.split(" ")[1], "base64")
    .toString()
    .split(":");

  console.log(user, password);

  // Check if user exists
  if (!(await userExists(user))) return false;

  // Get password hash from database
  let passwordHash = await getPasswordHash(user);
  const [salt, storedHash] = passwordHash.split(":");

  // Check if password is correct
  const newHash = scryptSync(password, salt, 64);
  if (timingSafeEqual(newHash, Buffer.from(storedHash, "hex"))) return true;

  return false;
};
