const numberOfResults = document.getElementById("number-of-results");

//Function to Hide Hero and Tabs on User Search
export function hideHeroAndTabs(tabsContainer, heroSectionContainer, contentArea) {
  tabsContainer.style.display = "none";
  heroSectionContainer.style.display = "none";
  contentArea.style.marginTop = "3rem";
}

//Function to Show Hero and Tabs on User Search
export function showHeroAndTabs(tabsContainer, heroSectionContainer) {
  tabsContainer.style.display = "flex";
  heroSectionContainer.style.display = "flex";
}

//Function to Validate Search Form
export function searchInputValidation(searchInputBars, errorValidationTexts, index) {
  if (searchInputBars[index].value.trim() === "") {
    errorValidationTexts[index].textContent = "Enter a search item";
    return false;
  } else {
    errorValidationTexts[index].textContent = "";
    return true;
  }
}

// Save and Unsave Recipe Function
export function saveUnsaveRecipe(
  favIcon,
  APIrecipeID,
  recipeInfo,
  theClickedRecipeCard,
  arrayOfSavedRecipe
) {
  const savedRecipe = arrayOfSavedRecipe.some((item) => item.id === APIrecipeID);

  if (savedRecipe) {
    const userConfirm = confirm("This recipe is in your favorites. Do you want to remove it?");
    if (userConfirm) {
      favIcon.classList.remove("fav-icon-saved");
      favIcon.classList.add("fav-icon");

      const updatedArrayOfSavedRecipe = arrayOfSavedRecipe.filter(
        (item) => item.id !== APIrecipeID
      );

      localStorage.setItem("recipeInfo", JSON.stringify(updatedArrayOfSavedRecipe));

      arrayOfSavedRecipe.length = 0;
      arrayOfSavedRecipe.push(...updatedArrayOfSavedRecipe);

      removeCard(theClickedRecipeCard, arrayOfSavedRecipe);
    }
  } else {
    favIcon.classList.toggle("fav-icon-saved");
    arrayOfSavedRecipe.push(recipeInfo);

    localStorage.setItem("recipeInfo", JSON.stringify(arrayOfSavedRecipe));
  }
}

// Function to remove card from UI after Unsaving
export function removeCard(theClickedRecipeCard, arrayOfSavedRecipe) {
  if (window.location.href.includes("favourites")) {
    theClickedRecipeCard.remove();
  }

  numberOfResults.textContent = `(${arrayOfSavedRecipe.length})`;
}

// Function to show the loading screen
export function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "flex";
  loadingScreen.style.opacity = "1";
}

// Function to hide the loading screen
export function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 300);
}
