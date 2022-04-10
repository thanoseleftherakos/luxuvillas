// const express = require("express");
// const serveStatic = require("serve-static");
// const history = require("connect-history-api-fallback");

// const path = require("path");
// app = express();
// app.use(serveStatic(path.join(__dirname, "dist")));
// app.use(history());
// const port = process.env.PORT || 3000;
// app.listen(port);

const express = require("express");
const path = require("path");
const history = require("connect-history-api-fallback");
// ^ middleware to redirect all URLs to index.html

const app = express();
const staticFileMiddleware = express.static(path.join(__dirname, "dist"));

app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);
// ^ `app.use(staticFileMiddleware)` is included twice as per https://github.com/bripkens/connect-history-api-fallback/blob/master/examples/static-files-and-index-rewrite/README.md#configuring-the-middleware

app.get("/", function (req, res) {
  res.render(path.join(__dirname + "/index.html"));
});

app.listen(3000, function () {
  console.log("Express serving on 3000!");
});
