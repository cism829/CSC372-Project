"use strict";
const db = require("./db-path");

function getAll() {
  let sql = "SELECT * FROM Products;";
  const data = db.all(sql);
  return data;
}

function getCate() {
  let sql = "Select * FROM Categories;";
  const data = db.all(sql);
  return data;
}

function getProducts() {
  let sql = "Select * FROM Products;";
  const data = db.all(sql);
  return data;
}

function oneProduct(id) {
  let sql = "SELECT * FROM Products WHERE productId =? ;";
  const item = db.get(sql, id);
  return item;
}

function getOneCate(cat){
  let sql = "SELECT * FROM Categories WHERE cateName =?;"
  const item = db.get(sql, cat);
  return item;
}

// function getAllByOneAttribute(attribute, value) {
//   const validColumns = getColumnNames();
//   if (validColumns.includes(attribute)) {
//     let sql = "SELECT * FROM Games WHERE " + attribute + " =? ;";
//     const data = db.all(sql, value);
//     return data;
//   }
// }



function createNew(params) {
  let sql = "INSERT INTO Products " +
    "(pName, description, imageURL, price, cateId) " +
    "VALUES(?, ?, ?, ?, ?); ";
  const info = db.run(sql, params);
  return info;
}



module.exports = {
  getAll,
  getCate,
  getProducts,
  oneProduct,
  getOneCate,
  createNew
};
