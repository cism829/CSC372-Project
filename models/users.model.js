"use strict";
const db = require("./db-path");


function getUserById(id) {
    let sql = "SELECT * FROM Users where google_id=?";
    const item = db.get(sql, id);
    return item;
  }
  
  function createNewUser(params) {
    let sql = 'INSERT INTO Users ("google_id","name","first_name","last_name","email", picture) VALUES (?,?,?,?,?,?);';
    const info = db.run(sql, params);
    return info;
  }

  
module.exports = {
    getUserById,
    createNewUser
  };