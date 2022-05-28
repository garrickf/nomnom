import "./App.css";
import React, { useEffect, useState } from "react";
import Ingredient from "./models/Ingredient";
import Soup from "./models/Soup";
import { ingredients, getRankedSoups } from "./services/SoupService";

interface AppContextInterface {
  toggledIngredients: boolean[];
};

const AppCtx = React.createContext<AppContextInterface>({toggledIngredients: ingredients.map((i) => false)});

function App() {
  const [toggledArr, setToggledArr] = useState(
    new Array(ingredients.length).fill(false) as boolean[]
  );

  const [recipes, setRecipes] = useState([] as Soup[]);

  const toggle = (idx: number) => {
    const newToggledArr = toggledArr.map((b, j) => {
      if (j === idx) {
        return !b;
      }
      return b;
    });
    
    setToggledArr(() => newToggledArr);
  };

  useEffect(() => {
    const selected = toggledArr.reduce((agg: Array<Ingredient>, cur, idx) => {
      if (cur) agg.push(ingredients[idx]);
      return agg;
    }, []);

    setRecipes(() => getRankedSoups(selected));
  }, [toggledArr]);

  return (
    <AppCtx.Provider value={context}>
      <div>
        <div>
          {ingredients.map((ingredient) => (
            <button
              key={ingredient.name}
              onClick={() => {
                toggle(ingredient.index);
              }}
            >
              {ingredient.name}
            </button>
          ))}
        </div>
        <div>
          {recipes.map((soup) => (
            <SoupRow key={soup.name} {...soup} />
          ))}
        </div>
      </div>
    </AppCtx.Provider>
  );
}

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

export default App;
