"use strict";
const db = require("./db-path");

function createNew(params) {
    let sql = "INSERT INTO Products " +
      "(pName, description, imageURL, price, cateId) " +
      "VALUES(?, ?, ?, ?, ?); ";
    const info = db.run(sql, params);
    return info;
  }

  module.exports = {
    createNew
  };