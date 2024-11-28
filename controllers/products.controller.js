"use strict";
const model = require("../models/products.model");

function welcomePage(req, res, next) {
  res.render("home", { title: "C's Hair Store" });
}

function getAll(req, res, next) {
  try {
    let categories = model.getCate();
    let products = model.getProducts();
    res.render("products", { categories: categories, products: products, title: "Products" })
  } catch (err) {
    console.error("Error while getting games ", err.message);
    next(err);
  }
}

async function oneProduct(req, res, next) {
  req.session.returnTo = req.originalUrl;
  try {
    const productId = parseInt(req.params.id);
    const products = model.oneProduct(productId);
    const otherInfo = await getBigDes(productId);

    res.render("details", { products: products, title: "Product Detail", otherInfo: otherInfo, user: req.user });
  } catch (err) {
    console.error("Error while fetching product", err.message);
    next(err);
  }
}

async function getBigDes(id) {
  try {
    let otherInfo = model.getUPC(id);

    const upcUrl = "https://api.upcitemdb.com/prod/trial/lookup?upc=" + otherInfo.upc;

    const response = await fetch(upcUrl);
    if (!response.ok) {
      console.log("not okay");
      throw new Error("Network response was not ok");
    }

    const repoData = await response.json();

    const bigDes = repoData.items[0].description;
    const brand = repoData.items[0].brand;


    return { bigDes, brand };
  } catch (error) {
    console.error("Error fetching description:", error);
    return "Error fetching description.";
  }
}

async function compareProduct(req, res, next) {
  let productId = req.params.id;
  let products = model.oneProduct(productId);
  const competitors = await getCompetitors(productId);

  res.render("price-compare", { title: "title", products: products, competitors: competitors });
}

async function getCompetitors(productId) {
  try {
    let otherInfo = model.getUPC(productId);

    const upcUrl = "https://api.upcitemdb.com/prod/trial/lookup?upc=" + otherInfo.upc;

    const response = await fetch(upcUrl);
    if (!response.ok) {
      console.log("not okay");
      throw new Error("Network response was not ok");
    }

    let compObj = [];
    const repoData = await response.json();
    const items = repoData.items[0];
    for (let i = 0; i < items.images.length; i++) {
      let compImg = items.images[i];
      let compMerchant = items.offers[i].merchant; // Match with the same index
      let compPrice = items.offers[i].price;       // Match with the same index


      // Directly assign to the array
      compObj[i] = {
        image: compImg,
        merchant: compMerchant,
        price: compPrice
      };
    }

    return compObj;

  } catch (error) {
    console.error("Error fetching description:", error);
    return "Error fetching description.";
  }
}


function getOneCate(req, res, next) {
  try {
    let param = req.params.category;
    let category = model.getOneCate(param);
    let products = model.getProducts();
    res.render("category", { category: category, products: products, title: param });
  } catch (err) {
    console.error("Error while getting category", err.message);
    next(err);
  }

}

function getCart(req, res, next) {
  let userId = 1;
  let cart = model.getCart(userId);
  let cartProducts = model.cartProducts(cart.cartId);
  let products = [];
  let total = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    let productId = cartProducts[i].productId;
    let productData = model.oneProduct(productId);
    let quantity = 0;

    if (cartProducts[i].productId == productData.productId) {
      quantity = parseFloat(cartProducts[i].quantity);
      if(quantity==0){
        model.deleteFromCart(cartProducts[i].cartProductId); 
        
      }
    }

    let price = parseFloat(productData.price);

    products[i] = productData;


    let itemPrice = price * quantity;

    total += itemPrice;


  }

  let subTotal = parseFloat(total.toFixed(2));
  res.render("cart.pug", { title: "Cart", products: products, cartProducts: cartProducts, subTotal: subTotal });

}

function removeFromCart(req, res, next) {
  let cartProductId = req.params.id;
  model.deleteFromCart(cartProductId);
  res.redirect("/products/cart/1");
}

function updateQuant(req, res, next) {
  let cartProductId = req.params.id;
  let newQuant = req.body.quantity;

  let params = [newQuant, cartProductId];

  model.updateQuant(params);
  res.redirect("/products/cart/1");

}

function addToCart(req, res, next) {
  let cartId = req.params.cartId;
  let productId = req.params.productId;
  let quantity = 1;

  let params = [cartId, productId, quantity];
  model.addToCart(params);

  res.redirect("/products/all");
}

module.exports = {
  welcomePage,
  getAll,
  oneProduct,
  getOneCate,
  compareProduct,
  getCart,
  removeFromCart,
  updateQuant,
  addToCart
}
