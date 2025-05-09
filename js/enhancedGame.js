let timer = 60;
let interval;

function startTimer() {
  const timerElement = document.getElementById("timer");
  interval = setInterval(() => {
    timerElement.textContent = `Time left: ${timer}`;
    timer--;
    if (timer <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  alert("Time's up! The game is over.");
  goToHome();
}
