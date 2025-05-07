const recipeName = localStorage.getItem("selectedRecipe");
const img = document.getElementById("recipe-img");
const list = document.getElementById("ingredient-list");
const stepBox = document.getElementById("step-instruction");
const stepButton = document.getElementById("next-step-button");
const stepContainer = document.getElementById("cooking-steps");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
let score = 0;

// Data resep
const ingredientsMap = {
  cereal: ["Cereal", "Milk", "Bowl", "Spoon"],
  onigiri: ["Rice", "Seaweed", "Salt", "Filling"],
  hotdog: ["Hotdog bun", "Sausage", "Ketchup", "Mustard"],
  taco: ["Taco shell", "Meat", "Lettuce", "Cheese"],
  cookie: ["Flour", "Eggs", "Sugar", "Chocolate chips"]
};

const stepsMap = {
  cereal: [
    "Pour cereal into the bowl.",
    "Add milk.",
    "Grab a spoon.",
    "Enjoy your cereal!"
  ],
  onigiri: [
    "Shape the rice into triangle.",
    "Add filling inside.",
    "Wrap with seaweed.",
    "Sprinkle some salt."
  ],
  hotdog: [
    "Grill the sausage.",
    "Put sausage into the bun.",
    "Add ketchup and mustard.",
    "Serve it hot!"
  ],
  taco: [
    "Heat the taco shell.",
    "Add meat and lettuce.",
    "Top with cheese.",
    "Fold and enjoy!"
  ],
  cookie: [
    "Mix flour, eggs, and sugar.",
    "Add chocolate chips.",
    "Bake in the oven.",
    "Take out and cool down."
  ]
};

// Display ingredients
if (recipeName) {
  img.src = `../assets/${recipeName}.png`;
  img.alt = `${recipeName} image`;
  const ingredients = ingredientsMap[recipeName] || [];
  ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

// Game logic
let stepIndex = 0;
let currentSteps = stepsMap[recipeName] || [];

function startCookingGame() {
  stepContainer.style.display = "block";
  stepIndex = 0;
  stepBox.textContent = currentSteps[stepIndex];
  stepButton.textContent = "Next";
  stepIndex++;
  startTimer(); 
  increaseScore(5); 
}

stepButton.addEventListener("click", () => {
  if (stepIndex < currentSteps.length) {
    stepBox.textContent = currentSteps[stepIndex];
    increaseScore(10); 
    stepIndex++;
    if (stepIndex === currentSteps.length) {
      stepButton.textContent = "Finish";
    }
  } else {
    endGame();  
  }
});

function increaseScore(points) {
  score += points;
  scoreElement.textContent = `Score: ${score}`;
}

function startTimer() {
  let timer = 60; 
  const interval = setInterval(() => {
    timer--;
    timerElement.textContent = `Time: ${timer}s`;
    if (timer <= 0) {
      clearInterval(interval);
      endGame(); 
    }
  }, 1000);
}

function endGame() {
  stepContainer.style.display = "none";
  alert(`Game Over! Your score is: ${score}`);
  goToGame(); 
}

window.addEventListener("DOMContentLoaded", startCookingGame);
