const tabs = document.querySelectorAll(".tabs-container button");
const resultContainers = document.querySelectorAll(".recipe-result-container");
const errorValidationTexts = document.querySelectorAll(".form-validation-error-state");
const headerSearchIconBtn = document.getElementById("header-search-icon-btn");
const searchInputBars = document.querySelectorAll(".search-inputBar");
const forms = document.querySelectorAll(".search-form");

// Function to switch between Breakfast/Lunch/Dinner/Dessert stabs
function switchTabs() {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      resultContainers.forEach((resultContainer) => {
        resultContainer.classList.remove("recipe-result-container-active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("tab-active");
      });

      tabs[index].classList.add("tab-active");
      resultContainers[index].classList.add("recipe-result-container-active");
    });
  });
}
switchTabs();

//Expand and Close header Search bar
headerSearchIconBtn.addEventListener("click", () => {
  headerSearchIconBtn.style.display = "none";
  if (headerSearchIconBtn) {
    headerSearchIconBtn.style.display = "none";
    forms[0].style.display = "flex";
  } else if (forms[0]) {
    headerSearchIconBtn.style.display = "flex";
    forms[0].style.display = "none";
  }
});

function searchInputValidation(index) {
  if (searchInputBars[index].value.trim() === "") {
    errorValidationTexts[index].textContent = "Enter a search item";
    return false;
  } else {
    errorValidationTexts[index].textContent = "";
    return true;
  }
}

//Collect User value/query
forms.forEach((form, index) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!searchInputValidation(index)) {
      return;
    }

    let userInput = searchInputBars[index].value.trim();
    foodRecipeData(userInput);

    forms[0].style.display = "none";
    headerSearchIconBtn.style.display = "flex";

    form.reset();
  });
});

//Spoonacular API
async function foodRecipeData(userInput) {
  const apiKEY = "b57c0eb865e84768954fa8ec016596b0";
  const recipeEndpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&apiKey=${apiKEY}&number=2`;

  try {
    const response = await fetch(recipeEndpoint);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("HTTP Error 404 or 405");
    }
    console.log(data);
  } catch (error) {
    console.log("Error fecting item data");
  }
}
