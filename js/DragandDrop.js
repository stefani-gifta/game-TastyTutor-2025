// Fungsi untuk mengaktifkan drop
function allowDrop(event) {
  event.preventDefault();
}

// Fungsi ketika bahan mulai di-drag
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Fungsi ketika bahan di-drop ke area drop
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  const droppedElement = document.getElementById(data);
  if (event.target.id === "drop-area" && droppedElement) {
    event.target.appendChild(droppedElement);
  }
}

// Menampilkan halaman memasak dengan drag-and-drop
function showCookingPage(recipe) {
  document.getElementById("gamePage").style.display = "none";
  document.getElementById("cookPage").style.display = "block";

  const recipeImg = document.getElementById("recipe-img");
  recipeImg.src = `../assets/${recipe}.png`;
  recipeImg.alt = recipe;

  const ingredients = {
    cereal: ["Milk", "Cereal", "Bowl"],
    onigiri: ["Rice", "Seaweed", "Salt"],
    hotdog: ["Bun", "Sausage", "Ketchup"],
    taco: ["Tortilla", "Meat", "Cheese"],
    cookie: ["Flour", "Egg", "Sugar"]
  };

  // const steps = {
  //   cereal: ["Pour cereal into bowl", "Add milk", "Enjoy!"],
  //   onigiri: ["Cook rice", "Form triangle", "Wrap with seaweed"],
  //   hotdog: ["Heat sausage", "Place in bun", "Add ketchup"],
  //   taco: ["Prepare fillings", "Add to tortilla", "Fold and serve"],
  //   cookie: ["Mix ingredients", "Bake in oven", "Cool and eat"]
  // };

  const list = document.getElementById("ingredient-list");
  list.innerHTML = "";
  
  // Membuat elemen bahan dengan kemampuan drag
  ingredients[recipe].forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.id = `ingredient-${index}`;
    li.draggable = true;
    li.ondragstart = drag;
    list.appendChild(li);
  });

  // Membuat drop area untuk menampung bahan
  const dropArea = document.createElement("div");
  dropArea.id = "drop-area";
  dropArea.textContent = "Drop ingredients here";
  dropArea.style.border = "2px dashed #ccc";
  dropArea.style.padding = "10px";
  dropArea.style.marginTop = "20px";
  dropArea.style.width = "200px";
  dropArea.style.height = "100px";
  dropArea.ondrop = drop;
  dropArea.ondragover = allowDrop;
  document.getElementById("cook-container").appendChild(dropArea);

  const stepContainer = document.getElementById("cooking-steps");
  const stepText = document.getElementById("step-instruction");
  const nextButton = document.getElementById("next-step-button");
  let stepIndex = 0;

  stepText.textContent = steps[recipe][stepIndex];
  stepContainer.style.display = "block";

  nextButton.onclick = () => {
    stepIndex++;
    if (stepIndex < steps[recipe].length) {
      stepText.textContent = steps[recipe][stepIndex];
    } else {
      stepText.textContent = "Done!";
      nextButton.disabled = true;
    }
  };
}
