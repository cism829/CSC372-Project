const fileForm = document.getElementById('sub');
const myFile = document.getElementById('myfile');
const divBody = document.getElementById('message');
const divCon = document.querySelector('.container');
const divListCon = document.querySelector('.listing-container');
const listCon = document.querySelector('.listing');
const example = document.getElementById('example');

// example.addEventListener("click", picEnlarge);
// example.addEventListener("dblclick", picSmall);

let idCount = 1;

console.log("hello");

fileForm.addEventListener("submit", viewFile);

/**
 * reads the json file anf accepts if it is it goes to the next function
 * @param {SubmitEvent} e 
 */
function viewFile(e) {
    e.preventDefault();
    divListCon.innerHTML = '';
    divBody.innerHTML = '';

    const message = document.createElement('h1');
    message.textContent = "Products Uploaded";
    divBody.appendChild(message);
    console.log("1");

    if (myFile.files.length > 0) {
        const file = myFile.files[0];

        const reader = new FileReader();
        reader.onload = handleFileLoad;
        console.log("2");

        if (file.type === "application/json") {
            reader.readAsText(file);
        } else {
            console.log("Please enter a json file.");
        }
    } else {
        console.log("No file selected, please choose a file ");
    }

    console.log("end of function");
}

/**
 * takes the accepted json file and displays the products within the file 
 * @param {SubmitEvent} event 
 */
function handleFileLoad(event) {
    console.log("3");

    try {
        const jsonData = JSON.parse(event.target.result);



        for (let i = 0; i < jsonData.length; i++) {
            const product = jsonData[i];

            const listing = document.createElement('div');
            listing.classList.add("listing");
            listing.id = "product" + i;



            const header = document.createElement('div');
            header.classList.add("header");

            const title = document.createElement('h1');
            title.textContent = product.name;

            const image = document.createElement('img');
            image.src = product.image;
            image.alt = "image would go here";

            const info = document.createElement('div');
            info.classList.add("info");

            const des = document.createElement('p');
            des.textContent = product.description;

            const price = document.createElement('p');
            price.textContent = "$" + product.price;

            const category = document.createElement('p');
            category.textContent = product.category;

            divListCon.appendChild(listing);

            listing.appendChild(header);
            header.appendChild(image);
            header.appendChild(title);

            listing.appendChild(info);

            info.appendChild(des);
            info.appendChild(price);
            info.appendChild(category);
            idCount++;



        }
        uploadProductsJson(jsonData);

    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
}


/**
 * puts the newly formed products into the products.json file as a form of data persistence 
 * couldnt really figure out how to stop duplicates in time
 * @param {json} products 
 */
function uploadProductsJson(products) {
    fetch('/products/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(products)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Products added successfully:', data);
        })
        .catch(error => {
            console.error('Error uploading products:', error);
        });
}