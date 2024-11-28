"use strict";
const express = require("express");
const router = express.Router();

const productController = require("../controllers/products.controller");

router.get("/home",productController.welcomePage)


//http://localhost:3000/products/all
router.get("/all", productController.getAll);

//http://localhost:3000/products/1
router.get("/:id", productController.oneProduct);

//http://localhost:3000/products/compare/1
router.get("/compare/:id", productController.compareProduct);

//http://localhost:3000/products/category/grease
router.get("/category/:category", productController.getOneCate);

router.get("/cart/:userId", productController.getCart);

router.get("/cart/add/:cartId/:productId", productController.addToCart);

//http://localhost:3000/products/cart/remove/1
router.get("/cart/remove/:id", productController.removeFromCart);

router.post("/cart/quant:id", productController.updateQuant);

//http://localhost:3000/products/
// router.post("/cart/:userId/:productId", productController.addToCart);


module.exports = router;