"use strict";
const db = require("./db-path");

function getEverything() {
  let sql = "SELECT * FROM Products, Categories;"
  const info = db.run(sql);
  return info;
}

function createNew(params) {
  console.log("create start");
  let sql = "INSERT INTO Products "+
            "(pName, description, imageURL, price, cateId) " +
            "VALUES(?, ?, ?, ?, ?); ";
  console.log("sql start");

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.error("Error inserting into database:", err);
        return reject(err); 
      }
      console.log("Created product with ID:", this.lastID); 
      resolve(this.lastID); 
    });
  });
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

module.exports = {
  createNew,
  getEverything,
  updateProduct,
  deleteProduct
};