function _calculateScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
}
// recalculate on resize
window.addEventListener('resize', _calculateScrollbarWidth, false);
// recalculate on dom load
document.addEventListener('DOMContentLoaded', _calculateScrollbarWidth, false); 
// recalculate on load (assets loaded as well)
window.addEventListener('load', _calculateScrollbarWidth);


const music = document.getElementById("bg-music");
music.play();
music.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);

const pauseMusicBtn = document.getElementById("pauseMusic");
pauseMusicBtn.addEventListener("click", () => {
  if (music.paused == true) {
    music.play();
    pauseMusicBtn.style.opacity = "1";
  } else {
    music.pause();
    pauseMusicBtn.style.opacity = "0.5";
  }
});

function goToGame() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("gamePage").style.display = "block";
  document.getElementById("cookPage").style.display = "none";
}

function goToCook() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "block";
  // Set dummy recipe image and ingredients for now
  document.getElementById("recipe-img").src = "../assets/cereal.png";
  document.getElementById("ingredient-list").innerHTML = "<li>Milk</li><li>Cereal</li>";
}

function goToHome() {
  document.getElementById("homePage").style.display = "block";
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "none";
}