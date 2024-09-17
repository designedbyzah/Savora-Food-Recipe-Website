const resultContainer = document.getElementById("recipe-result-container");
let numberOfResults = document.getElementById("number-of-results");

let arrayOfSavedRecipe = JSON.parse(localStorage.getItem("recipeInfo")) || [];

// let arrayOfSavedRecipe = [];

function printToUI(recipeData) {
  resultContainer.innerHTML = "";
  numberOfResults.textContent = `(${recipeData.length})`;

  recipeData.forEach((recipe) => {
    let dietaryTags = [];

    let APIrecipeID = recipe.id;

    let recipeTitle = recipe.title;
    let recipeImage = recipe.image;
    let recipeSummary = recipe.summary.replace(/<\/?[^>]+(>|$)/g, "");
    let recipeCalories = Math.round(recipe.nutrition.nutrients[0].amount);

    let dairyFree = recipe.dairyFree ? "Dairy-free" : null;

    let vegan = recipe.vegan ? "Vegan" : null;

    let vegetarian = recipe.vegetarian ? "Vegetarian" : null;

    let glutenFree = recipe.glutenFree ? "Gluten-free" : null;

    if (dairyFree) dietaryTags.push(dairyFree);
    if (vegan) dietaryTags.push(vegan);
    if (vegetarian) dietaryTags.push(vegetarian);
    if (glutenFree) dietaryTags.push(glutenFree);

    // Create HTML Elements Dynamically
    let recipeResultCard = document.createElement("div");
    recipeResultCard.classList.add("recipe-result-card");
    recipeResultCard.setAttribute("data-recipeid", `${APIrecipeID}`);
    recipeResultCard.setAttribute("data-recipetitle", `${recipeTitle}`);
    // recipeResultCard.setAttribute("data-id", `${index}`);

    let cardImgSection = document.createElement("div");
    cardImgSection.classList.add("img-section-of-card");
    cardImgSection.style.backgroundImage = `url(${recipeImage})`;

    let favIconContainer = document.createElement("div");
    favIconContainer.classList.add("favorite-icon-container");
    favIconContainer.setAttribute("data-action", "fav icon");
    // favIconContainer.style.cursor = "pointer";

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
    // favIcon.style.cursor = "pointer";

    const savedRecipe = arrayOfSavedRecipe.some((item) => item.id === String(APIrecipeID));

    if (savedRecipe) {
      favIcon.classList.add("fav-icon-saved");
    }

    // favIcon.setAttribute("data-id", `${index}`);

    // let favIcon = document.createElement("div");
    // favIcon.classList.add("favorite-icon-container");

    let cardContentSection = document.createElement("div");
    cardContentSection.classList.add("content-section-of-card");

    let tagsTitleSubtextContainer = document.createElement("div");
    tagsTitleSubtextContainer.classList.add("tags-and-title-subtext-container");

    // let allTagsContainer = document.createElement("div");
    // allTagsContainer.classList.add("tags-container");

    let allTagsContainer;

    // Looping the "dietaryTags" array to display it's content on UI
    dietaryTags.forEach((dietaryTag) => {
      if (!allTagsContainer) {
        allTagsContainer = document.createElement("div");
        allTagsContainer.classList.add("tags-container");
      }

      let tagContainer = document.createElement("div");
      tagContainer.classList.add("tags");

      let tagText = document.createElement("p");
      tagText.textContent = `${dietaryTag}`;

      tagContainer.append(tagText);
      allTagsContainer.append(tagContainer);
    });

    if (allTagsContainer) {
      tagsTitleSubtextContainer.append(allTagsContainer);
    }

    // if (allTagsContainer.children.length === 0) {
    //   allTagsContainer.remove();
    // }

    // let tagContainer = document.createElement("div");
    // tagContainer.classList.add("tags");

    // let tagText = document.createElement("p");
    // tagText.textContent = "Testinnng";

    let titleSubtextContainer = document.createElement("div");
    titleSubtextContainer.classList.add("recipe-card-title-and-subtext-container");

    let titleContainer = document.createElement("div");

    let titleText = document.createElement("h3");

    titleText.textContent = `${recipeTitle}`;

    let subTextContainer = document.createElement("div");

    let subText = document.createElement("p");
    subText.textContent = `${recipeSummary}`;

    let caloriesAndRecipeBtnContainer = document.createElement("div");
    caloriesAndRecipeBtnContainer.classList.add("calories-and-viewRecipeButton-container");

    let caloriesAndIconContainer = document.createElement("div");
    caloriesAndIconContainer.classList.add("calories-and-icon-container");

    let caloriesIcon = document.createElement("i");
    caloriesIcon.classList.add("fa-solid", "fa-fire");

    let caloriesText = document.createElement("p");
    caloriesText.textContent = `${recipeCalories} Calories`;

    let viewRecipeBtn = document.createElement("button");
    viewRecipeBtn.classList.add("view-recipe-btn");
    viewRecipeBtn.setAttribute("type", "button");
    viewRecipeBtn.setAttribute("data-action", "view recipe btn");
    viewRecipeBtn.textContent = "View recipe";
    // viewRecipeBtn.setAttribute("data-recipeid", `${APIrecipeID}`);

    // Append created Elements

    resultContainer.append(recipeResultCard);

    recipeResultCard.append(cardImgSection, cardContentSection);

    cardImgSection.append(favIconContainer);
    favIconContainer.append(favIcon);

    cardContentSection.append(tagsTitleSubtextContainer, caloriesAndRecipeBtnContainer);

    tagsTitleSubtextContainer.append(titleSubtextContainer);

    // allTagsContainer.append(tagContainer);
    // tagContainer.append(tagText);

    titleSubtextContainer.append(titleContainer, subTextContainer);

    titleContainer.append(titleText);
    subTextContainer.append(subText);

    caloriesAndRecipeBtnContainer.append(caloriesAndIconContainer, viewRecipeBtn);

    caloriesAndIconContainer.append(caloriesIcon, caloriesText);
  });
}

// Event delegation function for each result cards

resultContainer.addEventListener("click", (event) => {
  let userTarget = event.target;
  let theClickedRecipeCard = userTarget.closest(".recipe-result-card");
  if (!theClickedRecipeCard) {
    return;
  }

  // let recipeCardIndex = Number(theClickedRecipeCard.dataset.id);

  let favIcon = theClickedRecipeCard.querySelector(".fav-icon");
  if (!favIcon) {
    return;
  }

  let clickedAction = userTarget.dataset.action;
  let APIrecipeID = theClickedRecipeCard.dataset.recipeid;

  let recipeTitle = theClickedRecipeCard.dataset.recipetitle;

  console.log(clickedAction);

  // console.log(APIrecipeID);
  console.log(arrayOfSavedRecipe);

  if (clickedAction === "fav icon") {
    saveUnsaveRecipe(favIcon, APIrecipeID, recipeTitle);
  }
});

function saveUnsaveRecipe(favIcon, APIrecipeID, recipeTitle) {
  const savedRecipe = arrayOfSavedRecipe.some((item) => item.id === APIrecipeID);

  // console.log(item.id);

  if (savedRecipe) {
    const userConfirm = confirm("This recipe is in your favorites. Do you want to remove it?");
    if (userConfirm) {
      favIcon.classList.remove("fav-icon-saved");
      favIcon.classList.add("fav-icon");

      arrayOfSavedRecipe = arrayOfSavedRecipe.filter((item) => item.id !== APIrecipeID);

      localStorage.setItem("recipeInfo", JSON.stringify(arrayOfSavedRecipe));
    }
  } else {
    favIcon.classList.toggle("fav-icon-saved");

    arrayOfSavedRecipe.push({ id: APIrecipeID, title: recipeTitle });

    localStorage.setItem("recipeInfo", JSON.stringify(arrayOfSavedRecipe));
  }
}

// function updateLocalStorage() {
//   if (localStorage.getItem("recipeInfo")) {
//     arrayOfSavedRecipe = JSON.parse(localStorage.getItem("recipeInfo"));
//   }
// }
// updateLocalStorage();
console.log(arrayOfSavedRecipe);

export default printToUI;
