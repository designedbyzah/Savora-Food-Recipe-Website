// Function to Fetch Ingredient Data
export function recipeIngredientsData(recipeData) {
  let recipeIngredients = recipeData.extendedIngredients;

  const ingredientsData = recipeIngredients
    .map((recipeIngredient) => {
      let ingredientName = recipeIngredient.nameClean || recipeIngredient.name;
      let ingredientImg = recipeIngredient.image;
      let ingredientAmount = recipeIngredient.amount;

      let ingredientUnit = recipeIngredient.unit;
      ingredientUnit =
        ingredientUnit === "tsp"
          ? "Teaspoon"
          : ingredientUnit === "Tbs" || ingredientUnit === "tbsp"
            ? "Tablespoon"
            : ingredientUnit;

      //Capitalization of Ingredient Name
      ingredientName = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);

      //Capitalization of Ingredient Unit
      ingredientUnit = ingredientUnit.charAt(0).toUpperCase() + ingredientUnit.slice(1);

      //Round Ingredient Amount to 2 decimal places
      ingredientAmount = parseFloat(ingredientAmount.toFixed(2));

      return {
        ingredientName,
        ingredientImg,
        ingredientAmount,
        ingredientUnit,
      };
    })
    .filter((ingredient) => ingredient.ingredientImg);

  return ingredientsData;
}

// Function to Fetch Cooking Steps and Instructions
export function recipeCookingStepsData(recipeData) {
  if (recipeData.analyzedInstructions && recipeData.analyzedInstructions.length > 0) {
    let recipeCookingSteps = recipeData.analyzedInstructions[0].steps;

    if (recipeCookingSteps && recipeCookingSteps.length > 0) {
      recipeCookingSteps = recipeCookingSteps.map((item) => {
        let cookingNumber = item.number;
        let cookingSteps = item.step;

        return {
          cookingNumber,
          cookingSteps,
        };
      });

      return recipeCookingSteps;
    } else {
      console.log("Error: No steps available in the API response.");
    }
  } else {
    console.log("Error: AnalyzedInstructions or steps are missing from the API response.");
  }
}

// Function to Fetch Dietary Tags
export function getDietaryTags(recipe) {
  let dietaryTags = [];
  let dairyFree = recipe.dairyFree ? "Dairy-free" : null;

  let vegan = recipe.vegan ? "Vegan" : null;

  let vegetarian = recipe.vegetarian ? "Vegetarian" : null;

  let glutenFree = recipe.glutenFree ? "Gluten-free" : null;

  if (dairyFree) dietaryTags.push(dairyFree);
  if (vegan) dietaryTags.push(vegan);
  if (vegetarian) dietaryTags.push(vegetarian);
  if (glutenFree) dietaryTags.push(glutenFree);

  if (dietaryTags.length <= 1) {
    dietaryTags.push("Standard Recipe", "Classic");
  }

  return dietaryTags;
}
