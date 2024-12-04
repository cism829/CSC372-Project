const dropMenu = document.querySelector('.nav-dropdown');
const menuItems = document.getElementById('dropdownH');

const userMenu = document.getElementById('user-info');
const userDrop = document.getElementById('userH');

userMenu.addEventListener("click", () => {
    userDrop.id = "show";
});

document.addEventListener("click", (event) => {
    if (!userMenu.contains(event.target)) {
        userDrop.id = "userH";
    }
});


dropMenu.addEventListener("click", () => {
    if (menuItems.id == "dropdownH") {
        menuItems.id = "dropdown";
    }
    else {
        menuItems.id = "dropdownH";
    }
});

document.addEventListener("click", (event) => {
    if (!dropMenu.contains(event.target)) {
        menuItems.id = "dropdownH";

    }
});








