
import Ingredient from "../models/Ingredient";
import Recipe from "../models/Recipe";
import RecipeMatrixItem from "../models/RecipeMatrixItem";
import ingredientsJson from '../ingredients.json';
import recipeJson from "../recipe_matrix.json";

const ingredients: Ingredient[] = ingredientsJson;
const recipeMatrix: RecipeMatrixItem[][] = recipeJson;

function getRankedRecipes(selectedIngredients: Ingredient[]) : Recipe[] {
  const pairs: [Ingredient, Ingredient][] = [];
  
  selectedIngredients.forEach((ingredient, index) => {
    const rightIngredients = selectedIngredients.slice(index);
    
    rightIngredients.forEach((rightIngredient) => {
      if (ingredient.index >= rightIngredient.index)
        pairs.push([ingredient, rightIngredient]);
      else
        pairs.push([rightIngredient, ingredient])
    });
  });

  const recipes: Recipe[] = [];

  pairs.forEach((pair) => {
    recipes.push({
      ingredients: [pair[0], pair[1]],
      ...recipeMatrix[pair[0].index][pair[1].index]
    });
  });

  recipes.sort((a, b) => b.value - a.value);

  return recipes;
}

export {ingredients, recipeMatrix, getRankedRecipes};