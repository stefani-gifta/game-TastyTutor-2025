let timerInterval = null; // null to avoid bug when navigating won't stop

let currentRecipe = "";
let droppedItems = [];
const timerSoundTicking = document.getElementById("timer-sound");

function goToGame() {
  clearInterval(timerInterval); // stop the timer if navigating away
  stopTicking();
  document.getElementById("homePage").style.display = "none";
  document.getElementById("gamePage").style.display = "block";
  document.getElementById("cookPage").style.display = "none";
}

function goToHome() {
  clearInterval(timerInterval); // stop the timer if navigating away
  stopTicking();
  document.getElementById("homePage").style.display = "block";
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "none";
}

// Data resep dan langkah
const ingredients = {
  cereal: ["Bowl", "Cereal", "Milk"], // The "cereal first, milk second" approach generally leads to a more controlled and consistent cereal-to-milk ratio
  onigiri: ["Rice", "Salt", "Nori"],
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

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".recipe").forEach(img => {
    img.addEventListener("click", () => {
      const recipe = img.dataset.recipe;
      showCookingPage(recipe);
    });
  });
});

let timeScore = 100, orderScore = 0;

// Show cook page and populate ingredients
function showCookingPage(recipe) {
  clearInterval(timerInterval); // in case it's already running
  score = 100;
  timeLeft = 60;
  document.getElementById("timer").textContent = `${timeLeft}s`;
  currentRecipe = recipe;
  droppedItems = [];
  timerInterval = setInterval(() => {
    timerSoundTicking.play();
    timeLeft--;
    if (timeLeft < 50) {
      timeScore = Math.max(0, Math.floor((timeLeft / 50) * 100));
    }
    document.getElementById("timer").textContent = `${timeLeft}s`;
    
    const timersUpSound = document.getElementById("timers-up-sound");
    if (timeLeft <= 0) {
      stopTicking();
      timersUpSound.play();
      showFailMessage();
      timersUpSound.pause();
      timersUpSound.currentTime = 0;
      clearInterval(timerInterval);
      return;
    }
  }, 1000);
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "block";

  const recipeName = document.getElementById("recipe-title");
  recipeName.textContent = `${recipe}`;

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
    img.textContent = item;
    list.appendChild(img);
  });

  const dropArea = document.getElementById("drop-area");
  dropArea.textContent = "Drop ingredients here as fast as possible in the correct order";
  dropArea.ondragover = allowDrop;
  dropArea.ondrop = drop;
}

function stopTicking() {
  timerSoundTicking.pause();
  timerSoundTicking.currentTime = 0;
  console.log(timerSoundTicking.currentTime);
}

// Drag and Drop functions
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.alt);
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
  const drop_area = document.getElementById("drop-area");

  if (!droppedItems.includes(data)) {
    if (drop_area.textContent.includes("Drop")) {
      drop_area.textContent = "";
    }
    droppedItems.push(data);
    const node = document.createElement("img");
    node.src = `../assets/ingredients_${currentRecipe}/${data.toLowerCase()}.png`;
    node.style.width = "5vw";
    drop_area.appendChild(node);

    const dropSound = document.getElementById("drop-sound");
    dropSound.play();
  }

  // Check if all required ingredients are dropped
  const required = ingredients[currentRecipe];
  console.log(required);
  const allDropped = required.length === droppedItems.length &&
                     required.every(item => droppedItems.includes(item));
                      // required.every((item, index) => item === droppedItems[index]); // in the right order
  console.log(droppedItems);

  if (required.length === droppedItems.length) {
    orderScore = 0;
    required.forEach((item, index) => {
      if (item === droppedItems[index]) {
        orderScore += 1;
      }
    });
  }

  if (allDropped) {
    console.log("dropped");

    console.log("time score: " + timeScore);
    const orderPercentage = orderScore / required.length;
    console.log("order score: " + orderScore);
    score = Math.floor(timeScore * orderPercentage);
    console.log(score);

    const doneBox = document.createElement("div");
    doneBox.id = "done-message-box";

    const message = document.createElement("p");
    message.textContent = `All done! Your score is ${score}`;
    message.style.marginBottom = "10px";

    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.textContent = "Play Again?";
    tryAgainBtn.className = "btn-style-play-again";
    tryAgainBtn.onclick = () => {
      document.getElementById("cookPage").style.display = "none";
      document.getElementById("gamePage").style.display = "block";
      stopTicking();
      clearInterval(timerInterval);
      doneBox.remove(); // clean up
    };

    // reset drop area
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
}

function showFailMessage() {
  const oldBox = document.getElementById("done-message-box");
  if (oldBox) oldBox.remove(); // clean up any existing message

  const failBox = document.createElement("div");
  failBox.id = "done-message-box";

  const message = document.createElement("p");
  message.textContent = `Time's up! You didn't finish in time.`;
  message.style.marginBottom = "20px";

  const tryAgainBtn = document.createElement("button");
  tryAgainBtn.textContent = "Try Again";
  tryAgainBtn.className = "btn-style-play-again";
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
