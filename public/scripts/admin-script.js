const openEdit = document.getElementById('edit-open');
const editForm = document.getElementById('hidden');
const closeEdit = document.getElementById('close-edit');

apiUrl = "https://api.upcitemdb.com/prod/trial/lookup?upc=854102006732";

openEdit.addEventListener("click", (event) =>{
    editForm.id = "change";
    getRepo(apiUrl);
});

closeEdit.addEventListener("click", (event) =>{
    event.preventDefault();
    editForm.id = "hidden";
});


function getRepo(apiUrl) {
    console.log("repo method")
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                console.log("not okay");
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((repoData) => {

            let bigDes = repoData.items.description;
            return bigDes
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function repoExtract(repoData) {
    console.log(repoData); 
    if (repoData.items && repoData.items.length > 0) {
        let item = repoData.items[0]; // Access the first item
        if (item.offers && item.offers.length > 0) {
            let comPrice = item.offers[0].price; // Access the price of the first offer
            console.log("Walmart Price = " + comPrice);
        } else {
            console.log("No offers available for this item.");
        }
    } else {
        console.log("No items found in the response.");
    }
}
