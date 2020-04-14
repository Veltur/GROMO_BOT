/*
 * Discord Bot Builder Bot
 * Version 1.2.0
 * Robert Borghese
 */

const Files = require(require("path").join(__dirname, "js", "Main.js")).Files;

if (!process.send) {
  Files.initStandalone();
} else {
  process.on("message", function(content) {
    Files.initBotTest(content);
  });

  const express = require("express");
  const keepalive = require("express-glitch-keepalive");

  const app = express();

  app.use(keepalive);

  app.get("/", (req, res) => {
    res.json(
      "Ten bot powinien być w trybie online! Uptimerobot utrzyma go przy życiu"
    );
  });
  app.get("/", (request, response) => {
    response.sendStatus(200);
  });
  app.listen(process.env.PORT);
}
