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

function getUPC(id){
  let sql = "SELECT upc FROM Products WHERE productId=?;"
  let info = db.get(sql, id);
  return info;
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

function getCart(userId){
  let sql = "SELECT * FROM Carts WHERE userId=?;";
  const info = db.get(sql, userId);
  return info;
}

function cartProducts(cartId){
  let sql = "SELECT * From CartProducts WHERE cartId=?";
  const info= db.all(sql, cartId);
  
  return info;
}

function deleteFromCart(cartProductId){
  let sql = "DELETE From CartProducts WHERE cartProductId=?";
  db.run(sql, cartProductId);
}

function updateQuant(params){
  let sql = "UPDATE CartProducts SET quantity=? WHERE cartProductId=?"
  db.run(sql, params);
  
}

function addToCart(params){
    let sql = "INSERT INTO CartProducts (cartId, productId, quantity) "+
              "Values (?, ?, ?);";
    db.run(sql,params);
    console.log("added to cart");
}

module.exports = {
  getAll,
  getCate,
  getProducts,
  oneProduct,
  getOneCate,
  getUPC,
  getCart,
  cartProducts,
  deleteFromCart,
  updateQuant,
  addToCart
};
