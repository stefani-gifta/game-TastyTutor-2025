function _calculateScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
}
// recalculate on resize
window.addEventListener('resize', _calculateScrollbarWidth, false);
// recalculate on dom load
document.addEventListener('DOMContentLoaded', _calculateScrollbarWidth, false); 
// recalculate on load (assets loaded as well)
window.addEventListener('load', _calculateScrollbarWidth);


/* Music */
var music = new Audio('../assets/Lukrembo - Kitchen (freetouse.com).mp3')
music.play();
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


/* Keep music playing through pages */
const contentDiv = document.getElementById("container");

document.querySelectorAll(".start-btn, .button").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent full page reload
    const url = this.getAttribute("href");

    // Fetch content via AJAX
    fetch(url)
      .then(response => response.text())
      .then(data => {
          contentDiv.innerHTML = data;
          history.pushState({ path: url }, "", url); // Update URL
      })
      .catch(err => console.error("Error loading page:", err));
  });
});

window.addEventListener("popstate", function (event) {
  fetch(location.pathname)
    .then(response => response.text())
    .then(data => (contentDiv.innerHTML = data));
});