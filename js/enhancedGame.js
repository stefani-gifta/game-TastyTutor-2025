let timerInterval;
let timeLeft = 60;
let score = 100

function startTimer() {
  const timerElement = document.getElementById("timer");
  timer = 60;
  clearInterval(interval);
  interval = setInterval(() => {
    timer--;
    timerElement.textContent = `Time left: ${timer}s`;
    if (timer <= 0) {
      clearInterval(interval);
      alert("Time's up!");
      // Optionally: go back to game page
    }
  }, 1000);
}


function endGame() {
  alert("Time's up! The game is over.");
  goToHome();
}
