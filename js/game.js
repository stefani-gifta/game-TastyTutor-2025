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
 

  

// Create a single reusable "Start Cooking" button
const startButton = document.createElement("button");
startButton.textContent = "Start Cooking";
startButton.classList.add("start-button");
startButton.style.marginTop = "10px";
startButton.addEventListener("click", function () {
    if (selectedRecipe) {
        showGameArea(selectedRecipe);
    }
});

for (let i = 0; i < recipeElements.length; i++) {
    recipeElements[i].addEventListener("click", function () {
        // Reset styles for all recipes
        Array.from(recipeElements).forEach(item => {
            item.style.transform = "scale(1)";
            item.style.opacity = "0.7";
            // Remove any existing start buttons
            const siblingButton = item.nextElementSibling;
            if (siblingButton && siblingButton.classList.contains("start-button")) {
                siblingButton.remove();
            }
        });

        // Apply selected style
        const recipe = recipeElements[i];
        recipe.style.transform = "scale(1.2)";
        recipe.style.opacity = "1";
        recipe.style.transition = "transform 0.3s ease";

        // Set selected recipe name from data attribute or alt
        selectedRecipe = recipe.getAttribute("data-name") || recipe.alt;

        // Insert the start button right after the selected recipe
        recipe.parentNode.insertBefore(startButton, recipe.nextSibling);
    });
}