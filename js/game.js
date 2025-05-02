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


let selectedRecipe = null;
let cookingSteps = {
  "hotdog": ["bun", "sausage", "ketchup"],
  "taco": ["tortilla", "lettuce", "tomato", "cheese"]
};
let currentStep = 0;

document.querySelectorAll(".recipe").forEach(item => {
  item.addEventListener("click", () => {
    selectedRecipe = item.getAttribute("src").split("/").pop().split(".")[0];
    document.getElementById("recipe-selection").style.display = "none";
    document.getElementById("ingredient-selection").style.display = "block";
    showNextIngredient();
  });
});

function showNextIngredient() {
  const allIngredients = document.querySelectorAll(".ingredient");
  allIngredients.forEach(i => i.style.display = "none");

  if (currentStep < cookingSteps[selectedRecipe].length) {
    let next = cookingSteps[selectedRecipe][currentStep];
    let el = document.querySelector(`.ingredient[data-name="${next}"]`);
    el.style.display = "inline-block";
    el.classList.remove("selected");
  } else {
    // All steps done!
    alert("Delicious! You completed the recipe! 🎉");
    currentStep = 0;
    selectedRecipe = null;
    document.getElementById("ingredient-selection").style.display = "none";
    document.getElementById("recipe-selection").style.display = "block";
  }
}

document.querySelectorAll(".ingredient").forEach(item => {
  item.addEventListener("click", () => {
    let expected = cookingSteps[selectedRecipe][currentStep];
    if (item.dataset.name === expected) {
      item.classList.add("selected");
      item.style.opacity = 1;
      currentStep++;
      setTimeout(showNextIngredient, 600); // Proceed to next step
    } else {
      alert("Oops! That's not the right step.");
    }
  });
});
