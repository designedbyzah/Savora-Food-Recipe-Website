import { dummy } from "./dummy.js";
import { printToUI } from "./printToUI.js";
import { hideHeroAndTabs, hideLoadingScreen, showLoadingScreen } from "./utility.js";

const tabsContainer = document.getElementById("tabs-container");
const heroSectionContainer = document.getElementById("hero-section-container");
const contentArea = document.getElementById("content-area");
const pageTitle = document.getElementById("page-title");

//GET Recipe by ID
async function foodRecipeData(userInput) {
  // const urlParam = new URLSearchParams(window.location.search);
  // const userInput = urlParam.get("query");

  const apiKEY = "b57c0eb865e84768954fa8ec016596b0";
  const recipeEndpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&includeIngredients=${userInput}&titleMatch=${userInput}&apiKey=${apiKEY}&number=15`;

  try {
    // Show loading screen
    showLoadingScreen();

    const response = await fetch(recipeEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const data = await response.json();

    let recipeResult = data.results;

    let recipeData = [];

    const APIrecipeIDs = recipeResult.map((recipe) => recipe.id);

    for (const APIrecipeID of APIrecipeIDs) {
      const newRecipeResult = await foodRecipeInformation(APIrecipeID);

      recipeData.push(newRecipeResult);
    }

    //Function to hide Hero and Tabs
    hideHeroAndTabs(tabsContainer, heroSectionContainer, contentArea);

    // Updating broswer URL
    // history.pushState(
    //   { userQuery: userInput, searchedData: recipeData },
    //   "",
    //   `./home.html?searchResult=${encodeURIComponent(userInput)}`
    // );

    //Store recipeData in Session Storage
    // const queryAndRecipeData = {
    //   queryInput: userInput,
    //   recipeResult: recipeData,
    // };
    // sessionStorage.setItem("renderedData", JSON.stringify(queryAndRecipeData));

    //Page Title
    if (userInput) {
      pageTitle.textContent = `Search result for "${userInput.charAt(0).toUpperCase()}${userInput.slice(1)}"`;
    }

    // Render API Response
    printToUI(recipeData, userInput);

    return recipeData;
  } catch (error) {
    console.log("Error fecting item data", error);
  } finally {
    //Hide Loading Screen
    hideLoadingScreen();
  }
}

// GET Recipe information using Recipe ID
async function foodRecipeInformation(APIrecipeID) {
  const apiKEY = "b57c0eb865e84768954fa8ec016596b0";
  const recipeInfoEndpoint = `https://api.spoonacular.com/recipes/${APIrecipeID}/information?apiKey=${apiKEY}&includeNutrition=true`;

  try {
    const response = await fetch(recipeInfoEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const recipeResult = await response.json();

    return recipeResult;
  } catch (error) {
    console.log("Error fecting item data", error);
  }
}

// GET Recipe by Category (Breakfast, Lunch, Dinner, Dessert.....)
async function recipeDataByCategory(mealType) {
  const apiKEY = "5b5b40e11cd740848f9bbe8da6f4934e";

  const recipeEndpoint = `https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&sort=random&apiKey=${apiKEY}&number=8`;

  try {
    // Show loading screen
    showLoadingScreen();

    const response = await fetch(recipeEndpoint);
    if (!response.ok) {
      throw new Error("HTTP Error", `${response.status}`);
    }
    const data = await response.json();
    let recipeResult = data.results;

    let recipeData = [];

    const APIrecipeIDs = recipeResult.map((recipe) => recipe.id);

    for (const APIrecipeID of APIrecipeIDs) {
      const newRecipeResult = await foodRecipeInformation(APIrecipeID);

      recipeData.push(newRecipeResult);
    }

    // let recipeData = dummy;

    printToUI(recipeData);
  } catch (error) {
    console.log("Error fetching data", error);
  } finally {
    //Hide Loading Screen
    hideLoadingScreen();
  }
}

export { foodRecipeData, recipeDataByCategory };
