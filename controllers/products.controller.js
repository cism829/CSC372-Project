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
      let compMerchant = items.offers[i].merchant; 
      let compPrice = items.offers[i].price;       


      
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
  console.log("getCart");
  let googleId = req.params.userId;
  console.log(googleId);
  let myId = model.getUserbyGoo(googleId);

  let userId = myId[0].userId;
  console.log(userId);
  let cart = model.getCart(userId);
  console.log(cart);
  let cartProducts = model.cartProducts(cart.cartId);
  let products = [];
  let total = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    let productId = cartProducts[i].productId;
    let productData = model.oneProduct(productId);
    let quantity = 0;

    if (cartProducts[i].productId == productData.productId) {
      quantity = parseFloat(cartProducts[i].quantity);
      if (quantity == 0) {
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
  let cartId = model.getBycpId(cartProductId);
  let userId = model.getbycId(cartId.cartId);
  let googleId = model.getGoobyUser(userId.userId);
  console.log(googleId.google_id);
  model.deleteFromCart(cartProductId);
  console.log("redirect");
  res.redirect("/products/cart/" + googleId.google_id);
}

function updateQuant(req, res, next) {
  let cartProductId = req.params.id;
  let newQuant = req.body.quantity;

  let params = [newQuant, cartProductId];
  let cartId = model.getBycpId(cartProductId);
  let userId = model.getbycId(cartId.cartId);
  let googleId = model.getGoobyUser(userId.userId);
  console.log(googleId.google_id);

  model.updateQuant(params);
  res.redirect("/products/cart/" + googleId.google_id);

}

function addToCart(req, res, next) {
  let googleId = req.params.userId;
  console.log(googleId);
  let userId = model.getUserbyGoo(googleId);
  console.log(userId[0].userId);
  let cartId = model.getCart(userId[0].userId);
  console.log(cartId.cartId);
  let productId = req.params.productId;
  let quantity = 1;

  let params = [cartId.cartId, productId, quantity];
  console.log(params);
  model.addToCart(params);

  res.redirect("/products/all");
}

function checkout(req, res, next) {
  console.log("start checkout");
  let googleId = req.params.id;
  console.log(googleId);
  console.log("getting user id");
  let userId = model.getUserbyGoo(googleId);
  console.log(userId[0].userId);
  userId = userId[0].userId;
  console.log(userId);
  console.log("getting cart id");
  let cartId = model.getCart(userId);
  console.log(cartId.cartId);
  cartId = cartId.cartId;
  console.log("pause");
  console.log(cartId)
  let cartItems = model.cartProducts(cartId);

  console.log("items in cart");
  console.log(cartItems);
  let params = [];

  console.log("start inserting")
  for (let i = 0; i < cartItems.length; i++) {
    console.log((i + 1)); console.log(cartItems[i]);

    let quantity = parseInt(cartItems[i].quantity);
    console.log("q= " + quantity);

    let productId = cartItems[i].productId;
    console.log("pid= " + productId);

    let product = model.oneProduct(productId);
    console.log(product);
    let price = parseFloat(product.price);
    console.log("price: " + price);

    let totalPrice = price * quantity;
    console.log(totalPrice);

    params = [userId, productId, quantity, totalPrice];
    console.log(params);
    model.makeOrders(params);
    console.log("inserted product: " + (i + 1));
  }

  console.log("end inserted");
  console.log("end checkout");
  res.redirect("/products/all");
}

function getOrder(req, res, next) {
  let googleId = req.params.googleId;
  let userId = model.getUserbyGoo(googleId);
  
  userId = userId[0].userId;

  let orders = model.getOrder(userId);

  let items=[];
  let total =0;
  console.log("order extraction")
  for(let i=0; i<orders.length;i++){
    
    let id= orders[i].userId;
    let quantity = orders[i].quantity;
    let product = model.oneProduct(orders[i].productId);
    let name = product.pName;
    let price = orders[i].totalPrice;
    let image = product.imageURL;

    total += price;
    let info = {id, name, image, price, quantity};

    items[i] = info;
  }
let grandTotal = total.toFixed(2);
  console.log(grandTotal);
  console.log(items);

  
  console.log("rendering");
  res.render("orders", { title: "Orders", items: items, grandTotal: grandTotal});
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
  addToCart,
  checkout,
  getOrder
}
