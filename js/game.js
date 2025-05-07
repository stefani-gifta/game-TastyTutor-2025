const recipes = document.querySelectorAll(".recipe");
recipes.forEach(item => {
  item.addEventListener("click", () => {
    // If the item is already active, remove the 'active' class
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      // Remove 'active' class from all other items
      recipes.forEach(el => el.classList.remove("active"));
      // Add 'active' class to the clicked item
      item.classList.add("active");
    }
  });
});

// Enhanced Cooking Game with Scoring and Timer

// Global variables for score and time
let score = 0;
let timeLeft = 60;
let timer;

// DOM elements
const scoreElement = document.createElement('div');
const timerElement = document.createElement('div');

// Initialize the game
function initializeGame() {
  scoreElement.id = 'score';
  timerElement.id = 'timer';
  scoreElement.textContent = `Score: ${score}`;
  timerElement.textContent = `Time: ${timeLeft}s`;
  document.getElementById('cook-container').appendChild(scoreElement);
  document.getElementById('cook-container').appendChild(timerElement);
  startTimer();
}

// Start the game when a recipe is selected
function startGame(recipe) {
  localStorage.setItem('selectedRecipe', recipe);
  goToCook();
  initializeGame();
}

// Timer function
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = `Time: ${timeLeft}s`;
    } else {
      endGame();
    }
  }, 1000);
}

// End game
function endGame() {
  clearInterval(timer);
  alert(`Time's up! Your score: ${score}`);
  goToHome();
}

// Increase score (called when a cooking step is done correctly)
function increaseScore(points) {
  score += points;
  scoreElement.textContent = `Score: ${score}`;
}

// Hook to recipe selection
const recipes = document.querySelectorAll('.recipe');
recipes.forEach(item => {
  item.addEventListener('click', () => {
    const recipe = item.src.split('/').pop().split('.').shift();
    startGame(recipe);
  });
});
