import "./App.css";

import React, { useEffect, useState } from "react";

import recipeMatrix from "./recipe_matrix.json";

const ingredients = [
  "Bluecap",
  "Greenstalk",
  "Stabgrass",
  "Brineweed",
  "Tsutavine",
  "Tomaty Steak",
  "Oxygrass",
  "Corn Shell",
  "Chickenberry",
  "Bisausage",
  "Strawburi Filet",
  "Sunblossom",
  "Squidfly Chunk",
  "Pinapurana Filet",
  "Poisonpuff",
  "Kabo Chunk",
  "Thornstalk",
  "Thornbloom",
  "Masher Yam",
  "Mammoth Meat",
];

const getRankedRecipes = (
  primaryIndices: Array<number>,
  secondaryIndices: Array<number>
) => {
  const pairs = new Set(
    primaryIndices
      .map((i) =>
        secondaryIndices.map((j) => JSON.stringify([i, j].sort().reverse()))
      )
      .flat()
  );

  const results = Array.from(pairs).map((s): SoupProps => {
    const [i, j]: number[] = JSON.parse(s);
    return {
      ingredients: [ingredients[i], ingredients[j]],
      ...recipeMatrix[i][j],
    };
  });

  return results.sort((a, b) => a.value - b.value).reverse();
};

function App() {
  const [toggledArr, setToggledArr] = useState(
    new Array(ingredients.length).fill(false)
  );
  const [recipes, setRecipes] = useState(getRankedRecipes([], []));

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
    const indices = toggledArr.reduce((agg: Array<number>, cur, idx) => {
      if (cur) agg.push(idx);
      return agg;
    }, []);

    setRecipes(() => getRankedRecipes(indices, indices));
  }, [toggledArr]);

  return (
    <div>
      <div>
        {ingredients.map((ingredient, idx) => (
          <button
            key={ingredient}
            onClick={() => {
              toggle(idx);
            }}
          >
            {ingredient}
          </button>
        ))}
      </div>
      <div>
        {recipes.map((soup) => (
          <SoupRow key={soup.name} {...soup} />
        ))}
      </div>
    </div>
  );
}

interface SoupProps {
  name: string;
  ingredients: readonly [string, string];
  value: number;
}

const SoupRow = (props: SoupProps) => (
  <div>
    {props.name} {props.value} Ingredients: {props.ingredients[0]} and{" "}
    {props.ingredients[1]}
  </div>
);

export default App;
