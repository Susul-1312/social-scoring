require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// the middleware is used for auth and stuff
const middleware = require("./lib/middleware.js");

// the server then actually returns the pages
const server = require("./lib/server.js");

app.use(middleware);
app.use(server);

// the server starts listening
app.listen(PORT, () => {
  console.log("App listening on Port", PORT);
});
