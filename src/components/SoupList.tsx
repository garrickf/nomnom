import { getRankedSoups, ingredients } from "../services/SoupService";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../App";
import Ingredient from "../models/Ingredient";
import Soup from "../models/Soup";
import SoupListItem from "./SoupListItem";

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
        <SoupListItem key={soup.name} {...soup} />
      ))}
    </div>
  );
};

export default SoupList;
