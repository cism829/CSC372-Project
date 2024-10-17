"use strict";
const express = require("express");
const path = require('path');
const fs = require("fs"); 
const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for multipart/form-data
const multer = require("multer");
app.use(multer().none());

const productsFilePath = path.join(__dirname, 'public', 'products.json'); 

let products = [];
try {
    const data = fs.readFileSync(productsFilePath, "utf-8"); 
    products = JSON.parse(data); // Parse the JSON data
} catch (err) {
    console.error("Error reading products.json:", err);
}

// POST requests
app.post("/", function (request, response) {
    response.send(request.body);
});


app.post("/products/new", (request, response) => {
    const newProducts = request.body; 
    if (!Array.isArray(newProducts)) {
        return response.status(400).json({ error: "Invalid data format. Expecting an array of products." });
    }

    products = [...products, ...newProducts];

    const updatedProducts = JSON.stringify(products, null, 2);

    fs.writeFile(productsFilePath, updatedProducts, (err) => {
        if (err) {
            console.error("Error writing to products.json:", err);
            return response.status(500).json({ error: "Failed to save products." });
        }
        console.log("Successfully wrote products to products.json");
        response.json({ message: "Products uploaded successfully!", products });
    });
});

app.put('/products/:id', (request, response) => {
    const productId = request.params.id;
    const updatedProduct = request.body;

    const productIndex = products.findIndex(product => product.id == productId);

    if (productIndex === -1) {
        return response.status(404).send("Product not found.");
    }

    products[productIndex] = updatedProduct;

    fs.writeFile('./products.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return response.status(500).send("Failed to update product.");
        }
        response.json(updatedProduct);
    });
});


// GET all products
app.get("/products/all", (request, response) => {
    response.json(products);
});

// GET a product by id
app.get("/products/:id", (request, response) => {
    const productId = Number(request.params.id);
    const getProduct = products.find((product) => product.id == productId); 
    if (!getProduct) {
        response.status(500).send("Product not found.");
    } else {
        response.json(getProduct);
    }
});

// GET products by type (category)
app.get("/products", (request, response) => {
    const type = request.query.type;
    if (!type) {
        response.json(products);
    } else {
        const prodList = products.filter(product => product.category.toLowerCase().includes(type.toLowerCase()));
        if (prodList.length === 0) {
            response.status(500).send("Product not found.");
        } else {
            response.json(prodList);
        }
    }
});

// Admin pages
app.get('/admin-products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin/admin-products.html'));
});

app.get('/admin-upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin/admin-upload.html'));
});

// Endpoint to fetch products.json
app.get('/products.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.json'));
});

// Root route
app.get("/", function (req, res) {
    res.send("Hello, World from Express!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('App listening on port: ' + PORT + "!");
});
