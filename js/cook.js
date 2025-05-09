function goToGame() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("gamePage").style.display = "block";
  document.getElementById("cookPage").style.display = "none";
}

function goToHome() {
  document.getElementById("homePage").style.display = "block";
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "none";
}

// Data resep dan langkah
const ingredients = {
  cereal: ["Milk", "Cereal", "Bowl"],
  onigiri: ["Rice", "Seaweed", "Salt"],
  hotdog: ["Bun", "Sausage", "Ketchup"],
  taco: ["Tortilla", "Meat", "Cheese"],
  cookie: ["Flour", "Egg", "Sugar"]
};

const steps = {
  cereal: ["Pour cereal into bowl", "Add milk", "Enjoy!"],
  onigiri: ["Cook rice", "Form triangle", "Wrap with seaweed"],
  hotdog: ["Heat sausage", "Place in bun", "Add ketchup"],
  taco: ["Prepare fillings", "Add to tortilla", "Fold and serve"],
  cookie: ["Mix ingredients", "Bake in oven", "Cool and eat"]
};

let currentRecipe = "";
let droppedItems = [];

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".recipe").forEach(img => {
    img.addEventListener("click", () => {
      const recipe = img.dataset.recipe;
      showCookingPage(recipe);
    });
  });
});

// Show cook page and populate ingredients
function showCookingPage(recipe) {
  currentRecipe = recipe;
  droppedItems = [];
  
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "block";

  const recipeImg = document.getElementById("recipe-img");
  recipeImg.src = `../assets/${recipe}.png`;
  recipeImg.alt = recipe;

  const list = document.getElementById("ingredient-list");
  list.innerHTML = "";
  ingredients[recipe].forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.setAttribute("draggable", "true");
    li.ondragstart = drag;
    list.appendChild(li);
  });

  const dropArea = document.getElementById("drop-area");
  dropArea.innerHTML = "Drop ingredients here";
  dropArea.ondragover = allowDrop;
  dropArea.ondrop = drop;

  const stepContainer = document.getElementById("cooking-steps");
  const stepText = document.getElementById("step-instruction");
  stepContainer.style.display = "none";
  stepText.textContent = "";
}

// Drag and Drop functions
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.textContent);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");

  if (!droppedItems.includes(data)) {
    droppedItems.push(data);
    const node = document.createElement("div");
    node.textContent = data;
    node.className = "dropped-item";
    ev.target.appendChild(node);
  }

  // Cek apakah semua bahan sudah didrop
  const required = ingredients[currentRecipe];
  if (droppedItems.length === required.length &&
      required.every(item => droppedItems.includes(item))) {
    startCookingSteps(currentRecipe);
  }
}

// Mulai langkah memasak
function startCookingSteps(recipe) {
  const stepContainer = document.getElementById("cooking-steps");
  const stepText = document.getElementById("step-instruction");
  const nextButton = document.getElementById("next-step-button");

  let stepIndex = 0;
  stepText.textContent = steps[recipe][stepIndex];
  stepContainer.style.display = "block";
  nextButton.disabled = false;

  nextButton.onclick = () => {
    stepIndex++;
    if (stepIndex < steps[recipe].length) {
      stepText.textContent = steps[recipe][stepIndex];
    } else {
      stepText.textContent = "Done!";
      nextButton.disabled = true;
    }
  };
}
