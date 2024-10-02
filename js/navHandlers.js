import { printToUI } from "./printToUI.js";

const contentArea = document.getElementById("content-area");
const numberOfResults = document.getElementById("number-of-results");

//Function to switch header nav links
export function setActiveLink(headerNavLinks, arrayOfSavedRecipe) {
  //Destructuring Header Nav Links
  let [homeLink, favouritesLink] = headerNavLinks;

  const isHome = window.location.href.includes("home");

  const isFavourites = window.location.href.includes("favourites");

  headerNavLinks.forEach((navLink) => {
    navLink.classList.remove("header-nav-links-active");
  });

  if (isHome) {
    homeLink.classList.add("header-nav-links-active");
  } else if (isFavourites) {
    favouritesLink.classList.add("header-nav-links-active");

    contentArea.style.marginTop = "3rem";

    printToUI(arrayOfSavedRecipe);

    numberOfResults.textContent = `(${arrayOfSavedRecipe.length})`;
  } else {
    if (homeLink) {
      homeLink.classList.add("header-nav-links-active");
    }
  }
}

// Handle back/forward navigation
export function handlePopState(foodRecipeData) {
  window.addEventListener("popstate", (event) => {
    if (event.state) {
      let userInput = event.state.query;

      foodRecipeData(userInput);
    } else {
      window.location.href = "home.html";
    }
  });
}
