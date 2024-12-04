"use strict";
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

const path = require("path");
const fs = require("fs");
const multer = require("multer");


const uploadPath = path.join("./public/images/uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });



const jsonStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./json-uploads");  
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  
    },
  });


  
  const uploadJson = multer({
    storage: jsonStorage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== "application/json") {
        return cb(new Error("Only JSON files are allowed"));
      }
      cb(null, true);
    },
  }).single("myFile");

//http://localhost:3000/admin/home
router.get("/home", adminController.home);

//http://localhost:3000/admin/upload
router.get("/upload", adminController.uploadPage);

router.post("/upload", uploadJson, adminController.uploadProducts);

//http://localhost:3000/admin/update
router.get("/update/:id", adminController.updatePage);

// Handle the form submission for file upload
router.post("/update/:id", upload.single("imageURL"), adminController.updateProduct);

router.get("/delete/:id", adminController.deleteProduct);

module.exports = router;
