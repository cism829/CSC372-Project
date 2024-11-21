"use strict";
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));


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
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  fs.readFile(req.file.path, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the uploaded file.");
    }

    try {
      const json = JSON.parse(data);

      // Create an array of promises for all the insert operations
      let insertPromises = [];

      for (let i = 0; i < json.length; i++) {
        let product = json[i];

        let params = [product.name, product.description, product.image, product.price, product.category];
        console.log("the params are:", params);

        // Add each database insert operation as a Promise to the array
        let insertPromise = model.createNew(params);
        insertPromises.push(insertPromise);
      }

      
      Promise.all(insertPromises)
        .then(() => {
          console.log("All products inserted successfully.");
          res.redirect("/admin/upload"); 
        })
        .catch((err) => {
          console.error("Error during product insertion:", err);
          res.redirect("/admin/upload");         
        });

    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return res.status(400).send("Invalid JSON format.");
    }
  });
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
  deleteProduct
  // createProduct,
}