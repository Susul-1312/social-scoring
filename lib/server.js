const express = require("express");
const router = express.Router();

const validateCreds = require("./validateCreds.js");

router.get("/login", (req, res) => {
  if (req.headers.authorization) {
    if (validateCreds(req.headers.authorization)) {
      res.redirect(302, "/users/me");
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

module.exports = router;
