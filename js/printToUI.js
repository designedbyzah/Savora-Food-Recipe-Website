import { arrayOfSavedRecipe } from "./main.js";
import { getDietaryTags } from "./recipeInfo.js";

const resultContainer = document.getElementById("recipe-result-container");
let numberOfResults = document.getElementById("number-of-results");
const contentArea = document.getElementById("content-area");
const pageTitle = document.getElementById("page-title");

// Function to Render Recipe Card
export function printToUI(recipeData, userInput) {
  //Creating a Document Fragment
  const fragment = document.createDocumentFragment();

  //Set Page title
  // if (userInput) {
  //   pageTitle.textContent = `Search result for "${userInput.charAt(0).toUpperCase()}${userInput.slice(1)}"`;
  // }

  resultContainer.innerHTML = "";

  numberOfResults.textContent = `(${recipeData.length})`;

  recipeData.forEach(async (recipe) => {
    let recipeInfo = recipe;
    let dietaryTags = getDietaryTags(recipe);
    let APIrecipeID = recipe.id;
    let recipeTitle = recipe.title;
    let recipeImage = recipe.image;
    let recipeSummary = recipe.summary.replace(/<\/?[^>]+(>|$)/g, "");
    let recipeCalories = Math.round(recipe.nutrition.nutrients[0].amount);

    // Create HTML Elements Dynamically
    let recipeResultCard = document.createElement("div");
    recipeResultCard.classList.add("recipe-result-card");
    recipeResultCard.setAttribute("data-recipeid", `${APIrecipeID}`);
    recipeResultCard.setAttribute("data-recipeinfo", JSON.stringify(recipeInfo));

    let cardImgSection = document.createElement("div");
    cardImgSection.classList.add("img-section-of-card");
    cardImgSection.style.backgroundImage = `url(${recipeImage})`;

    let favIconContainer = document.createElement("div");
    favIconContainer.classList.add("favorite-icon-container");
    favIconContainer.setAttribute("data-action", "fav icon");

    favIconContainer.innerHTML = `<svg 
 ]
                          viewBox="0 0 20 20"
                          data-action="fav icon"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path data-action="fav icon"
                            d="M6.24984 3.33325C3.71859 3.33325 1.6665 5.38534 1.6665 7.91659C1.6665 12.4999 7.08317 16.6666 9.99984 17.6358C12.9165 16.6666 18.3332 12.4999 18.3332 7.91659C18.3332 5.38534 16.2811 3.33325 13.7498 3.33325C12.1998 3.33325 10.829 4.10284 9.99984 5.28075C9.5772 4.67876 9.01574 4.18746 8.36298 3.84846C7.71021 3.50945 6.98538 3.33273 6.24984 3.33325Z"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>`;
    let favIcon = favIconContainer.querySelector("svg");
    favIcon.setAttribute("class", "fav-icon");

    const savedRecipe = arrayOfSavedRecipe.some((item) => item.id === APIrecipeID);

    if (savedRecipe) {
      favIcon.classList.add("fav-icon-saved");
    }

    let cardContentSection = document.createElement("div");
    cardContentSection.classList.add("content-section-of-card");

    let tagsTitleSubtextContainer = document.createElement("div");
    tagsTitleSubtextContainer.classList.add("tags-and-title-subtext-container");

    let allTagsContainer;
    allTagsContainer = document.createElement("div");
    allTagsContainer.classList.add("tags-container");
    tagsTitleSubtextContainer.append(allTagsContainer);

    // Looping the "dietaryTags" array to display it's content on UI
    dietaryTags.forEach(async (dietaryTag) => {
      let tagContainer = document.createElement("div");
      tagContainer.classList.add("tags");

      let tagText = document.createElement("p");
      tagText.textContent = `${dietaryTag}`;

      tagContainer.append(tagText);
      allTagsContainer.append(tagContainer);
    });

    let titleSubtextContainer = document.createElement("div");
    titleSubtextContainer.classList.add("recipe-card-title-and-subtext-container");

    let titleTooltipContainer = document.createElement("div");
    titleTooltipContainer.classList.add("title-tooltip-container");

    let titleTooltip = document.createElement("span");
    titleTooltip.id = "title-tooltip";
    titleTooltip.textContent = recipeTitle;

    let titleContainer = document.createElement("div");

    let titleText = document.createElement("h3");

    titleText.textContent = `${recipeTitle}`;

    let subTextContainer = document.createElement("div");

    let subText = document.createElement("p");
    subText.textContent = `${recipeSummary}`;

    // let emptyDiv = document.createElement("div");
    // emptyDiv.classList.add("empty-div");

    let caloriesAndRecipeBtnContainer = document.createElement("div");
    caloriesAndRecipeBtnContainer.classList.add("calories-and-viewRecipeButton-container");

    let caloriesAndIconContainer = document.createElement("div");
    caloriesAndIconContainer.classList.add("calories-and-icon-container");

    let caloriesIcon = document.createElement("i");
    caloriesIcon.classList.add("fa-solid", "fa-fire");

    let caloriesText = document.createElement("p");
    caloriesText.textContent = `${recipeCalories} Calories`;

    let anchorTagForViewRecipeBtn = document.createElement("a");
    anchorTagForViewRecipeBtn.classList.add("anchor-tag-view-recipeBtn");
    // anchorTagForViewRecipeBtn.target = "_blank";
    // anchorTagForViewRecipeBtn.href = `./recipepage.html?recipeID=${APIrecipeID}`;
    anchorTagForViewRecipeBtn.rel = "noopener noreferrer";

    // if (anchorTagForViewRecipeBtn) {
    //   window.location.href = "./recipepage.html";
    // }

    let viewRecipeBtn = document.createElement("button");
    viewRecipeBtn.classList.add("view-recipe-btn");
    viewRecipeBtn.setAttribute("type", "button");
    viewRecipeBtn.setAttribute("data-action", "view recipe btn");
    viewRecipeBtn.textContent = "View recipe";
    // viewRecipeBtn.setAttribute("data-recipeid", `${APIrecipeID}`);

    // Append created Elements

    fragment.append(recipeResultCard);

    recipeResultCard.append(cardImgSection, cardContentSection);

    cardImgSection.append(favIconContainer);
    favIconContainer.append(favIcon);

    cardContentSection.append(tagsTitleSubtextContainer, caloriesAndRecipeBtnContainer);

    tagsTitleSubtextContainer.append(titleSubtextContainer);

    titleSubtextContainer.append(titleContainer, subTextContainer, titleTooltipContainer);

    titleTooltipContainer.append(titleTooltip);

    titleContainer.append(titleText);
    subTextContainer.append(subText);

    anchorTagForViewRecipeBtn.append(viewRecipeBtn);

    caloriesAndRecipeBtnContainer.append(caloriesAndIconContainer, anchorTagForViewRecipeBtn);

    caloriesAndIconContainer.append(caloriesIcon, caloriesText);
  });

  resultContainer.appendChild(fragment);
}
