import { foodRecipeData, recipeDataByCategory } from "./allAPI.js";

import printToUI from "./printToUI.js";

const tabs = document.querySelectorAll(".tabs-container button");
const resultContainer = document.getElementById("recipe-result-container");
const tabsContainer = document.getElementById("tabs-container");
const heroSectionContainer = document.getElementById("hero-section-container");
const homeLink = document.getElementById("home-link");
const errorValidationTexts = document.querySelectorAll(".form-validation-error-state");
const headerSearchIconBtn = document.getElementById("header-search-icon-btn");
const searchInputBars = document.querySelectorAll(".search-inputBar");
const forms = document.querySelectorAll(".search-form");
let numberOfResults = document.getElementById("number-of-results");
const pageTitle = document.getElementById("page-title");

// Event Delegation Function to switch between Breakfast/Lunch/Dinner/Dessert tabs and it's content

function switchTabs() {
  tabsContainer.addEventListener("click", (event) => {
    let userTarget = event.target;
    let clickedTab = userTarget.closest(".tabs-container button");
    if (!clickedTab) {
      return;
    }
    let mealType = clickedTab.dataset.mealtype;

    tabs.forEach((tab) => {
      tab.classList.remove("tab-active");
    });
    clickedTab.classList.add("tab-active");

    if (mealType === "breakfast") {
      recipeDataByCategory(mealType);
    } else if (mealType === "main course") {
      recipeDataByCategory(mealType);
    } else if (mealType === "main course") {
      recipeDataByCategory(mealType);
    } else if (mealType === "dessert") {
      recipeDataByCategory(mealType);
    }
  });

  // Destructing the Array that "tabs" returns, so as to store the first data item in "tabs" in a variable "breakfastTab"

  let [breakfastTab] = tabs;

  if (breakfastTab) {
    breakfastTab.classList.add("tab-active");
    recipeDataByCategory("breakfast");
  }
}
switchTabs();
//Expand and Close header Search bar
headerSearchIconBtn.addEventListener("click", () => {
  if (headerSearchIconBtn) {
    headerSearchIconBtn.style.display = "none";
    forms[0].style.display = "flex";
  }
});

//Search Form Validation
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

    pageTitle.textContent = `Search result for "${userInput.charAt(0).toUpperCase()}${userInput.slice(1)}"`;

    forms[0].style.display = "none";
    headerSearchIconBtn.style.display = "flex";

    form.reset();
  });
});

//Reset back to home
homeLink.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "home.html";
  }, 1000);
});
