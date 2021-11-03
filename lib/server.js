const express = require("express");
const router = express.Router();

const validateCreds = require("./validateCreds.js");
const { userExists, getScore } = require("./database-controller");

router.get("/login", (req, res) => {
  if (req.headers.authorization) {
    if (validateCreds(req.headers.authorization)) {
      res.redirect(302, "/users");
      return;
    }

    res.status(401);
    res.setHeader("WWW-Authenticate", "Basic");
    res.send("Invalid password");
    res.end();
    return;
  }

  res.status(401);
  res.setHeader("WWW-Authenticate", "Basic");
  res.send("Please supply a password");
  res.end();
});

router.get("/users/:userId", async (req, res) => {
  if (userExists(req.params.userId))
    res.end(await generateUserpage(req.params.userId));
  else res.end(req.params.userId);
});

router.use(express.static(process.cwd() + "/static"));

module.exports = router;

async function generateUserpage(userId) {
  const score = await getScore(userId);

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>${userId}</title>
  </head>
  <body>
    <div class="userId">
      ${userId}
    </div>
    <div class="score">
      ${score}
    </div>
  </body>
</html>`;
}
