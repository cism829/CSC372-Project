"use strict";
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

//http://localhost:3000/admin/home
router.get("/home",adminController.home);

module.exports = router;