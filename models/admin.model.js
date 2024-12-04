"use strict";
const db = require("./db-path");

function getEverything() {
  let sql = "SELECT * FROM Products, Categories;"
  const info = db.run(sql);
  return info;
}

function createNew(params) {
  console.log("in create new model");
  let sql = "INSERT INTO Products " +
    "(pName, description, imageURL, price, cateId) " +
    "VALUES(?, ?, ?, ?, ?); ";
  db.run(sql, params, function (err) {
    if (err) {
      console.log("AN ERORRRRRRRRRR")
      console.error("Error inserting into database:", err);
      return; 
    }
    console.log("succesfully created prodecut from json");
    // console.log("The ID of the last inserted row was: " + this.lastID);
  });
}

function getByName(name) {
  console.log("in name model");
  let sql = "SELECT * " +
    "FROM PRODUCTS " +
    "WHERE pName =?;";

  const info = db.get(sql, name);
  return info;
  // return info;         
}

function updateProduct(params) {
  let sql = "UPDATE Products " +
    "SET pName = ?, description = ?, imageURL = ?, price = ?" +
    "WHERE productId = ?;"
  const info = db.run(sql, params);
  return info;
}

function deleteProduct(id) {
  let sql = "DELETE FROM Products " +
    "WHERE productId = ?;";
  db.run(sql, id);

}

function getUPC(id){
  let sql = "SELECT upc FROM Products WHERE productId=?;"
  db.run(sql, id);
  return info;
}

module.exports = {
  createNew,
  getEverything,
  updateProduct,
  deleteProduct,
  getByName,
  getUPC
};