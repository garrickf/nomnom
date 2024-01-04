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

  const toggledIngredients = useContext(AppContext)?.toggledIngredients;

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

  const IngredientsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;

    & .inactive {
      filter: grayscale(100%);
    }
  `;

  const IngredientImgContainer = styled.span`
    display: inline-flex;

    :hover {
      background-color: #d9d9d9;
      border-radius: 50%;
    }
  `;

  const IngredientImg = styled.img`
    height: 2em;
    width: 2em;
  `;

  return (
    <div>
      <Header>
        <Title>Ingredients</Title>
        <ClearButton onClick={() => clear()}>Clear</ClearButton>
      </Header>
      <HeaderLine />
      <IngredientsContainer>
        {INGREDIENTS.map((ingredient) => (
          <IngredientImgContainer>
            <IngredientImg
              key={ingredient.name}
              src={ingredient.svg}
              onClick={() => {
                toggle(ingredient.index);
              }}
              className={
                toggledIngredients !== undefined &&
                toggledIngredients[ingredient.index]
                  ? "active"
                  : "inactive"
              }
              title={ingredient.name}
            />
          </IngredientImgContainer>
        ))}
      </IngredientsContainer>
    </div>
  );
};

export default IngredientPicker;
