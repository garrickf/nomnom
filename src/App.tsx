import "./App.css";
import React, { useState } from "react";
import { ingredients } from "./services/SoupService";
import SoupList from "./components/SoupList";

interface AppContextInterface {
  toggledIngredients: boolean[];
  setToggledIngredients: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

function App() {
  const [toggledIngredients, setToggledIngredients] = useState(
    new Array(ingredients.length).fill(false) as boolean[]
  );

  const toggle = (idx: number) => {
    const newToggledIngredients = toggledIngredients.map((b, j) => {
      if (j === idx) {
        return !b;
      }
      return b;
    });

    setToggledIngredients(() => newToggledIngredients);
  };

  return (
    <AppContext.Provider value={{ toggledIngredients, setToggledIngredients }}>
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
        <SoupList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
