import { getDietaryTags, recipeCookingStepsData, recipeIngredientsData } from "./recipeInfo.js";

const recipePageContainer = document.getElementById("info-content-area");

//Get stored Recipe Data from Session storage and render the necessary informations.
const recipeData = JSON.parse(sessionStorage.getItem("selectedRecipeInfo"));
if (recipeData) {
  renderRecipePage(recipeData, recipePageContainer);
  sessionStorage.removeItem("selectedRecipeInfo");
}

export function renderRecipePage(recipeData, recipePageContainer) {
  recipePageContainer.innerHTML = "";

  console.log(recipeData);

  // Extracting Data from Object

  let recipeTitle = recipeData.title;

  let dietaryTags = getDietaryTags(recipeData);

  let recipeDuration = recipeData.readyInMinutes;

  let recipeImage = recipeData.image;

  let recipeSummary = recipeData.summary.replace(/<\/?[^>]+(>|$)/g, "");

  let recipeIngredients = recipeIngredientsData(recipeData);

  let recipeCookingSteps = recipeCookingStepsData(recipeData);

  // Creating Elements Dynamically
  let backToResultBtn = document.createElement("button");
  backToResultBtn.setAttribute("type", "button");
  backToResultBtn.setAttribute("class", "back-btn");
  backToResultBtn.textContent = "Back to search result";

  backToResultBtn.addEventListener("click", (event) => {
    event.preventDefault();

    window.history.back();
  });

  let backIcon = document.createElement("i");
  backIcon.setAttribute("class", "fa-solid fa-chevron-left");

  let titleRatingTagsTimingContainer = document.createElement("div");
  titleRatingTagsTimingContainer.setAttribute("class", "title-rating-tags-timing-container");

  let recipeTitleText = document.createElement("h3");
  recipeTitleText.textContent = recipeTitle;

  let ratingReviewsContainer = document.createElement("div");
  ratingReviewsContainer.setAttribute("class", "ratings-reviews-container");

  let ratingsContainer = document.createElement("div");
  ratingsContainer.setAttribute("class", "ratings-container");

  let ratingIconSolid = document.createElement("i");
  ratingIconSolid.setAttribute("class", "fa-solid fa-star");

  let ratingIconRegular = document.createElement("i");
  ratingIconRegular.setAttribute("class", "fa-regular fa-star");

  //Generate Random Rating and Append
  const randomRating = Math.random() < 0.5 ? 5 : 4;
  for (let i = 0; i < randomRating; i++) {
    let ratingIconSolid = document.createElement("i");
    ratingIconSolid.setAttribute("class", "fa-solid fa-star");
    ratingsContainer.append(ratingIconSolid);
  }

  if (randomRating === 4) {
    let ratingIconRegular = document.createElement("i");
    ratingIconRegular.setAttribute("class", "fa-regular fa-star");
    ratingsContainer.appendChild(ratingIconRegular);
  }

  // Generate Random Review Count
  const randomReviewsCount = Math.floor(Math.random() * 316);
  let reviewTextContainer = document.createElement("span");
  reviewTextContainer.setAttribute("class", "reviews-text");
  reviewTextContainer.textContent = `(${randomReviewsCount}  reviews)`;

  let allTagsContainer = document.createElement("div");
  allTagsContainer.setAttribute("class", "tags-container");

  dietaryTags.forEach(async (dietaryTag) => {
    let tagContainer = document.createElement("div");
    tagContainer.setAttribute("class", "tags");

    let tagText = document.createElement("p");
    tagText.setAttribute("class", "tags");
    tagText.textContent = dietaryTag;

    tagContainer.append(tagText);

    allTagsContainer.append(tagContainer);
  });

  let timingContainer = document.createElement("div");
  timingContainer.setAttribute("class", "timing-container");

  let readyInContainer = document.createElement("div");
  readyInContainer.setAttribute("class", "ready-in-container");

  let clockIcon = document.createElement("i");
  clockIcon.setAttribute("class", "fa-solid fa-clock");

  let readyInText = document.createElement("p");
  readyInText.textContent = "Ready in";

  let readyInDuration = document.createElement("div");
  readyInDuration.setAttribute("class", "minutes-container");

  let durationText = document.createElement("p");
  durationText.textContent = recipeDuration;

  let durationTextUnit = document.createElement("span");
  durationTextUnit.textContent = "mins";

  //   Start of Overview Section

  let overviewSectionContainer = document.createElement("div");
  overviewSectionContainer.setAttribute("class", "overview-section-container");

  let overviewImage = document.createElement("div");
  overviewImage.setAttribute("class", "img-section");
  overviewImage.style.backgroundImage = `url(${recipeImage})`;

  let summarySection = document.createElement("div");
  summarySection.setAttribute("class", "summary-section");

  let headingSubtextContainer = document.createElement("div");
  headingSubtextContainer.setAttribute("class", "heading-subtext-container");

  let SummarySectionHeading = document.createElement("h3");
  SummarySectionHeading.textContent = "Overview";

  let SummarySubText = document.createElement("p");
  SummarySubText.textContent = recipeSummary;

  let addToFavBtn = document.createElement("div");
  addToFavBtn.setAttribute("class", "add-to-fav-btn");

  addToFavBtn.innerHTML = `<svg 
]
                        viewBox="0 0 20 20"
                        data-action="fav icon"
                        class ="fav-icon"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path data-action="fav icon"
                        class =".fav-icon"
                          d="M6.24984 3.33325C3.71859 3.33325 1.6665 5.38534 1.6665 7.91659C1.6665 12.4999 7.08317 16.6666 9.99984 17.6358C12.9165 16.6666 18.3332 12.4999 18.3332 7.91659C18.3332 5.38534 16.2811 3.33325 13.7498 3.33325C12.1998 3.33325 10.829 4.10284 9.99984 5.28075C9.5772 4.67876 9.01574 4.18746 8.36298 3.84846C7.71021 3.50945 6.98538 3.33273 6.24984 3.33325Z"
                          stroke="currentColor"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>`;

  let addToFavText = document.createElement("p");
  addToFavText.textContent = "Add to Favourites";
  //   End of Overview Section

  //   Start of Ingredient Section

  let ingredientSection = document.createElement("div");
  ingredientSection.setAttribute("class", "ingredients-section-container");

  let ingredientSectionheading = document.createElement("h3");
  ingredientSectionheading.textContent = "Ingredients";

  let allIngredientsContainer = document.createElement("div");
  allIngredientsContainer.setAttribute("class", "all-ingredients-item-container");

  recipeIngredients.forEach(async (ingredient) => {
    let ingredientContainer = document.createElement("div");
    ingredientContainer.setAttribute("class", "ingredient-container");

    let ingredientImgTextContainer = document.createElement("div");
    ingredientImgTextContainer.setAttribute("class", "ingredient-img-text-container");

    let ingredientImgContainer = document.createElement("div");
    ingredientImgContainer.setAttribute("class", "ingredient-img-container");

    let overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");

    //Spoonacular Image Base URL
    const imgBaseUrl = "https://img.spoonacular.com/ingredients_500x500/";

    let ingredientImg = document.createElement("img");
    ingredientImg.src = `${imgBaseUrl}${ingredient.ingredientImg}`;
    ingredientImg.alt = ingredient.ingredientName;

    let ingredientNameContainer = document.createElement("div");
    ingredientNameContainer.setAttribute("class", "ingredient-name");

    let ingredientNameText = document.createElement("p");
    ingredientNameText.textContent = ingredient.ingredientName;

    let ingredientAmountContainer = document.createElement("div");
    ingredientAmountContainer.setAttribute("class", "ingredient-amount-container");

    let ingredientAmountText = document.createElement("p");
    ingredientAmountText.textContent = `${ingredient.ingredientAmount} ${ingredient.ingredientUnit}`;

    // Append Ingredient Section Elements
    ingredientAmountContainer.append(ingredientAmountText);

    ingredientNameContainer.append(ingredientNameText);

    ingredientImgContainer.append(ingredientImg, overlay);

    ingredientImgTextContainer.append(ingredientImgContainer, ingredientNameContainer);

    ingredientContainer.append(ingredientImgTextContainer, ingredientAmountContainer);

    allIngredientsContainer.append(ingredientContainer);
  });

  ingredientSection.append(ingredientSectionheading, allIngredientsContainer);

  //   End of Ingredient Section

  //   Start of Cooking Steps Section

  let cookingStepsSection = document.createElement("div");
  cookingStepsSection.setAttribute("class", "cooking-steps-section-container");

  let cookingSectionHeading = document.createElement("h3");
  cookingSectionHeading.textContent = "Cooking Steps";

  let allStepsContainer = document.createElement("div");
  allStepsContainer.setAttribute("class", "all-steps-container");

  recipeCookingSteps.forEach(async (cookingStepData) => {
    let stepContainer = document.createElement("div");
    stepContainer.setAttribute("class", "step-container");

    let stepTextSubtextContainer = document.createElement("div");
    stepTextSubtextContainer.setAttribute("class", "text-subtext-container");

    let stepText = document.createElement("h4");
    stepText.textContent = `Step ${cookingStepData.cookingNumber}`;

    let stepSubtext = document.createElement("p");
    stepSubtext.textContent = cookingStepData.cookingSteps;

    let cookingStepImg = document.createElement("div");
    cookingStepImg.setAttribute("class", "step-img");

    stepTextSubtextContainer.append(stepText, stepSubtext);

    stepContainer.append(stepTextSubtextContainer);

    allStepsContainer.append(stepContainer);
  });

  // Appending Child Element(s) to Parent Element

  backToResultBtn.prepend(backIcon);

  durationText.append(durationTextUnit);

  readyInDuration.append(durationText);

  readyInContainer.append(clockIcon, readyInText);

  timingContainer.append(readyInContainer, readyInDuration);

  ratingReviewsContainer.append(ratingsContainer, reviewTextContainer);

  titleRatingTagsTimingContainer.append(
    recipeTitleText,
    ratingReviewsContainer,
    allTagsContainer,
    timingContainer
  );

  //   Append Overview Section
  addToFavBtn.append(addToFavText);

  headingSubtextContainer.append(SummarySectionHeading, SummarySubText);

  summarySection.append(headingSubtextContainer, addToFavBtn);

  overviewSectionContainer.append(overviewImage, summarySection);

  // Append Cooking Section Step Elements

  cookingStepsSection.append(cookingSectionHeading, allStepsContainer);

  recipePageContainer.append(
    backToResultBtn,
    titleRatingTagsTimingContainer,
    overviewSectionContainer,
    ingredientSection,
    cookingStepsSection
  );
}
