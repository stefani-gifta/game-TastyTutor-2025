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
 



function showGameArea() {
    const gameBackground = document.getElementById('game-background');
    
    // Hide recipe selection so it doesn't clutter
    document.getElementById('recipe-container').style.display = 'none';
    document.getElementById('start-cooking').style.display = 'none';
  
    // Create new elements for the game UI
    const title = document.createElement('h2');
    title.id = 'recipe-title';
    title.textContent = selectedRecipe.toUpperCase();
  
    const ingredientList = document.createElement('div');
    ingredientList.id = 'ingredient-list';
    ingredientList.classList.add('recipes');
  
    const scoreTimer = document.createElement('div');
    scoreTimer.id = 'score-timer';
    scoreTimer.innerHTML = `
      <div>Score: <span id="score">0</span></div>
      <div>Time: <span id="timer">30</span>s</div>
    `;
  
    const instructions = document.createElement('p');
    instructions.textContent = "Select the correct ingredients!";
  
    // Append new elements
    gameBackground.appendChild(title);
    gameBackground.appendChild(ingredientList);
    gameBackground.appendChild(scoreTimer);
    gameBackground.appendChild(instructions);
  
    // Load ingredients
    allIngredients.forEach(ing => {
      const img = document.createElement("img");
      img.src = `../assets/ingredients/${ing}.png`;
      img.classList.add("recipe");
      img.setAttribute("data-name", ing);
      img.addEventListener("click", () => handleIngredientClick(ing));
      ingredientList.appendChild(img);
    });
  
    // Initialize game
    score = 0;
    timeLeft = 30;
    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timeLeft;
  
    gameInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(gameInterval);
        alert("Time's up! Your score: " + score);
        location.reload(); // restart
      }
    }, 1000);
  }
  