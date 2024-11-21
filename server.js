"use strict";
const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs").promises;
const multer = require("multer");
// app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




const productsRoutes = require("./routes/products.route");
const { db_close } = require("./models/db-path");

app.use(express.static(__dirname + "/public"));


app.set("view engine", "pug");
app.set("views", "views");

app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.redirect("/products/home");
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
