import Ingredient from "../models/Ingredient";
import Soup from "../models/Soup";
import RecipeMatrixItem from "../models/RecipeMatrixItem";
import ingredientsJson from "../data/ingredients.json";
import recipeJson from "../data/soupMatrix.json";

const ingredients: Ingredient[] = ingredientsJson;

const recipeMatrix: RecipeMatrixItem[][] = recipeJson;

function getRankedSoups(selectedIngredients: Ingredient[]): Soup[] {
  const pairs: [Ingredient, Ingredient][] = [];

  selectedIngredients.forEach((ingredient, index) => {
    const rightIngredients = selectedIngredients.slice(index);

    rightIngredients.forEach((rightIngredient) => {
      if (ingredient.index >= rightIngredient.index)
        pairs.push([ingredient, rightIngredient]);
      else pairs.push([rightIngredient, ingredient]);
    });
  });

  const recipes: Soup[] = [];

  pairs.forEach((pair) => {
    recipes.push({
      ingredients: [pair[0], pair[1]],
      ...recipeMatrix[pair[0].index][pair[1].index],
    });
  });

  recipes.sort((a, b) => b.value - a.value);

  return recipes;
}

export { ingredients, recipeMatrix, getRankedSoups };
