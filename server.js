const express = require("express");
const { connectToDb } = require("./config/db-setup");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(compression());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      connectSrc: ["'self'", "*.tinymce.com", "*.tiny.cloud", "blob:"],
      frameSrc: ["'self'", "*.tinymce.com", "*.tiny.cloud"],
      scriptSrc: ["'self'", "'unsafe-inline'", "*.tinymce.com", "*.tiny.cloud"],
      imgSrc: ["'self'", "*.tinymce.com", "*.tiny.cloud", "data:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "*.tinymce.com", "*.tiny.cloud"],
      fontSrc: ["'self'", "*.tinymce.com", "*.tiny.cloud"],
    },
  })
);
app.use(cors());

// db setup
connectToDb();

// body parser
app.use(express.json());

// cookie
app.use(cookieParser());

// routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/posts", require("./routes/posts.routes"));
app.use("/comments", require("./routes/comments.routes"));
app.use("/pictures", require("./routes/pictures.routes"));
app.use("/users", require("./routes/users.routes"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).send();
});

const thePort = process.env.PORT || 5000;
const theServer = app.listen(thePort, () => console.log("Server running"));

process.on("SIGTERM", () => {
  theServer.close();
});
