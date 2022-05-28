import Ingredient from './Ingredient';

interface Recipe {
  name: string;
  ingredients: readonly [Ingredient, Ingredient];
  value: number;
}

export default Recipe;