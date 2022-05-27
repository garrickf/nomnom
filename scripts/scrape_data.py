"""Scrapes ingredients and soup recipes from the Nom Nom Galaxy Wiki.
"""

import pandas as pd
import requests
from bs4 import BeautifulSoup
import json


def get_html_doc(url: str) -> str:
    response = requests.get(url)
    if response.ok:
        html_doc = response.text
    else:
        raise Exception("Unable to fetch document!")

    return html_doc


# Get ingredients list

html_doc = get_html_doc("https://nomnomgalaxy.fandom.com/wiki/Ingredients")
soup = BeautifulSoup(html_doc, "lxml")

ingredients = []

for tr in soup.find("table").find_all("tr"):
    tds = tr.find_all("td")
    if not tds:
        continue
    ingredients.append(tds[1].text)

print(json.dumps(ingredients, indent=2))

# Get soups, values, and ingredients

html_doc = get_html_doc("https://nomnomgalaxy.fandom.com/wiki/Soups")
soup = BeautifulSoup(html_doc, "lxml")

soups = []

for tr in soup.find("table").find_all("tr"):
    tds = tr.find_all("td")
    if not tds:
        continue
    soup = (
        tds[1].text,
        int(tds[2].text),
        tds[3].text.strip().replace("\n", " "),
        tds[4].text.strip().replace("\n", " "),
    )
    soups.append(soup)

df = pd.DataFrame(
    soups, columns=["Name", "Value", "Primary Ingredient", "Secondary Ingredient"]
)
df.to_csv("../data/soup_recipes.csv")
