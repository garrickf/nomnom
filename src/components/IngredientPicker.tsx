import { useContext } from "react";
import { AppContext } from "../App";
import { ingredients } from "../services/SoupService";

const IngredientPicker = () => {
  const appContext = useContext(AppContext);

  const toggle = (idx: number) => {
    if (appContext === null) {
      return;
    }

    const newToggledIngredients = appContext.toggledIngredients.map((b, j) => {
      if (j === idx) {
        return !b;
      }
      return b;
    });

    appContext.setToggledIngredients(() => newToggledIngredients);
  };

  return (
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
  );
};

export default IngredientPicker;
