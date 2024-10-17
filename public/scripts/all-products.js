const divBody = document.getElementById('message');
const divListCon = document.querySelector('.listing-container');
const searchBar = document.getElementById('search-bar');
let productsData = []; 

/**
 * just a section header and then calls the actual fucntion
 */
function loadProducts() {
    const message = document.createElement('h1');
    message.textContent = "Products Loaded";
    divBody.appendChild(message);
    console.log("Loading products...");

    fetchProducts(); 
}


/**
 * loads all the products from the products.json file
 */
function fetchProducts() {
    const handleResponse = processResponse; 
    const handleError = logError;

    fetch('../products.json')
        .then(handleResponse)   
        .catch(handleError);    
}

/**
 * takes json data and amkes it usable pretty much
 * @param {json} response 
 * @returns 
 */
function processResponse(response) {
    return response.json().then((data) => {
        productsData = data; 
        handleFileLoad(productsData); 
    });
}

/**
 * error message because i kept getting SOOOO many errors
 * @param {error} error 
 */
function logError(error) {
    console.error('Error loading the JSON file:', error);
}

/**
 * makes the product listing containers and fills them respectively
 * @param {json} jsonData 
 */
function handleFileLoad(jsonData) {
    console.log("Products file loaded successfully.");

    divListCon.innerHTML = ''; 

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

        const adminBtn = document.createElement('div');
        adminBtn.classList.add("adminBtn");
        listing.appendChild(adminBtn);

        const deleteProd = document.createElement('button');
        deleteProd.textContent = "Delete";
        const editProd = document.createElement('button');
        editProd.textContent = "Edit";const editLink = document.createElement('a');
        editLink.href = "products/"+product.id; 
        const archiveProd = document.createElement('button');
        archiveProd.textContent = "Archive";

        adminBtn.appendChild(editLink);
        editLink.appendChild(editProd);
        adminBtn.appendChild(archiveProd);
        adminBtn.appendChild(deleteProd);
        


        //<a href="admin-upload">Upload Products</a>
    }
}
searchBar.addEventListener('input', filter);

/**
 * filters the search 
 * alot easier than i thought 
 */
function filter() {
    const search = searchBar.value.toLowerCase(); 
    const filteredProducts = productsData.filter(product => {
        return product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search);
    });
    
    handleFileLoad(filteredProducts); 
}




window.onload = function () {
    console.log("Page loaded, loading products...");
    loadProducts();
}
