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
 



const recipes = {
    cereal: ["milk", "cereal"],
    onigiri: ["rice", "nori", "salmon"],
    hotdog: ["bread", "sausage", "lettuce", "tomato"],
    taco: ["tortilla", "beef", "cheese"],
    cookie: ["flour", "sugar", "egg", "chocolate"]
  };
  
  const allIngredients = [
    "milk", "cereal", "rice", "nori", "salmon",
    "bread", "sausage", "lettuce", "tomato",
    "tortilla", "beef", "cheese",
    "flour", "sugar", "egg", "chocolate"
  ];
  
  let selectedRecipe = null;
  let score = 0;
  let timeLeft = 30;
  let gameInterval = null;
  
  // Recipe selection logic
  const recipeImages = document.querySelectorAll('.recipe');
  recipeImages.forEach(img => {
    img.addEventListener('click', () => {
      recipeImages.forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
      selectedRecipe = img.getAttribute('data-name');
    });
  });
  
  document.getElementById('start-cooking').addEventListener('click', () => {
    if (!selectedRecipe) {
      alert('Please select a recipe first!');
      return;
    }
  
    // Show game area
    showGameArea();
  });
  
  function showGameArea() {
    document.getElementById('game-background').innerHTML = `
      <h2 id="recipe-title">${selectedRecipe.toUpperCase()}</h2>
      <div id="ingredient-list" class="recipes"></div>
      <div id="score-timer">
        <div>Score: <span id="score">0</span></div>
        <div>Time: <span id="timer">30</span>s</div>
      </div>
      <p>Select the correct ingredients!</p>
    `;
  
    // Show all ingredients
    const ingredientList = document.getElementById("ingredient-list");
    allIngredients.forEach(ing => {
      const img = document.createElement("img");
      img.src = `../assets/ingredients/${ing}.png`;
      img.classList.add("recipe");
      img.setAttribute("data-name", ing);
      img.addEventListener("click", () => handleIngredientClick(ing));
      ingredientList.appendChild(img);
    });
  
    score = 0;
    timeLeft = 30;
    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timeLeft;
  
    // Start timer
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
  
  function handleIngredientClick(name) {
    if (!selectedRecipe) return;
    const correctIngredients = recipes[selectedRecipe];
    if (correctIngredients.includes(name)) {
      score += 10;
    } else {
      score -= 5;
    }
    document.getElementById("score").textContent = score;
  }
  