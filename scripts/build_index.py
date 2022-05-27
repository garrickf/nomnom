"""Creates a lookup matrix for soup names and values based on their ingredients.
"""

import pandas as pd
import json

# Use the in-game ordering
ingredients = [
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
]

df = pd.read_csv("../data/soup_recipes.csv", index_col=0)


def ingredient_to_index(name: str) -> int:
    return ingredients.index(name)


N = len(ingredients)
matrix = [[{} for _ in range(N)] for _ in range(N)]


def add_to_matrix(row):
    index1 = ingredient_to_index(row["Primary Ingredient"])
    index2 = ingredient_to_index(row["Secondary Ingredient"])
    name = row["Name"]
    value = row["Value"]

    matrix[index1][index2] = {"name": name, "value": value}
    matrix[index2][index1] = {"name": name, "value": value}


df.apply(add_to_matrix, axis=1)
print(json.dumps(matrix, indent=2))
