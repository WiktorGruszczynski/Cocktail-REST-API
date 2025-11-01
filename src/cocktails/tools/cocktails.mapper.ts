import { Cocktail } from '../entities/cocktail.entity';
import { CocktailData } from '../../common/schemas/cocktail_data';
import { CocktailDataIngredient } from '../../common/schemas/cocktail_data_ingredient';
import { CocktailIngredient } from '../../common/entities/cocktail_ingredient.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

export function mapCocktailToCocktailData(cocktail: Cocktail): CocktailData {
  const cData = new CocktailData();
  cData.id = cocktail.id;
  cData.name = cocktail.name;
  cData.category = cocktail.category;
  cData.tags = cocktail.tags;
  cData.instructions = cocktail.instructions;
  cData.imageUrl = cocktail.imageUrl;
  cData.alcoholic = cocktail.alcoholic;
  cData.createdAt = cocktail.createdAt;
  cData.updatedAt = cocktail.updatedAt;
  if (cocktail.ingredients) {
    cData.ingredients = cocktail.ingredients.map((cIngredient) => {
      const iData = new CocktailDataIngredient();
      const ingredient = cIngredient.ingredient;

      iData.id = ingredient.id;
      iData.name = ingredient.name;
      iData.description = ingredient.description;
      iData.alcohol = ingredient.alcohol;
      iData.type = ingredient.type;
      iData.percentage = ingredient.percentage;
      iData.imageUrl = ingredient.imageUrl;
      iData.createdAt = ingredient.createdAt;
      iData.updatedAt = ingredient.updatedAt;
      iData.measure = cIngredient.measure;

      return iData;
    });
  }

  return cData;
}

export function mapCocktailDataToCocktail(
  cocktailData: CocktailData | Partial<CocktailData>,
): Cocktail {
  const cocktail = new Cocktail();

  if (cocktailData.id !== undefined) cocktail.id = cocktailData.id;
  if (cocktailData.name !== undefined) cocktail.name = cocktailData.name;
  if (cocktailData.category !== undefined) cocktail.category = cocktailData.category;
  if (cocktailData.glass !== undefined) cocktail.glass = cocktailData.glass;
  if (cocktailData.tags !== undefined) cocktail.tags = cocktailData.tags;
  if (cocktailData.instructions !== undefined) cocktail.instructions = cocktailData.instructions;
  if (cocktailData.imageUrl !== undefined) cocktail.imageUrl = cocktailData.imageUrl;
  if (cocktailData.alcoholic !== undefined) cocktail.alcoholic = cocktailData.alcoholic;
  
  if (cocktailData.ingredients && cocktailData.ingredients.length > 0) {
    cocktail.ingredients = cocktailData.ingredients.map((i) => {
      const ci = new CocktailIngredient();
      ci.ingredient = { id: i.id } as Ingredient;
      ci.measure = i.measure;
      return ci;
    });
  } else {
    cocktail.ingredients = [];
  }

  return cocktail;
}
