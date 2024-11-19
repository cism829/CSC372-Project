"use strict";
const express = require("express");
const router = express.Router();

const productController = require("../controllers/products.controller");

router.get("/home",productController.welcomePage)


//http://localhost:3000/products/all
router.get("/all", productController.getAll);

//http://localhost:3000/products/1
router.get("/:id", productController.oneProduct);

//http://localhost:3000/products/category/grease
router.get("/category/:category", productController.getOneCate);



module.exports = router;