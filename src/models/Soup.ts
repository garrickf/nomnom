import Ingredient from "./Ingredient";

interface Soup {
  name: string;
  ingredients: readonly [Ingredient, Ingredient];
  value: number;
}

export default Soup;
