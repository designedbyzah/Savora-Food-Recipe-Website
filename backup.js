tabsContainer.addEventListener("click", (event) => {
  let userTarget = event.target;
  let clickedTab = userTarget.closest(".tabs-container button");
  if (!clickedTab) {
    return;
  }
  const index = Array.from(tabs).indexOf(clickedTab);

  console.log(index);
});

//Check for input n forms
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.querySelector(".search-inputBar");
    let userInput = input.value;
    console.log(userInput);

    form.reset();
  });
});

// Function for Search Form Validation
function searchInputValidation(formIndex) {
  searchInputBars.forEach((searchInputBar, index) => {
    if (index === formIndex) {
      if (searchInputBar.value.trim() === "") {
        errorValidationTexts[index].textContent = "Enter a search item";
        return false;
      } else {
        errorValidationTexts[index].textContent = "";
        return true;
      }
    }
  });
}

recipeData.forEach((recipe) => {
  const recipeID = recipe.id;

  foodRecipeInformation(recipeID);
});

// SwitchTabs
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

// let numberOfResults = document.getElementById("number-of-results");

//GET Recipe by ID
async function foodRecipeData(userInput) {
  const apiKEY = "b57c0eb865e84768954fa8ec016596b0";
  const recipeEndpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&apiKey=${apiKEY}&number=2`;

  try {
    const response = await fetch(recipeEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const data = await response.json();

    let recipeData = data.results;
    console.log(recipeData);

    //Number of Items Per Result counter
    numberOfResults.textContent = `(${recipeData.length})`;

    for (const recipe of recipeData) {
      const recipeID = recipe.id;

      await foodRecipeInformation(recipeID);
    }
  } catch (error) {
    console.log("Error fecting item data", error);
  }
}

// GET Recipe information using Recipe ID
async function foodRecipeInformation(recipeID) {
  const apiKEY = "b57c0eb865e84768954fa8ec016596b0";
  const recipeInfoEndpoint = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKEY}`;

  try {
    const response = await fetch(recipeInfoEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const recipeInformations = await response.json();

    printToUI(recipeInformations);
  } catch (error) {
    console.log("Error fecting item data", error);
  }
}

// //GET Recipe (Another method)
// async function foodRecipeData(userInput, numberOfResults) {
//   const apiKEY = "ce681a90851b4bf28d743385de191be2";
//   const recipeEndpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&includeIngredients=${userInput}&titleMatch=${userInput}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&apiKey=${apiKEY}&number=2`;

//   try {
//     const response = await fetch(recipeEndpoint);
//     if (!response.ok) {
//       throw new Error(`HTTP Error ${response.status}`);
//     }
//     const data = await response.json();

//     let recipeData = data.results;

//     tabsContainer.style.display = "none";
//     heroSectionContainer.style.display = "none";
//     printToUI(recipeData);

//     // recipeData.forEach((recipe) => {
//     //   printToUI(recipe);
//     // });

//     //Number of Items Per Result counter
//     numberOfResults.textContent = `(${recipeData.length})`;
//   } catch (error) {
//     console.log("Error fecting item data", error);
//   }
// }





const resultContainer = document.getElementById("recipe-result-container");

function printToUI(recipeData) {
  console.log(recipeData);

  resultContainer.innerHTML = "";

  recipeData.forEach((recipe) => {
    let dietaryTags = [];

    let recipeTitle = recipe.title;
    let recipeImage = recipe.image;
    let recipeSummary = recipe.summary.replace(/<\/?[^>]+(>|$)/g, "");
    let recipeCalories = Math.round(recipe.nutrition.nutrients[0].amount);

    let dairyFree = recipe.dairyFree ? "Dairy-free" : null;

    let vegan = recipe.vegan ? "Vegan" : null;

    let vegetarian = recipe.vegetarian ? "Vegetarian" : null;

    let glutenFree = recipe.glutenFree ? "Gluten-free" : null;

    // dietaryTags.length = 0;

    dietaryTags.push(dairyFree, vegan, vegetarian, glutenFree);
    console.log(dietaryTags);

    // Create HTML Elements Dynamically
    let recipeResultCard = document.createElement("div");
    recipeResultCard.classList.add("recipe-result-card");

    let cardImgSection = document.createElement("div");
    cardImgSection.classList.add("img-section-of-card");
    cardImgSection.style.backgroundImage = `url(${recipeImage})`;

    let favIconContainer = document.createElement("div");
    favIconContainer.classList.add("favorite-icon-container");

    let favIcon = document.createElement("svg");
    favIcon.innerHTML = `<svg
 ]
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.24984 3.33325C3.71859 3.33325 1.6665 5.38534 1.6665 7.91659C1.6665 12.4999 7.08317 16.6666 9.99984 17.6358C12.9165 16.6666 18.3332 12.4999 18.3332 7.91659C18.3332 5.38534 16.2811 3.33325 13.7498 3.33325C12.1998 3.33325 10.829 4.10284 9.99984 5.28075C9.5772 4.67876 9.01574 4.18746 8.36298 3.84846C7.71021 3.50945 6.98538 3.33273 6.24984 3.33325Z"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>`;

    let cardContentSection = document.createElement("div");
    cardContentSection.classList.add("content-section-of-card");

    let tagsTitleSubtextContainer = document.createElement("div");
    tagsTitleSubtextContainer.classList.add("tags-and-title-subtext-container");

    // let allTagsContainer = document.createElement("div");
    // allTagsContainer.classList.add("tags-container");

    let allTagsContainer;

    // Looping the "dietaryTags" array to display it's content on UI
    dietaryTags.forEach((dietaryTag) => {
      if (dietaryTag) {
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
      }
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
    viewRecipeBtn.textContent = "View recipe";

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

export default printToUI;




// let favIcon = userTarget.closest(".fav-icon");

    // let favIcon = theClickedRecipeCard.querySelector(".fav-icon");
    // if (!favIcon) {
    //   return;
    // }



    function saveUnsaveRecipe(favIcon, APIrecipeID, recipeTitle) {
      const savedRecipe = arrayOfSavedRecipe.some(
        (savedrecipe) => savedrecipe.id === APIrecipeID
      );
    
      if (favIcon.classList.contains("fav-icon-saved")) {
        favIcon.classList.remove("fav-icon-saved");
        favIcon.classList.add("fav-icon");
        arrayOfSavedRecipe = arrayOfSavedRecipe.filter((item) => item.id !== APIrecipeID);
        localStorage.setItem("recipeInfo", JSON.stringify(arrayOfSavedRecipe));
      } else {
        favIcon.classList.toggle("fav-icon-saved");
    
        arrayOfSavedRecipe.push({ id: APIrecipeID, title: recipeTitle });
    
        localStorage.setItem("recipeInfo", JSON.stringify(arrayOfSavedRecipe));
      }
    }


     // let recipeData = [];

    // for (const recipe of recipeResult) {
    //   const APIrecipeID = recipe.id;

    //   const newRecipeResult = await foodRecipeInformation(APIrecipeID);

    //   recipeData.push(newRecipeResult);
    // }

    //Number of Items Per Result counter
    // numberOfResults.textContent = `(${recipeResult.length})`;



<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="stylesheet" href="home.css" />
    <title>Savora</title>
  </head>

  <body>
    <div class="overall-container">
      <div class="overall-scroll-container">
        <!-- Header -->
        <header id="header">
          <div class="logo-and-text-container">
            <div class="logo-container">
              <img src="./images/Savora logo without texxt.png" alt="Savora logo" />
            </div>
            <h2>Savora</h2>
          </div>
          <!-- Nav Links -->
          <nav>
            <ul>
              <li><a href="#" class="header-nav-links" id="home-link">Home</a></li>
              <li><a href="#" class="header-nav-links">Favourites</a></li>
            </ul>
          </nav>

          <form class="header-form search-form">
            <input type="text" class="header-search-input search-inputBar" placeholder="Search" />
            <div>
              <p class="form-validation-error-state"></p>
            </div>
          </form>

          <button type="button" class="header-search-icon-btn" id="header-search-icon-btn">
            <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.5 22L20.5 20"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </header>

        <!-- Hero Section -->

        <section class="hero-section-container" id="hero-section-container">
          <div class="hero-section-content-conatiner">
            <button type="button" class="tagLine-hero">
              <img src="./images/Food Wrap img.png" alt="tagline icon" />
              True recipes
            </button>

            <div class="hero-section-title-and-subtext-container">
              <div><h1>Explore Exquisite Recipes & Savor Every Experience</h1></div>
              <div><p>Discover curated recipes tailored to your taste.</p></div>
            </div>

            <form class="hero-section-form search-form">
              <div class="searchIcon-inputfield-button-container">
                <div class="searchIcon-inputfield-container">
                  <div class="searchIcon-container">
                    <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22.5 22L20.5 20"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>

                  <input
                    type="text"
                    class="search-input search-inputBar"
                    placeholder="Search by dish, or cuisine..."
                  />
                </div>

                <button type="submit" class="search-btn" id="search-btn">Search</button>
              </div>
              <div>
                <p class="form-validation-error-state"></p>
              </div>
            </form>
          </div>
        </section>
        <!-- End of Hero Section -->

        <section class="content-area" id="">
          <div class="tabs-container" id="tabs-container">
            <button type="button" class="tab-active" data-action="breakfast">
              <img src="./icons/burger.png" alt="Breakfast" />Breakfast
            </button>

            <button type="button" data-action="lunch">
              <img src="./icons/Lunch 2.svg" alt="Lunch" />Lunch
            </button>

            <button type="button" data-action="dinner">
              <img src="./icons/Dinner 2.svg" alt="Dinner" />Dinner
            </button>

            <button type="button" data-action="dessert">
              <img src="./icons/Dessert 2.svg" alt="Dessert" />Dessert
            </button>
          </div>

          <div class="textTitle-filter-and-result-container">
            <div class="textTitle-and-filter-container">
              <h2>ALL <span id="number-of-results">(0)</span></h2>
              <button type="button" class="filter-btn">
                <svg
                  data-slot="icon"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                  ></path>
                </svg>
                Filters
              </button>
            </div>
            <div
              class="recipe-result-container recipe-result-container-active"
              id="recipe-result-container"
            >
              <!--Breakfast Recipe Card  -->
              <div class="recipe-result-card">
                <div class="img-section-of-card">
                  <div class="favorite-icon-container">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.24984 3.33325C3.71859 3.33325 1.6665 5.38534 1.6665 7.91659C1.6665 12.4999 7.08317 16.6666 9.99984 17.6358C12.9165 16.6666 18.3332 12.4999 18.3332 7.91659C18.3332 5.38534 16.2811 3.33325 13.7498 3.33325C12.1998 3.33325 10.829 4.10284 9.99984 5.28075C9.5772 4.67876 9.01574 4.18746 8.36298 3.84846C7.71021 3.50945 6.98538 3.33273 6.24984 3.33325Z"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div class="content-section-of-card">
                  <div class="tags-and-title-subtext-container">
                    <div class="tags-container">
                      <div class="tags">
                        <p>Vegan</p>
                      </div>
                      <div class="tags">
                        <p>Gluten-free</p>
                      </div>
                      <div class="tags">
                        <p>Vegetarian</p>
                      </div>
                      <div class="tags">
                        <p>Keto</p>
                      </div>
                    </div>

                    <div class="recipe-card-title-and-subtext-container">
                      <div><h3>Fluffy Buttermilk Pancakes</h3></div>
                      <div>
                        <p>
                          Start your day with our Buttermilk Pancakes, served hot and fresh with a
                          drizzle of maple syrup.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="calories-and-viewRecipeButton-container">
                    <div class="calories-and-icon-container">
                      <i class="fa-solid fa-fire"></i>
                      <p>274 Calories</p>
                    </div>

                    <button type="button" class="view-recipe-btn">View Recipe</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="recipe-result-container">
              <!-- Lunch Recipe Card  -->
              <div class="recipe-result-card">
                <div class="img-section-of-card">
                  <div class="favorite-icon-container">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.24984 3.33325C3.71859 3.33325 1.6665 5.38534 1.6665 7.91659C1.6665 12.4999 7.08317 16.6666 9.99984 17.6358C12.9165 16.6666 18.3332 12.4999 18.3332 7.91659C18.3332 5.38534 16.2811 3.33325 13.7498 3.33325C12.1998 3.33325 10.829 4.10284 9.99984 5.28075C9.5772 4.67876 9.01574 4.18746 8.36298 3.84846C7.71021 3.50945 6.98538 3.33273 6.24984 3.33325Z"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div class="content-section-of-card">
                  <div class="tags-and-title-subtext-container">
                    <div class="tags-container">
                      <div class="tags">
                        <p>Flour</p>
                      </div>
                      <div class="tags">
                        <p>Eggs</p>
                      </div>
                      <div class="tags">
                        <p>Syrup</p>
                      </div>
                      <div class="tags">
                        <p>Whipped Cream</p>
                      </div>
                      <div class="tags">
                        <p>+5</p>
                      </div>
                      <!-- End of tags container -->
                    </div>

                    <div class="recipe-card-title-and-subtext-container">
                      <div><h3>Lunch Card</h3></div>
                      <div>
                        <p>
                          Start your day with our Buttermilk Pancakes, served hot and fresh with a
                          drizzle of maple syrup.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="calories-and-viewRecipeButton-container">
                    <div class="calories-and-icon-container">
                      <i class="fa-solid fa-fire"></i>
                      <p>274 Calories</p>
                    </div>

                    <button type="button" class="view-recipe-btn">View Recipe</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="recipe-result-container">
              <!--Dinner Recipe Card  -->
              <div class="recipe-result-card">
                <div class="img-section-of-card">
                  <div class="favorite-icon-container">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.24984 3.33325C3.71859 3.33325 1.6665 5.38534 1.6665 7.91659C1.6665 12.4999 7.08317 16.6666 9.99984 17.6358C12.9165 16.6666 18.3332 12.4999 18.3332 7.91659C18.3332 5.38534 16.2811 3.33325 13.7498 3.33325C12.1998 3.33325 10.829 4.10284 9.99984 5.28075C9.5772 4.67876 9.01574 4.18746 8.36298 3.84846C7.71021 3.50945 6.98538 3.33273 6.24984 3.33325Z"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div class="content-section-of-card">
                  <div class="tags-and-title-subtext-container">
                    <div class="tags-container">
                      <div class="tags">
                        <p>Flour</p>
                      </div>
                      <div class="tags">
                        <p>Eggs</p>
                      </div>
                      <div class="tags">
                        <p>Syrup</p>
                      </div>
                      <div class="tags">
                        <p>Whipped Cream</p>
                      </div>
                      <div class="tags">
                        <p>+5</p>
                      </div>
                      <!-- End of tags container -->
                    </div>

                    <div class="recipe-card-title-and-subtext-container">
                      <div><h3>Dinner Card</h3></div>
                      <div>
                        <p>
                          Start your day with our Buttermilk Pancakes, served hot and fresh with a
                          drizzle of maple syrup.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="calories-and-viewRecipeButton-container">
                    <div class="calories-and-icon-container">
                      <i class="fa-solid fa-fire"></i>
                      <p>274 Calories</p>
                    </div>

                    <button type="button" class="view-recipe-btn">View Recipe</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="recipe-result-container">
              <!--Dessert Recipe Card -->
              <div class="recipe-result-card">
                <div class="img-section-of-card">
                  <div class="favorite-icon-container">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.24984 3.33325C3.71859 3.33325 1.6665 5.38534 1.6665 7.91659C1.6665 12.4999 7.08317 16.6666 9.99984 17.6358C12.9165 16.6666 18.3332 12.4999 18.3332 7.91659C18.3332 5.38534 16.2811 3.33325 13.7498 3.33325C12.1998 3.33325 10.829 4.10284 9.99984 5.28075C9.5772 4.67876 9.01574 4.18746 8.36298 3.84846C7.71021 3.50945 6.98538 3.33273 6.24984 3.33325Z"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div class="content-section-of-card">
                  <div class="tags-and-title-subtext-container">
                    <div class="tags-container">
                      <div class="tags">
                        <p>Flour</p>
                      </div>
                      <div class="tags">
                        <p>Eggs</p>
                      </div>
                      <div class="tags">
                        <p>Syrup</p>
                      </div>
                      <div class="tags">
                        <p>Whipped Cream</p>
                      </div>
                      <div class="tags">
                        <p>+5</p>
                      </div>
                      <!-- End of tags container -->
                    </div>

                    <div class="recipe-card-title-and-subtext-container">
                      <div><h3>Dessert Card</h3></div>
                      <div>
                        <p>
                          Start your day with our Buttermilk Pancakes, served hot and fresh with a
                          drizzle of maple syrup.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="calories-and-viewRecipeButton-container">
                    <div class="calories-and-icon-container">
                      <i class="fa-solid fa-fire"></i>
                      <p>274 Calories</p>
                    </div>

                    <button type="button" class="view-recipe-btn">View Recipe</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- End of recipe result card container-->
          </div>
        </section>
        <!-- End of content area -->

        <footer class="footer">
          <div class="subscribe-to-newsletter-container">
            <div><h3>Subscribe to our newsletter</h3></div>
            <form class="footer-section-form">
              <div class="newsletter-inputfield-button-container">
                <input type="text" class="newsletter-input" placeholder="Enter email address" />
                <button type="submit" class="subscribe-btn">Subscribe</button>
              </div>
              <div>
                <p class="newsletter-validation-error-state">Enter a valid email</p>
              </div>
            </form>
            <img
              src="./images/Wavy Buddies Torso.png"
              alt="footer image"
              class="footer-illustration-img"
            />
          </div>

          <div class="footer-links-social-links-copyright-container">
            <div class="footerlinks-sociallinks-container">
              <div class="savora-logo-footerlinks-container">
                <img
                  src="./images/Savora Footer logo.png"
                  alt="savora footer logo"
                  class="savora-footer-logo"
                />
                <ul>
                  <li><a href="#" class="footer-links">Home</a></li>
                  <li><a href="#" class="footer-links">Favourites</a></li>
                </ul>
              </div>

              <div class="social-links-container">
                <!-- Instagram link -->
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="0.582275" width="40" height="40" rx="20" fill="#303030" />
                  <g clip-path="url(#clip0_489_6531)">
                    <path
                      d="M20 12.5823C22.1736 12.5823 22.4448 12.5903 23.2976 12.6303C24.1496 12.6703 24.7296 12.8039 25.24 13.0023C25.768 13.2055 26.2128 13.4807 26.6576 13.9247C27.0644 14.3246 27.3792 14.8083 27.58 15.3423C27.7776 15.8519 27.912 16.4327 27.952 17.2847C27.9896 18.1375 28 18.4087 28 20.5823C28 22.7559 27.992 23.0271 27.952 23.8799C27.912 24.7319 27.7776 25.3119 27.58 25.8223C27.3797 26.3565 27.0649 26.8404 26.6576 27.2399C26.2576 27.6465 25.7738 27.9613 25.24 28.1623C24.7304 28.3599 24.1496 28.4943 23.2976 28.5343C22.4448 28.5719 22.1736 28.5823 20 28.5823C17.8264 28.5823 17.5552 28.5743 16.7024 28.5343C15.8504 28.4943 15.2704 28.3599 14.76 28.1623C14.2259 27.9619 13.742 27.647 13.3424 27.2399C12.9355 26.84 12.6207 26.3563 12.42 25.8223C12.2216 25.3127 12.088 24.7319 12.048 23.8799C12.0104 23.0271 12 22.7559 12 20.5823C12 18.4087 12.008 18.1375 12.048 17.2847C12.088 16.4319 12.2216 15.8527 12.42 15.3423C12.6202 14.808 12.935 14.3241 13.3424 13.9247C13.7421 13.5177 14.2259 13.2029 14.76 13.0023C15.2704 12.8039 15.8496 12.6703 16.7024 12.6303C17.5552 12.5927 17.8264 12.5823 20 12.5823ZM20 16.5823C18.9391 16.5823 17.9217 17.0037 17.1716 17.7538C16.4214 18.504 16 19.5214 16 20.5823C16 21.6431 16.4214 22.6606 17.1716 23.4107C17.9217 24.1608 18.9391 24.5823 20 24.5823C21.0609 24.5823 22.0783 24.1608 22.8284 23.4107C23.5786 22.6606 24 21.6431 24 20.5823C24 19.5214 23.5786 18.504 22.8284 17.7538C22.0783 17.0037 21.0609 16.5823 20 16.5823V16.5823ZM25.2 16.3823C25.2 16.1171 25.0946 15.8627 24.9071 15.6752C24.7196 15.4876 24.4652 15.3823 24.2 15.3823C23.9348 15.3823 23.6804 15.4876 23.4929 15.6752C23.3054 15.8627 23.2 16.1171 23.2 16.3823C23.2 16.6475 23.3054 16.9018 23.4929 17.0894C23.6804 17.2769 23.9348 17.3823 24.2 17.3823C24.4652 17.3823 24.7196 17.2769 24.9071 17.0894C25.0946 16.9018 25.2 16.6475 25.2 16.3823ZM20 18.1823C20.6365 18.1823 21.247 18.4351 21.6971 18.8852C22.1471 19.3353 22.4 19.9458 22.4 20.5823C22.4 21.2188 22.1471 21.8292 21.6971 22.2793C21.247 22.7294 20.6365 22.9823 20 22.9823C19.3635 22.9823 18.753 22.7294 18.3029 22.2793C17.8529 21.8292 17.6 21.2188 17.6 20.5823C17.6 19.9458 17.8529 19.3353 18.3029 18.8852C18.753 18.4351 19.3635 18.1823 20 18.1823V18.1823Z"
                      fill="#FCCE0B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_489_6531">
                      <rect width="16" height="16" fill="white" transform="translate(12 12.5823)" />
                    </clipPath>
                  </defs>
                </svg>
                <!-- X link -->
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="0.582275" width="40" height="40" rx="20" fill="#303030" />
                  <path
                    d="M23.8342 14.5823H25.8788L21.4122 19.6656L26.6668 26.5823H22.5522L19.3302 22.3869L15.6428 26.5823H13.5962L18.3742 21.1456L13.3335 14.5823H17.5522L20.4655 18.4169L23.8342 14.5823ZM23.1168 25.3636H24.2502L16.9362 15.7369H15.7202L23.1168 25.3636Z"
                    fill="#FCCE0B"
                  />
                </svg>
                <!-- facebook link -->
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="0.582275" width="40" height="40" rx="20" fill="#303030" />
                  <g clip-path="url(#clip0_489_6527)">
                    <path
                      d="M20 12.5823C15.5816 12.5823 12 16.1857 12 20.631C12 24.6481 14.9256 27.9778 18.7504 28.5823V22.957H16.7184V20.631H18.7504V18.8578C18.7504 16.8408 19.944 15.7269 21.772 15.7269C22.6472 15.7269 23.5624 15.8839 23.5624 15.8839V17.8638H22.5544C21.56 17.8638 21.2504 18.4844 21.2504 19.121V20.631H23.4688L23.1144 22.957H21.2504V28.5823C25.0744 27.9786 28 24.6473 28 20.631C28 16.1857 24.4184 12.5823 20 12.5823Z"
                      fill="#FCCE0B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_489_6527">
                      <rect width="16" height="16" fill="white" transform="translate(12 12.5823)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <div class="copyright-text-container">
              <p>&copy; 2024. Designed and Built by ZAH.</p>
            </div>
          </div>
        </footer>
      </div>
      <!-- End of overall scroll container
        -->
    </div>
    <script src="main.js" type="module"></script>
  </body>
</html>
