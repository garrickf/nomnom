import "./App.css";
import React, { useState } from "react";
import { ingredients } from "./services/SoupService";
import SoupList from "./components/SoupList";
import IngredientPicker from "./components/IngredientPicker";

interface AppContextInterface {
  toggledIngredients: boolean[];
  setToggledIngredients: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

function App() {
  const [toggledIngredients, setToggledIngredients] = useState(
    new Array(ingredients.length).fill(false) as boolean[]
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
