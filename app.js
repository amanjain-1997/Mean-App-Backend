const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Post = require("./models/post");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");



mongoose
  .connect(
    "mongodb+srv://amanjain:amanjain@cluster0.brbng.mongodb.net/postdb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});


app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
