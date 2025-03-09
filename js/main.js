/* Music */
var music = new Audio('../assets/Lukrembo - Kitchen (freetouse.com).mp3')
// music.play();
music.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);
var pauseMusic = document.getElementById("pauseMusic")
pauseMusic.addEventListener("click", function() {
  if(music.paused == true) {
    music.play()
    pauseMusic.style.opacity = "1"
  } else {
    music.pause()
    pauseMusic.style.opacity = "0.5"
  }
})