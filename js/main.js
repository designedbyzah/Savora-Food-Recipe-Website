import { foodRecipeData, recipeDataByCategory } from "./allAPI.js";
import { hideHeroAndTabs, searchInputValidation, showHeroAndTabs } from "./utility.js";
import { handlePopState, setActiveLink } from "./navHandlers.js";
import { handleRecipeCardInteraction, switchTabs } from "./eventHandlers.js";

//Get DOM Elements
const tabs = document.querySelectorAll(".tabs-container button");
const resultContainer = document.getElementById("recipe-result-container");
const tabsContainer = document.getElementById("tabs-container");
const heroSectionContainer = document.getElementById("hero-section-container");
const errorValidationTexts = document.querySelectorAll(".form-validation-error-state");
const headerSearchIconBtn = document.getElementById("header-search-icon-btn");
const searchInputBars = document.querySelectorAll(".search-inputBar");
const forms = document.querySelectorAll(".search-form");
const contentArea = document.getElementById("content-area");
const pageTitle = document.getElementById("page-title");
const headerNavLinks = document.querySelectorAll(".header-nav-links");

export let arrayOfSavedRecipe = JSON.parse(localStorage.getItem("recipeInfo")) || [];
arrayOfSavedRecipe.reverse();

// Event Delegation Function to switch between Breakfast/Lunch/Dinner/Dessert tabs and it's content
switchTabs(tabsContainer, recipeDataByCategory);

//Expand and Close header Search bar
headerSearchIconBtn.addEventListener("click", () => {
  if (headerSearchIconBtn) {
    headerSearchIconBtn.style.display = "none";
    forms[0].style.display = "flex";
  }
});

//Collect User value/query
forms.forEach((form, index) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!searchInputValidation(searchInputBars, errorValidationTexts, index)) {
      return;
    }

    let userInput = searchInputBars[index].value.trim();

    if (userInput) {
      // const newURL = `./home.html?query=${encodeURIComponent(userInput)}&page=searchresults`;

      // history.pushState({ query: userInput }, "", newURL);

      await foodRecipeData(userInput);
    }

    forms[0].style.display = "none";
    headerSearchIconBtn.style.display = "flex";

    form.reset();
  });
});

// Event Delegation to handle user interactions with recipe result cards (favoriting or viewing recipes)
handleRecipeCardInteraction(resultContainer, arrayOfSavedRecipe);

// Set Active Nav Links and their states
setActiveLink(headerNavLinks, arrayOfSavedRecipe, contentArea);

// Handle back/forward navigation
handlePopState(foodRecipeData);
