const recipeName = localStorage.getItem("selectedRecipe");
const img = document.getElementById("recipe-img");
const list = document.getElementById("ingredient-list");

const ingredientsMap = {
  cereal: ["Cereal", "Milk", "Bowl", "Spoon"],
  onigiri: ["Rice", "Seaweed", "Salt", "Filling"],
  hotdog: ["Hotdog bun", "Sausage", "Ketchup", "Mustard"],
  taco: ["Taco shell", "Meat", "Lettuce", "Cheese"],
  cookie: ["Flour", "Eggs", "Sugar", "Chocolate chips"]
};

if (recipeName) {
    img.src = `../assets/${recipeName}.png`;
    img.alt = `${recipeName} image`;
    const ingredients = ingredientsMap[recipeName] || [];
    ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
} else {
  img.alt = "No recipe selected";
}