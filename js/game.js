const recipes = document.querySelectorAll(".recipe");
recipes.forEach(item => {
  item.addEventListener("click", () => {
    // If the item is already active, remove the 'active' class
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      // Remove 'active' class from all other items
      recipes.forEach(el => el.classList.remove("active"));
      // Add 'active' class to the clicked item
      item.classList.add("active");
    }
  });
});