document.getElementById("create-account-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("account-form").style.display = "none";
    document.getElementById("ingredient-selection").style.display = "block";
    // console.log("Hello world");
});

const recipe = document.getElementsByClassName("recipe");
for (let i = 0; i < recipe.length; i++) {
    recipe[i].addEventListener("click", function () {
        document.querySelectorAll(".recipe").forEach(item => {
            item.style.transform = "scale(1)";
            item.style.opacity = "0.7";
        });
        if(recipe[i].style.transform == "scale(1.2)") {
            recipe[i].style.transform = "scale(1)";
            recipe[i].style.opacity = "0.7";
        } else {
            recipe[i].style.transform = "scale(1.2)";
            recipe[i].style.opacity = "1";
            recipe[i].style.transition = "transform 0.3s ease";
        }
    });
}
 

document.getElementById("create-account-form").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("account-form").style.display = "none";
    document.getElementById("recipe-selection").style.display = "block";
});

// Select all recipes
const recipes = document.querySelectorAll(".recipe");
let selectedRecipe = null;

// Create Start Cooking button
const startButton = document.createElement("button");
startButton.textContent = "Start Cooking";
startButton.classList.add("start-button");
startButton.style.marginTop = "10px";

// Start cooking event
startButton.addEventListener("click", () => {
    if (selectedRecipe) {
        document.getElementById("recipe-selection").style.display = "none";
        showGameArea(selectedRecipe);
    }
});

// Recipe selection behavior
recipes.forEach(recipe => {
    recipe.addEventListener("click", () => {
        // Reset all recipes
        recipes.forEach(r => {
            r.style.transform = "scale(1)";
            r.style.opacity = "0.7";
            const parent = r.parentElement;
            const existingBtn = parent.querySelector(".start-button");
            if (existingBtn) existingBtn.remove();
        });

        // Highlight selected
        recipe.style.transform = "scale(1.2)";
        recipe.style.opacity = "1";
        recipe.style.transition = "transform 0.3s ease";

        // Save selected recipe name
        selectedRecipe = recipe.dataset.name;

        // Append Start Cooking button below selected recipe
        recipe.parentElement.appendChild(startButton);
    });
});

// Show the cooking area
function showGameArea(recipeName) {
    // Create or reuse game area container
    let gameArea = document.getElementById("game-area");
    if (!gameArea) {
        gameArea = document.createElement("div");
        gameArea.id = "game-area";
        gameArea.style.padding = "20px";
        gameArea.style.textAlign = "center";
        document.getElementById("game-background").appendChild(gameArea);
    }

    // Clear and load content
    gameArea.innerHTML = `
        <h2>Let's Cook: ${recipeName}</h2>
        <p>Step-by-step instructions will go here for <strong>${recipeName}</strong>.</p>
        <button onclick="location.reload()">Back to Menu</button>
    `;
}
  