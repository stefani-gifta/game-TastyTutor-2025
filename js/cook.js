// cook.js (final fix: character image src path + starter character shown)

let timerInterval = null;
let currentRecipe = "";
let droppedItems = [];
let timeScore = 70, orderScore = 0, score = 100;
let timeLeft = 60;

const timerSoundTicking = document.getElementById("timer-sound");
const timersUpSound = document.getElementById("timers-up-sound");
const victorySound = document.getElementById("victory-sound");
const drop_area = document.getElementById("drop-area");

const emojiMap = {
  cookie: ['🍪'],
  onigiri: ['🍙'],
  cereal: ['🥣'],
  hotdog: ['🌭'],
  taco: ['🌮']
};

function emojiConfetti(emojis) {
  const count = 30;
  for (let i = 0; i < count; i++) {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const isLeft = i < count / 2;
    emoji.style.left = isLeft ? '0' : '95vw';
    emoji.style.bottom = '0';
    const angle = (isLeft ? 1 : -1) * (30 + Math.random() * 40);
    const distance = 300 + Math.random() * 100;
    const rotate = isLeft ? (0 + Math.random(5)) : (180 + Math.random(5));
    emoji.style.setProperty('--angle', angle + 'deg');
    emoji.style.setProperty('--distance', distance + 'px');
    emoji.style.setProperty('--spin', rotate + 'deg');
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 2000);
  }
}

function emojiConfettiByMode(mode) {
  const emojis = [...(emojiMap[mode] || []), '🎉'];
  emojiConfetti(emojis);
}

function goToGame() {
  clearInterval(timerInterval);
  stopTicking();
  document.getElementById("homePage").style.display = "none";
  document.getElementById("gamePage").style.display = "block";
  document.getElementById("cookPage").style.display = "none";
}

function goToHome() {
  clearInterval(timerInterval);
  stopTicking();
  document.getElementById("homePage").style.display = "block";
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "none";
}

const ingredients = {
  cereal: ["Bowl", "Cereal", "Milk"],
  onigiri: ["Rice", "Salt", "Nori"],
  hotdog: ["Bun", "Sausage", "Ketchup"],
  taco: ["Tortilla", "Meat", "Cheese"],
  cookie: ["Flour", "Egg", "Sugar"]
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".recipe").forEach(img => {
    img.addEventListener("click", () => {
      const recipe = img.dataset.recipe;
      showCookingPage(recipe);
    });
  });
});

function showCookingPage(recipe) {
  clearInterval(timerInterval);
  timeLeft = 60;
  timeScore = 70;
  orderScore = 0;
  droppedItems = [];
  currentRecipe = recipe;
  document.getElementById("timer").textContent = `${timeLeft}s`;
  document.getElementById("game-character").src = "../assets/Character_all/Gembira.png";
  document.getElementById("game-character").classList.remove("full-belly");

  timerInterval = setInterval(() => {
    timerSoundTicking.play();
    timeLeft--;
    if (timeLeft < 15) {
      document.getElementById("game-character").src = "../assets/Character_all/Panik.png";
    }
    if (timeLeft < 50) {
      timeScore = Math.max(0, Math.floor((timeLeft / 50) * 70));
    }
    document.getElementById("timer").textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      stopTicking();
      timersUpSound.play();
      showFailMessage();
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
    list.appendChild(img);
  });

  drop_area.ondragover = allowDrop;
  drop_area.ondrop = drop;
}

function stopTicking() {
  timerSoundTicking.pause();
  timerSoundTicking.currentTime = 0;
}

function allowDrop(ev) {
  ev.preventDefault();
  drop_area.classList.remove("hovered");
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.alt);
  drop_area.classList.add("hovered");
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  if (!droppedItems.includes(data)) {
    if (drop_area.textContent.includes("Drop")) drop_area.textContent = "";
    droppedItems.push(data);
    const node = document.createElement("img");
    node.src = `../assets/ingredients_${currentRecipe}/${data.toLowerCase()}.png`;
    node.style.width = "5vw";
    drop_area.appendChild(node);
    document.getElementById("drop-sound").play();
  }

  const required = ingredients[currentRecipe];
  const allDropped = required.length === droppedItems.length &&
    required.every(item => droppedItems.includes(item));

  if (required.length === droppedItems.length) {
    orderScore = 0;
    required.forEach((item, index) => {
      if (item === droppedItems[index]) orderScore += 10;
    });
  }

  if (allDropped) {
    score = Math.floor(timeScore + orderScore);
    victorySound.play();
    emojiConfettiByMode(currentRecipe);

    const char = document.getElementById("game-character");
    if (score === 100) {
      char.src = "../assets/Character_all/Buncit.png";
      char.classList.add("full-belly");
    } else {
      char.src = "../assets/Character_all/Gembira.png";
    }

    stopTicking();
    clearInterval(timerInterval);

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
      char.src = "../assets/Character_all/Gembira.png";
      char.classList.remove("full-belly");
      doneBox.remove();
      resetDropArea();
    };
    doneBox.appendChild(message);
    doneBox.appendChild(tryAgainBtn);
    document.body.appendChild(doneBox);
  }
}

function showFailMessage() {
  const oldBox = document.getElementById("done-message-box");
  if (oldBox) oldBox.remove();
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
    document.getElementById("game-character").src = "../assets/Character_all/Gembira.png";
    document.getElementById("game-character").classList.remove("full-belly");
    failBox.remove();
    resetDropArea();
    timersUpSound.pause();
    timersUpSound.currentTime = 0;
  };
  document.getElementById("game-character").src = "../assets/Character_all/Sedih.png";
  failBox.appendChild(message);
  failBox.appendChild(tryAgainBtn);
  document.body.appendChild(failBox);
  failBox.style.position = "absolute";
  failBox.style.top = "50%";
  failBox.style.left = "50%";
  failBox.style.transform = "translate(-50%, -50%)";
  failBox.style.backgroundColor = "#fff";
  failBox.style.padding = "20px";
  failBox.style.borderRadius = "8px";
  failBox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
}

function resetDropArea() {
  drop_area.innerHTML = "";
  drop_area.textContent = "Drop ingredients on this table, as fast as possible in the correct order";
}
