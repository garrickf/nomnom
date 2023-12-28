import { AppContext } from "../App";
import { INGREDIENTS } from "../services/IngredientService";
import { useContext } from "react";
import styled from "styled-components";

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

  const clear = () => {
    if (appContext === null) {
      return;
    }

    const newToggledIngredients = appContext.toggledIngredients.map(
      () => false
    );

    appContext.setToggledIngredients(() => newToggledIngredients);
  };

  const Header = styled.div`
    display: flex;
    padding: 0 0 0.5em 0;
  `;

  const Title = styled.h3`
    margin-bottom: 0;
  `;

  const ClearButton = styled.button`
    align-self: end;
    margin-left: auto;
    text-transform: uppercase;
    border: none;
    background-color: inherit;

    :hover {
      background-color: #d9d9d9;
      border-radius: 5px;
    }
  `;

  const HeaderLine = styled.hr`
    border: 1px solid black;
    margin-top: 0;
  `;

  return (
    <div>
      <Header>
        <Title>Ingredients</Title>
        <ClearButton onClick={() => clear()}>Clear</ClearButton>
      </Header>
      <HeaderLine />
      {INGREDIENTS.map((ingredient) => (
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
