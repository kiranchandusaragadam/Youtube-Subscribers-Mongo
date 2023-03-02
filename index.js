const express = require("express");
const app = express();
const router = require("./src/app.js");
const mongoose = require("mongoose");
const port = 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

// Connect to DATABASE
const DATABASE_URL =
  "mongodb+srv://Kiranchandu:Mongo1999@cluster0.iyubwyu.mongodb.net/?retryWrites=true&w=majority";
const db = mongoose.connection;
mongoose.connect(
  DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Failed to connect to db");
    } else {
      console.log("Successfully connected to db");
    }
  }
);

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));
