import BisausageSVG from "../ingredients/Bisausage.svg";
import BluecapSVG from "../ingredients/Bluecap.svg";
import BrineweedSVG from "../ingredients/Brineweed.svg";
import ChickenberrySVG from "../ingredients/Chickenberry.svg";
import CornShellSVG from "../ingredients/Corn Shell.svg";
import GreenstalkSVG from "../ingredients/Greenstalk.svg";
import Ingredient from "../models/Ingredient";
import KaboChunksSVG from "../ingredients/Kabo Chunks.svg";
import MammothMeatSVG from "../ingredients/Mammoth Meat.svg";
import MasherYamSVG from "../ingredients/Masher Yam.svg";
import OxygrassSVG from "../ingredients/Oxygrass.svg";
import PinapuranaSVG from "../ingredients/Pinapura.svg";
import PoisonpuffSVG from "../ingredients/Poisonpuff.svg";
import SquidflySVG from "../ingredients/Squidfly.svg";
import StabgrassSVG from "../ingredients/Stabgrass.svg";
import StrawburiSVG from "../ingredients/Strawburi.svg";
import SunblossomSVG from "../ingredients/Sunblossom.svg";
import ThornbloomSVG from "../ingredients/Thornblossom.svg";
import ThornstalkSVG from "../ingredients/Thornstalk.svg";
import TomatySteakSVG from "../ingredients/Tomaty Steak.svg";
import TsutavineSVG from "../ingredients/Tsutavine.svg";
import ingredientsJson from "../data/ingredients.json";

const getIngredientSVG = (ingredientName: string): string => {
  switch (ingredientName) {
    case "Bluecap":
      return BluecapSVG;
    case "Greenstalk":
      return GreenstalkSVG;
    case "Stabgrass":
      return StabgrassSVG;
    case "Brineweed":
      return BrineweedSVG;
    case "Tsutavine":
      return TsutavineSVG;
    case "Tomaty Steak":
      return TomatySteakSVG;
    case "Oxygrass":
      return OxygrassSVG;
    case "Corn Shell":
      return CornShellSVG;
    case "Chickenberry":
      return ChickenberrySVG;
    case "Bisausage":
      return BisausageSVG;
    case "Strawburi Filet":
      return StrawburiSVG;
    case "Sunblossom":
      return SunblossomSVG;
    case "Squidfly Chunk":
      return SquidflySVG;
    case "Pinapurana Filet":
      return PinapuranaSVG;
    case "Poisonpuff":
      return PoisonpuffSVG;
    case "Kabo Chunk":
      return KaboChunksSVG;
    case "Thornstalk":
      return ThornstalkSVG;
    case "Thornbloom":
      return ThornbloomSVG;
    case "Masher Yam":
      return MasherYamSVG;
    case "Mammoth Meat":
      return MammothMeatSVG;
    default:
      return BluecapSVG;
  }
};

const INGREDIENTS: Ingredient[] = ingredientsJson.map(({ name, index }) => ({
  name,
  index,
  svg: getIngredientSVG(name),
}));

export { INGREDIENTS };
