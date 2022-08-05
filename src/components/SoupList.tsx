import { useContext, useEffect, useState } from "react";

import { AppContext } from "../App";
import { INGREDIENTS } from "../services/IngredientService";
import Ingredient from "../models/Ingredient";
import Soup from "../models/Soup";
import SoupListItem from "./SoupListItem";
import { getRankedSoups } from "../services/SoupService";

const SoupList = () => {
  const appContext = useContext(AppContext);
  const [recipes, setRecipes] = useState([] as Soup[]);

  useEffect(() => {
    const selected =
      appContext?.toggledIngredients.reduce(
        (agg: Array<Ingredient>, toggled, idx) => {
          if (toggled) agg.push(INGREDIENTS[idx]);
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
