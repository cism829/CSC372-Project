"use strict";
const express = require("express");
const router = express.Router();

const productController = require("../controllers/products.controller");

router.get("/home",productController.welcomePage)
//http://localhost:3000/products/all
router.get("/all", productController.getAll);

// //http://localhost:3000/games?attribute=platform&value=Wii
// router.get("/", gamesController.getAllByOneAttribute);

// //http://localhost:3000/games/5
// router.get("/:id", gamesController.getOneById);

// //http://localhost:3000/games/new
// router.post("/new", gamesController.createNew);

module.exports = router;