import printToUI from "./printToUI.js";

const tabsContainer = document.getElementById("tabs-container");
const heroSectionContainer = document.getElementById("hero-section-container");
const contentArea = document.getElementById("content-area");

//GET Recipe by ID
async function foodRecipeData(userInput) {
  const apiKEY = "5b5b40e11cd740848f9bbe8da6f4934e";
  const recipeEndpoint = `https://api.spoonacular.com/recipes/complexSearch?query=${userInput}&includeIngredients=${userInput}&titleMatch=${userInput}&apiKey=${apiKEY}&number=2`;

  try {
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

    tabsContainer.style.display = "none";
    heroSectionContainer.style.display = "none";
    contentArea.style.marginTop = "3rem";

    printToUI(recipeData);
  } catch (error) {
    console.log("Error fecting item data", error);
  }
}

// GET Recipe information using Recipe ID
async function foodRecipeInformation(APIrecipeID) {
  const apiKEY = "5b5b40e11cd740848f9bbe8da6f4934e";
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
  const apiKEY = "b57c0eb865e84768954fa8ec016596b";

  const recipeEndpoint = `https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&sort=random&apiKey=${apiKEY}&number=2`;

  try {
    const response = await fetch(recipeEndpoint);
    if (!response.ok) {
      throw new Error("HTTP Error", `${response.status}`);
    }
    const data = await response.json();
    let recipeData = data.results;

    printToUI(recipeData);
  } catch (error) {
    console.log("Error fetching data", error);
  }
}

export { foodRecipeData, recipeDataByCategory };
