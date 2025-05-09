function goToGame() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("gamePage").style.display = "block";
  document.getElementById("cookPage").style.display = "none";
  clearInterval(timerInterval); // stop the timer if navigating away
}

function goToHome() {
  document.getElementById("homePage").style.display = "block";
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "none";
  clearInterval(timerInterval); // stop the timer if navigating away
}

// Data resep dan langkah
const ingredients = {
  cereal: ["Milk", "Cereal", "Bowl"],
  onigiri: ["Rice", "Nori", "Salt"],
  hotdog: ["Bun", "Sausage", "Ketchup"],
  taco: ["Tortilla", "Meat", "Cheese"],
  cookie: ["Flour", "Egg", "Sugar"]
};

// const steps = {
//   cereal: ["Pour cereal into bowl", "Add milk", "Enjoy!"],
//   onigiri: ["Cook rice", "Form triangle", "Wrap with seaweed"],
//   hotdog: ["Heat sausage", "Place in bun", "Add ketchup"],
//   taco: ["Prepare fillings", "Add to tortilla", "Fold and serve"],
//   cookie: ["Mix ingredients", "Bake in oven", "Cool and eat"]
// };

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
  clearInterval(timerInterval); // in case it's already running
  score = 100;
  timeLeft = 60;
  document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
  currentRecipe = recipe;
  droppedItems = [];
    timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft < 50) {
      score = Math.max(0, Math.floor((timeLeft / 50) * 100));
    }
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showFailMessage();
    }
  }, 1000);
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "block";

  const recipeImg = document.getElementById("recipe-img");
  recipeImg.src = `../assets/${recipe}.png`;
  recipeImg.alt = recipe;

  const list = document.getElementById("ingredient-list");
  list.innerHTML = "";
  ingredients[recipe].forEach((item, index) => {
    const img = document.createElement("img");
    img.src = `../assets/ingredients_${recipe}/${item.toLowerCase()}.png`;
    img.alt = item;
    img.id = `ingredient-${index}`;
    img.draggable = true;
    img.ondragstart = drag;
    img.style.width = "50px";
    img.style.margin = "10px";
    img.textContent = item;
    list.appendChild(img);
  });

  const dropArea = document.getElementById("drop-area");
  dropArea.innerHTML = "Drop ingredients here as fast as possible in the correct order";
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
  ev.dataTransfer.setData("text", ev.target.src);
  ev.dataTransfer.setData("ingredient-name", ev.target.alt);

  const dragSound = document.getElementById("drag-sound");
  if (dragSound) {
    dragSound.currentTime = 0;
    dragSound.play();
  }
}

// Mulai langkah memasak
// function startCookingSteps(recipe) {
//   const stepContainer = document.getElementById("cooking-steps");
//   const stepText = document.getElementById("step-instruction");
//   const nextButton = document.getElementById("next-step-button");

//   let stepIndex = 0;
//   stepText.textContent = steps[recipe][stepIndex];
//   stepContainer.style.display = "block";
//   nextButton.disabled = false;

//   nextButton.onclick = () => {
//     stepIndex++;
//     if (stepIndex < steps[recipe].length) {
//       stepText.textContent = steps[recipe][stepIndex];
//     } else {
//       stepText.textContent = "Done!";
//       nextButton.disabled = true;
//     }
//   };
// }
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");

  if (!droppedItems.includes(data)) {
    droppedItems.push(data);
    const node = document.createElement("div");
    node.textContent = data;
    node.className = "dropped-item";
    ev.target.appendChild(node);

    // Optional sound
    const dropSound = document.getElementById("drop-sound");
    if (dropSound) dropSound.play();
  }

  // Check if all required ingredients are dropped
  const required = ingredients[currentRecipe];
  const allDropped = required.length === droppedItems.length &&
                     required.every(item => droppedItems.includes(item));

  if (allDropped) {
  const stepContainer = document.getElementById("cooking-steps");
  const stepText = document.getElementById("step-instruction");

  stepContainer.style.display = "none";
  stepText.textContent = "";

  const doneBox = document.createElement("div");
  doneBox.id = "done-message-box";

  const message = document.createElement("div");
  message.textContent = `All done! Your score is ${score}`;
  message.style.marginBottom = "20px";

  const tryAgainBtn = document.createElement("button");
  tryAgainBtn.textContent = "Play Again?";
  tryAgainBtn.className = "btn-style701";
  tryAgainBtn.onclick = () => {
    document.getElementById("cookPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
    doneBox.remove(); // clean up
  };

  doneBox.appendChild(message);
  doneBox.appendChild(tryAgainBtn);
  document.body.appendChild(doneBox);
  }


}
const oldBox = document.getElementById("done-message-box");
if (oldBox) oldBox.remove();

function showDoneMessage() {
  const doneBox = document.createElement("div");
  doneBox.id = "done-message-box";

  const message = document.createElement("div");
  message.textContent = `All done! Your score is ${score}`;
  message.style.marginBottom = "20px";

  const tryAgainBtn = document.createElement("button");
  tryAgainBtn.textContent = "Try Again";
  tryAgainBtn.className = "btn-style701";
  tryAgainBtn.onclick = () => {
    document.getElementById("cookPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
    doneBox.remove(); // clean up
  };

  doneBox.appendChild(message);
  doneBox.appendChild(tryAgainBtn);
  document.body.appendChild(doneBox);

  // Center the message box
  doneBox.style.position = "absolute";
  doneBox.style.top = "50%";
  doneBox.style.left = "50%";
  doneBox.style.transform = "translate(-50%, -50%)";
  doneBox.style.backgroundColor = "#fff";
  doneBox.style.padding = "20px";
  doneBox.style.borderRadius = "8px";
  doneBox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
}

function showFailMessage() {
  const oldBox = document.getElementById("done-message-box");
  if (oldBox) oldBox.remove(); // clean up any existing message

  const failBox = document.createElement("div");
  failBox.id = "done-message-box";

  const message = document.createElement("div");
  message.textContent = `Time's up! You didn't finish in time.`;
  message.style.marginBottom = "20px";

  const tryAgainBtn = document.createElement("button");
  tryAgainBtn.textContent = "Try Again";
  tryAgainBtn.className = "btn-style701";
  tryAgainBtn.onclick = () => {
    document.getElementById("cookPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
    failBox.remove(); // clean up
  };

  failBox.appendChild(message);
  failBox.appendChild(tryAgainBtn);
  document.body.appendChild(failBox);

  // Center the message box
  failBox.style.position = "absolute";
  failBox.style.top = "50%";
  failBox.style.left = "50%";
  failBox.style.transform = "translate(-50%, -50%)";
  failBox.style.backgroundColor = "#fff";
  failBox.style.padding = "20px";
  failBox.style.borderRadius = "8px";
  failBox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
}
