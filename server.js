const express = require("express");
const history = require("connect-history-api-fallback");
const app = express();
app.use(history());
app.use(express.static("dist"));
app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});
const port = process.env.PORT || 3000;
app.listen(port);
