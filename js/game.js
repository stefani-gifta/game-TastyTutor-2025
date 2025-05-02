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
let correctIngredients = {
  "hotdog": ["bun", "sausage"],
  "taco": ["lettuce", "tomato"],
  // Add more recipe-ingredient mappings
};

document.getElementById("start-cooking").addEventListener("click", function () {
  document.getElementById("recipe-selection").style.display = "none";
  document.getElementById("ingredient-selection").style.display = "block";
});

document.querySelectorAll(".recipe").forEach((item, index) => {
  item.addEventListener("click", () => {
    selectedRecipe = item.getAttribute("src").split("/").pop().split(".")[0]; // Get "hotdog", etc.
    document.querySelectorAll(".recipe").forEach(r => {
      r.style.transform = "scale(1)";
      r.style.opacity = "0.7";
    });
    item.style.transform = "scale(1.2)";
    item.style.opacity = "1";
  });
});

document.querySelectorAll(".ingredient").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("selected");
  });
});

document.getElementById("start-game-btn").addEventListener("click", () => {
  let selected = [...document.querySelectorAll(".ingredient.selected")]
    .map(i => i.dataset.name);
  let correct = correctIngredients[selectedRecipe] || [];

  let score = selected.filter(i => correct.includes(i)).length;
  alert(`You got ${score} out of ${correct.length} correct!`);
});
