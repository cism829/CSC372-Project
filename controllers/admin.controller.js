"use strict";
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const upcApi = "https://api.upcitemdb.com/prod/trial/lookup?upc=";

const model = require("../models/admin.model");
const productModel = require("../models/products.model");


function home(req, res, next) {
  try {
    let categories = productModel.getCate();
    let products = productModel.getProducts();
    res.render("admin/interface", { categories: categories, products: products, title: "Products" })
  } catch (err) {
    console.error("Error while getting admin all", err.message);
    next(err);
  }
}

function uploadPage(req, res, next) {
  try {
    res.render("admin/upload", { title: "Upload" })
  } catch (err) {
    console.error("Error while getting admin upload page", err.message);
    next(err);
  }

}

function uploadProducts(req, res, next) {
  let newpName;
  let products = [];

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  fs.readFile(req.file.path, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the uploaded file.");
    }

    try {
      console.log("file was read");
      const json = JSON.parse(data);

      for (let i = 0; i < json.length; i++) {
        let product = json[i];
        newpName = product.name;
        let params = [product.name, product.description, product.image, product.price, product.category, product.upc];
        console.log("params were made");

        model.createNew(params);
        let productData = model.getByName(newpName);

        products[products.length] = productData;
        console.log(newpName);
        console.log("getting product by name");


      }
      console.log(" ");

      console.log("before product for loop");
      for (let i = 0; i < products.length; i++) {
        console.log("products uploaded: " + JSON.stringify(products[i], null, 2));
      }

      res.render("admin/upload", {title: "title", products: products})
      // res.redirect("/admin/upload");
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return res.status(400).send("Invalid JSON format.");
    }
  });
}

function newPage(req, res, next){
  res.render("admin/new", {title: "New Product" })
}

function newProduct(req, res, next) {
  console.log("newProduct");

  let pName = req.body.pName;
  let imageURL ="/images/uploads/" + req.file.filename;
  let des = req.body.description;
  let price = req.body.price;
  let cateId = req.body.cateId;
  let upc = req.body.upc;
  console.log("upc= "+upc);
  try {
    let params = [pName, des, imageURL, price, cateId, upc];
    model.createNew(params);

    res.redirect("/admin");
  } catch (err) {
    console.error("Error update form", err.message);
    next(err);
  }

  model.createNew(params);

}



function updatePage(req, res, next) {
  try {
    let productId = parseInt(req.params.id);

    let product = productModel.oneProduct(productId);
    res.render("admin/update", { product: product, title: "title" })
  } catch (err) {
    console.error("Error while getting admin update page", err.message);
    next(err);
  }
}

function updateProduct(req, res, next) {
  let productId = parseInt(req.params.id);
  let product = productModel.oneProduct(productId);

  let pName = req.body.pName;
  let imageURL;
  let des = req.body.description;
  let price = req.body.price;

  if (req.file.filename == product.imageURL) {
    imageURL = product.imageURL;
  }
  else {
    imageURL = "/images/uploads/" + req.file.filename;
  }

  try {
    let params = [pName, des, imageURL, price, productId];
    model.updateProduct(params)

    res.redirect("/admin/update/" + productId);
  } catch (err) {
    console.error("Error update form", err.message);
    next(err);
  }
}

function deleteProduct(req, res, next) {
  let productId = req.params.id;
  try {
    model.deleteProduct(productId);
    res.redirect("/admin/home");
  } catch (err) {
    console.error("Error deleting", err.message);
    next(err);
  }
}


module.exports = {
  home,
  uploadPage,
  uploadProducts,
  updatePage,
  updateProduct,
  deleteProduct,
  newProduct,
  newPage
  // createProduct,
}