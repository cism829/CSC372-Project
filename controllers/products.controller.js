"use strict";
const model = require("../models/products.model");

function welcomePage(req, res, next){
  res.render("home", {title: "C's Hair Store" });
}

function getAll(req, res, next) {
  try {
    let categories = model.getCate();
    let products = model.getProducts();
    res.render("products", {categories: categories, products: products, title: "Products"})
  } catch (err) {
    console.error("Error while getting games ", err.message);
    next(err);
  }
}

function oneProduct(req, res, next){
  try{ 
    let productId = parseInt(req.params.id);
    let products = model.oneProduct(productId);
    res.render("details", {products: products, title: "Product Detail"})
  }catch (err) {
    console.error("Error while product", err.message);
    next(err);
  }
}

function getOneCate(req,res,next){
  try{
    let param = req.params.category;
    let category = model.getOneCate(param);
    res.render("category", {category: category, title: "something"});
  }catch (err) {
    console.error("Error while getting category", err.message);
    next(err);
  }

}

// function createNew(req, res, next) {
//   let id = parseInt(req.body.id);
//   let name = req.body.name;
//   let platform = req.body.platform;
//   let release_year = parseInt(req.body.release_year);
//   let genre = req.body.genre;
//   let publisher = req.body.publisher;
//   let developer = req.body.developer;
//   let rating = req.body.rating;

//   if (id && name && platform && release_year && genre && publisher && developer && rating) {
//     let params = [id, name, platform, release_year, genre, publisher, developer, rating];
//     try {
//       model.createNew(params);
//       // res.redirect("/games/all");
//       res.render("games", { gamesList: model.getAll(), title: "All Games" });
//     } catch (err) {
//       console.error("Error while creating game: ", err.message);
//       next(err);
//     }
//   }
//   else {
//     res.status(400).send("Invalid Request");
//   }
// }

module.exports = {
  welcomePage,
  getAll,
  oneProduct,
  getOneCate
}
