"use strict";
const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs").promises;
const multer = require("multer");
// app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require('express-session');
const passport = require('passport');
require("./auth/passport");
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/auth', require('./auth/auth.route'));
app.use((req, res, next) => {
  res.locals.user = req.user || null;  // Make user available to all views
  next();
});

const productsRoutes = require("./routes/products.route");
const { db_close } = require("./models/db-path");

app.use(express.static(__dirname + "/public"));


app.set("view engine", "pug");
app.set("views", __dirname + "views");

app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  req.session.returnTo = req.originalUrl;
  res.render("home");
});

app.get("/admin", (req, res) => {
  res.redirect("/admin/home");
});


const adminRoute = require("./routes/admin.route");
app.use("/admin", adminRoute);



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("...Closing HTTP server.");
  server.close(() => {
    console.log("...HTTP server closed.")
  })
}
