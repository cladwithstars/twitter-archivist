const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();

var cors = require("cors");
app.use(cors()); // <---- use cors middleware

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false })); //now we can accept body data

//Define Routes
app.use("/api/folders", require("./routes/folders"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.get("", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });

  app.use("", express.static(__dirname + "/client/build/"));
}

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
