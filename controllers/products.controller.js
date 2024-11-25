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
  try {
    const productId = parseInt(req.params.id);
    const products = model.oneProduct(productId);
    const otherInfo = await getBigDes(productId);

    res.render("details", { products: products, title: "Product Detail", otherInfo: otherInfo });
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

  res.render("price-compare", {title: "title", products: products, competitors: competitors});
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

function getCart(req, res, next){
  let userId = 1;
  let cart =  model.getCart(userId); 
  let cartProducts= model.cartProducts(cart.cartId); 
  let products = [];
  let total=0;
  

  for(let i=0; i<cartProducts.length; i++){
    let productId = cartProducts[i].productId;
    let productData = model.oneProduct(productId);
    let quantity =0;

    if(cartProducts[i].productId == productData.productId){
      quantity = parseFloat(cartProducts[i].quantity);
    }

    let price = parseFloat(productData.price);

    products[i]= productData;

    total += price * quantity;
  }

  console.log(total);
  res.render("cart.pug", {title: "Cart", products: products, cartProducts: cartProducts, total: total});

}

function calcTotal(){

}

module.exports = {
  welcomePage,
  getAll,
  oneProduct,
  getOneCate,
  compareProduct,
  getCart

}
