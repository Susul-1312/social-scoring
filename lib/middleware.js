const express = require("express");
const router = express.Router();

const validateCreds = require("./validateCreds.js");

router.use((req, res) => {
  // during development we dont want caching issues
  res.set("Cache-control", "no-store");
  res.set("link", "</style.css>; rel=stylesheet;");

  req.next();

  console.log("middleware");
});

router.use("/users/:userId", (req, res) => {
  console.log("users");

  res.locals.hasName = true;

  if (validateCreds(req.headers.authorization)) {
    req.next();
  } else {
    res.set("Cache-control", "no-store");
    res.redirect(302, "/login");
  }
});

router.use("/users", (req, res) => {
  if (!req.headers.authorization) res.redirect(302, "/login");

  if (!res.locals.hasName)
    res.redirect(
      "/users/" +
        Buffer.from(req.headers.authorization.split(" ")[1], "base64")
          .toString()
          .split(":")[0]
    );

  req.next();
});

module.exports = router;
