const express = require("express");
const router = express.Router();

const validateCreds = require("./validateCreds.js");

router.use("/users/:userId", (req, res) => {
  if (!req.params.userId) {
    res.redirect(301, "/users/me");
  }

  if (validateCreds(req.headers.authorization)) {
    req.next();
  } else {
    res.set("Cache-control", "no-store");
    res.redirect(302, "/login");
  }
});

module.exports = router;
