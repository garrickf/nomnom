import Soup from "../models/Soup";
import styled from "styled-components";

enum Rarity {
  COMMON,
  UNCOMMON,
  RARE,
  LEGENDARY,
  EXOTIC,
}

const getRarity = (value: number): Rarity => {
  let rarity;
  if (value <= 100) {
    rarity = Rarity.COMMON;
  } else if (value < 200) {
    rarity = Rarity.UNCOMMON;
  } else if (value <= 270) {
    rarity = Rarity.RARE;
  } else if (value < 350) {
    rarity = Rarity.LEGENDARY;
  } else {
    rarity = Rarity.EXOTIC;
  }

  return rarity;
};

const rarityToBGColor = (rarity: Rarity): string => {
  switch (rarity) {
    case Rarity.COMMON:
      return "--rarity-gray";
    case Rarity.UNCOMMON:
      return "--rarity-green";
    case Rarity.RARE:
      return "--rarity-blue";
    case Rarity.LEGENDARY:
      return "--rarity-purple";
    case Rarity.EXOTIC:
      return "--rarity-yellow";
  }
};

const rarityToTextColor = (rarity: Rarity): string => {
  switch (rarity) {
    case Rarity.COMMON:
    case Rarity.EXOTIC:
      return "black";
    default:
      return "white";
  }
};

const SoupListItemContainer = styled.div`
  font-size: 1.1em;
  padding: 0.1em 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
`;

const SoupValue = styled.div<{ rarity: Rarity }>`
  background-color: var(${(props) => rarityToBGColor(props.rarity)});
  padding: 4px;
  margin-right: 0.5em;
  border-radius: 4px;
  text-align: center;
  font-weight: var(--weight-500-medium);
  font-variant-numeric: proportional-nums;
  color: ${(props) => rarityToTextColor(props.rarity)};
  grid-column-start: 1;
  grid-row-start: 1;
  align-self: center;
`;

const SoupTitle = styled.h2`
  font-size: 1.3em;
  font-weight: var(--weight-600-semibold);
  margin: 0;
  align-self: center;
  grid-column-start: 2;
  grid-row-start: 1;
`;

const SoupIngredients = styled.div`
  margin-top: 0.3em;
  grid-column-start: 2;
  grid-row-start: 2;
  display: flex;
  flex-wrap: wrap;
`;

const Ingredient = styled.div`
  white-space: nowrap;
`;

const Plus = styled.div`
  margin-right: 0.3em;

  ::before {
    content: "+";
  }
`;

const IngredientImg = styled.img`
  height: 1.1em;
  padding: 0 0.3em 0 0.2em;
  margin-left: 0.2em;
`;

const SoupListItem = (props: Soup) => {
  const rarity = getRarity(props.value);

  return (
    <SoupListItemContainer>
      <SoupValue rarity={rarity}>{props.value}</SoupValue>
      <SoupTitle>{props.name}</SoupTitle>
      <SoupIngredients>
        <Ingredient>
          {props.ingredients[0].name}
          <IngredientImg src={props.ingredients[0].svg} />
        </Ingredient>
        <Plus />
        <Ingredient>
          {props.ingredients[1].name}
          <IngredientImg src={props.ingredients[1].svg} />
        </Ingredient>
      </SoupIngredients>
    </SoupListItemContainer>
  );
};

export default SoupListItem;
