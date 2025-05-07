const recipes = document.querySelectorAll(".recipe");

recipes.forEach(item => {
  item.addEventListener("click", () => {
     if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      recipes.forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      const recipe = item.dataset.recipe;
      localStorage.setItem("selectedRecipe", recipe);
      goToCook(recipe);
    }
  });
});
