import "./App.css";
import React, { useEffect, useState } from "react";
import Ingredient from "./models/Ingredient";
import Soup from "./models/Soup";
import { ingredients, getRankedSoups } from "./services/SoupService";

interface AppContextInterface {
  toggledIngredients: boolean[];
  toggle: (idx: number) => void;
};

const AppContext = React.createContext<AppContextInterface | null>(null);

function App() {
  const [toggledIngredients, setToggledIngredients] = useState(
    new Array(ingredients.length).fill(false) as boolean[]
  );

  const [recipes, setRecipes] = useState([] as Soup[]);

  const toggle = (idx: number) => {
    const newToggledIngredients = toggledIngredients.map((b, j) => {
      if (j === idx) {
        return !b;
      }
      return b;
    });
    
    setToggledIngredients(() => newToggledIngredients);
  };

  useEffect(() => {
    const selected = toggledIngredients.reduce((agg: Array<Ingredient>, cur, idx) => {
      if (cur) agg.push(ingredients[idx]);
      return agg;
    }, []);

    setRecipes(() => getRankedSoups(selected));
  }, [toggledIngredients]);

  return (
    <AppContext.Provider value={{toggledIngredients, toggle}}>
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
    </AppContext.Provider>
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
