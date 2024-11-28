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







