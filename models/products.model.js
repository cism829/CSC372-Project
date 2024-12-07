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

function getOneCate(cat) {
  let sql = "SELECT * FROM Categories WHERE cateName =?;"
  const item = db.get(sql, cat);
  return item;
}

function getUPC(id) {
  let sql = "SELECT upc FROM Products WHERE productId=?;"
  let info = db.get(sql, id);
  return info;
}


function createNew(params) {
  let sql = "INSERT INTO Products " +
    "(pName, description, imageURL, price, cateId) " +
    "VALUES(?, ?, ?, ?, ?); ";
  const info = db.run(sql, params);
  return info;
}


function getCart(userId) {
  let sql = "SELECT * FROM Carts WHERE userId=?;";
  const info = db.get(sql, userId);
  return info;
}

function cartProducts(cartId) {
  let sql = "SELECT * From CartProducts WHERE cartId=?";
  const info = db.all(sql, cartId);
  return info;
}

function deleteFromCart(cartProductId) {
  let sql = "DELETE From CartProducts WHERE cartProductId=?";
  db.run(sql, cartProductId);
}

function updateQuant(params) {
  let sql = "UPDATE CartProducts SET quantity=? WHERE cartProductId=?"
  db.run(sql, params);

}

function addToCart(params) {
  let sql = "INSERT INTO CartProducts (cartId, productId, quantity) " +
    "Values (?, ?, ?);";
  db.run(sql, params);
  console.log("added to cart");
}

function emptyCart(params) {
  let sql = "DELETE from CartProducts WHERE cartProductId=?"
  db.run(sql, params);
  console.log("deleted from cart");
}

function getUserbyGoo(params) {
  let sql = "SELECT userId FROM Users WHERE google_id=?";
  let info = db.all(sql, params);

  return info;

}

function getBycpId(params) {
  let sql = "SELECT cartId FROM CartProducts WHERE cartproductId=? ";
  let info = db.get(sql, params);
  return info;
}
function getbycId(params) {
  let sql = "SELECT userId FROM Carts where cartId=?";
  let info = db.get(sql, params);
  return info;
}

function getGoobyUser(params) {

  let sql = "SELECT google_id FROM Users where userId=?;"
  let info = db.get(sql, params);
  console.log(info);
  return info;
}

function makeOrders(params) {
  let sql = "INSERT INTO OrderItems (orderId, productId, quantity, totalPrice)" +
    "Values (?,?,?,?);";
  db.run(sql, params);

}

function getOrder(params) {
  let sql = "SELECT * FROM Orders WHERE userId=?";
  let info = db.all(sql, params);

  return info;
}

function createOrder(params) {
  let sql = "INSERT INTO Orders (userId, orderDate)" +
    "Values (?,?);";
  let info = db.run(sql, params);
  console.log(info);
  return info;
}

function getOrderItems(params) {
  let sql = "SELECT * " +
    "FROM OrderItems ois " +
    "JOIN Orders o ON o.orderId = ois.orderId " +
    "JOIN Products p ON ois.productId = p.productId " +
    "WHERE ois.orderId=?;";
  let info = db.all(sql, params);
  return info;

}

function getOrderTotal(params) {
  console.log("in get order total");

  let sql = "SELECT sum(totalPrice) as grandTotal " +
    "FROM OrderItems ois " +
    "JOIN Orders o ON o.orderId = ois.orderId " +
    "JOIN Products p ON ois.productId = p.productId " +
    "WHERE o.userId=? AND ois.orderId=?;";
    console.log(params);

  let info = db.get(sql, params);
  console.log(info);
  return info;
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
  addToCart,
  getUserbyGoo,
  getBycpId,
  getbycId,
  getGoobyUser,
  makeOrders,
  getOrder,
  emptyCart,
  createOrder,
  getOrderItems,
  getOrderTotal
};
