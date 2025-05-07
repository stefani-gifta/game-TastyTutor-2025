let timer = 60;
let interval;

function startTimer() {
  const timerElement = document.getElementById("timer");
  interval = setInterval(() => {
    timer--;
    timerElement.textContent = `Time: ${timer}`;
    if (timer <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}
