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
