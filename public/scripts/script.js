const dropMenu = document.querySelector('.nav-dropdown');
const menuItems = document.getElementById('dropdownH');

// Toggle visibility on click
dropMenu.addEventListener("click", () => {
    if (menuItems.id == "dropdownH") {
        menuItems.id = "dropdown";
    }
    else {
        menuItems.id = "dropdownH";
    }
});

// Optional: Close the dropdown if clicked outside
document.addEventListener("click", (event) => {
    if (!dropMenu.contains(event.target)) {
        menuItems.id = "dropdownH";
    }
});


const subBtn = document.querySelectorAll(".submitq");
const removeBtn = document.querySelectorAll(".remove");

for (let index = 0; index < removeBtn.length; index++) {
    const element = removeBtn[index];
    element.addEventListener("click", removeButton);
}

for (let index = 0; index < subBtn.length; index++) {
    const element = subBtn[index];
    element.addEventListener("click", seeQuant);
}


/**
 * Intializes both quatity and price for each item in cart
 * Marks the price and creates text for each 
 * @param {MouseEvent} event 
 */
function seeQuant(event) {
    const cartItem = event.target.closest(".cart-item");
    if (cartItem.dataset.quantity > 1) {
        total();
    }

    let quantity = cartItem.querySelector(".quantity").value * 1;


    if (!quantity || quantity < 1) {
        quantity = cartItem.dataset.quantity;
    }

    console.log(quantity);
    cartItem.dataset.quantity = quantity;

    let itemPrice = (cartItem.querySelector(".price").textContent) * 1;
    cartItem.dataset.price = itemPrice;

    let quant = cartItem.querySelector(".quant");


    let existingQuantity = quant.querySelector('.item-quantity');
    if (existingQuantity) {
        existingQuantity.textContent = "Quantity: " + quantity;
    } else {
        let para = document.createElement("p");
        para.classList.add('item-quantity');
        let paraNode = document.createTextNode("Quantity: " + quantity);
        para.appendChild(paraNode);
        quant.appendChild(para);
    }


    let totalPrice = itemPrice * quantity;


    let existingPrice = quant.querySelector('.item-price');
    if (existingPrice) {
        existingPrice.textContent = "Total: $" + totalPrice.toFixed(2);
    } else {
        let para2 = document.createElement("p");
        para2.classList.add('item-price');
        let paraNode2 = document.createTextNode("Total: $" + totalPrice.toFixed(2));
        para2.appendChild(paraNode2);
        quant.appendChild(para2);
    }

    total();
}

/**
 * Used to calculate and the display the running totals 
 */
function total() {

    const itemElements = document.querySelectorAll(".cart-item");

    let total = 0;

    for (let index = 0; index < itemElements.length; index++) {
        const item = itemElements[index];
        const price = (item.dataset.price * 1) * (item.dataset.quantity * 1);
        total += price;
        console.log("Item total price is: $" + price.toFixed(2));
    }


    grandTotal = (total * 0.0675) + total;


    let totalC = document.querySelector(".total");
    let totalDisplay = totalC.querySelector('.total-price-display');

    if (!totalDisplay) {

        totalDisplay = document.createElement("p");
        totalDisplay.classList.add('total-price-display');
        totalC.appendChild(totalDisplay);
        taxDisplay = document.createElement("p");
        totalC.appendChild(taxDisplay);
        grandTotalDisplay = document.createElement("p");
        totalC.appendChild(grandTotalDisplay);
    }

    console.log("subtotal: " + total);
    totalDisplay.textContent = "SubTotal: $" + total.toFixed(2);
    taxDisplay.textContent = "6.75% Sales Tax";
    grandTotalDisplay.textContent = "Grand Total: $" + grandTotal.toFixed(2);
    console.log("Grand total: $" + grandTotal.toFixed(2));
}

/**
 * Used to delete item from cart
 * @param {MouseEvent} event 
 */
function removeButton(event) {
    const cartItem = event.target.closest(".cart-item");
    cartItem.remove();
    total();
}

function productJson() {

}



