const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();

var cors = require("cors");
app.use(cors());

connectDB();

// middleware
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/folders", require("./routes/folders"));
app.use("/api/tweets", require("./routes/tweets"));

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.get("", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });

  app.get("/*"),
    (req, res) => {
      res.redirect("");
    };

  app.use("", express.static(__dirname + "/client/build/"));
}

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
