import "./App.css";

import React, { useState } from "react";

import { INGREDIENTS } from "./services/IngredientService";
import IngredientPicker from "./components/IngredientPicker";
import SoupList from "./components/SoupList";

interface AppContextInterface {
  toggledIngredients: boolean[];
  setToggledIngredients: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

function App() {
  const [toggledIngredients, setToggledIngredients] = useState(
    new Array(INGREDIENTS.length).fill(false) as boolean[]
  );

  return (
    <AppContext.Provider value={{ toggledIngredients, setToggledIngredients }}>
      <div>
        <IngredientPicker />
        <SoupList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
