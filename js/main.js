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
music.volume = 0.5;
music.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
  music.volume = 0.5;
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