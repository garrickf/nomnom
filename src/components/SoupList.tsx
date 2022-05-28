import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Ingredient from "../models/Ingredient";
import Soup from "../models/Soup";
import { ingredients, getRankedSoups } from "../services/SoupService";

const SoupList = () => {
  const appContext = useContext(AppContext);
  const [recipes, setRecipes] = useState([] as Soup[]);

  useEffect(() => {
    const selected =
      appContext?.toggledIngredients.reduce(
        (agg: Array<Ingredient>, cur, idx) => {
          if (cur) agg.push(ingredients[idx]);
          return agg;
        },
        []
      ) ?? [];

    setRecipes(() => getRankedSoups(selected));
  }, [appContext]);

  return (
    <div>
      {recipes.map((soup) => (
        <SoupRow key={soup.name} {...soup} />
      ))}
    </div>
  );
};

interface SoupProps {
  name: string;
  ingredients: readonly [Ingredient, Ingredient];
  value: number;
}

const SoupRow = (props: SoupProps) => (
  <div>
    {props.name} {props.value} Ingredients: {props.ingredients[0].name} and{" "}
    {props.ingredients[1].name}
  </div>
);

export default SoupList;
