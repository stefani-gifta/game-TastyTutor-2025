document.getElementById("create-account-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("account-form").style.display = "none";
    document.getElementById("ingredient-selection").style.display = "block";
    console.log("Hello world");
});