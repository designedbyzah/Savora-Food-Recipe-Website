// import { arrayOfSavedRecipe } from "./main.js";
let arrayOfSavedRecipe = JSON.parse(localStorage.getItem("recipeInfo")) || [];
arrayOfSavedRecipe.reverse();

import { saveUnsaveRecipe } from "./utility.js";

const tabs = document.querySelectorAll(".tabs-container button");

// Event Delegation to handle user interactions with recipe result cards (favoriting or viewing recipes)
export function handleRecipeCardInteraction(resultContainer) {
  resultContainer.addEventListener("click", (event) => {
    let userTarget = event.target;
    let theClickedRecipeCard = userTarget.closest(".recipe-result-card");
    if (!theClickedRecipeCard) {
      return;
    }

    let favIcon = theClickedRecipeCard.querySelector(".fav-icon");
    if (!favIcon) {
      return;
    }

    let clickedAction = userTarget.dataset.action;
    let APIrecipeID = Number(theClickedRecipeCard.dataset.recipeid);

    let recipeInfo = JSON.parse(theClickedRecipeCard.dataset.recipeinfo);

    if (clickedAction === "fav icon") {
      saveUnsaveRecipe(favIcon, APIrecipeID, recipeInfo, theClickedRecipeCard, arrayOfSavedRecipe);
    } else if (clickedAction === "view recipe btn") {
      sessionStorage.setItem("selectedRecipeInfo", JSON.stringify(recipeInfo));

      // Updating broswer URL

      // const newURL = `./recipepage.html?recipeID=${APIrecipeID}`;

      // history.pushState({ recipeID: APIrecipeID }, "", newURL);

      // foodRecipeData(userInput);

      window.location.href = `recipepage.html?recipeID=${APIrecipeID}`;

      // window.location.href = newURL;
    }
  });
}

// Event Delegation Function to switch between Breakfast/Lunch/Dinner/Dessert tabs
export function switchTabs(tabsContainer, recipeDataByCategory) {
  if (!tabsContainer) {
    return;
  }
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
