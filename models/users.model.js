"use strict";
const db = require("./db-path");


function getUserById(id) {
    let sql = "SELECT userId FROM Users where google_id=?";
    const item = db.get(sql, id);
    return item;
  }
  
  function createNewUser(params) {
    let sql = 'INSERT INTO Users ("google_id","name","first_name","last_name","email", picture) VALUES (?,?,?,?,?,?);';
    const info = db.run(sql, params);
    return info;
  }

  function createCart(params){
    let sql = "INSERT INTO Carts (userId) Values(?);";
    db.run(sql, params);
  }

  
module.exports = {
    getUserById,
    createNewUser,
    createCart
  };