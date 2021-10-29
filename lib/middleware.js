const express = require("express");
const router = express.Router();

router.use((req, res) => {
  console.log("Request Received");
  next();
});

module.exports = router;
