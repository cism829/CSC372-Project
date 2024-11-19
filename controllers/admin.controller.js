"use strict";
const model = require("../models/admin.model");

function home(req, res, next){
  res.render("home", {title: "admin" });
}



module.exports = {
    home,
  }