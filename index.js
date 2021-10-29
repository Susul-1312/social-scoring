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

app.all((req, res) => {
  // in case that the response wasnt ended by the server, notify the user
  res
    .send(500)
    .end("There has been a serverside Error that could not be handled");
});

app.listen(PORT, () => {
  console.log("App listening on Port", PORT);
});
