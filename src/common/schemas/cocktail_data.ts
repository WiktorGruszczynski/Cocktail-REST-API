import { CocktailDataIngredient } from './cocktail_data_ingredient';

export class CocktailData {
  id: number;
  name: string;
  category: string;
  glass: string;
  tags: string[];
  instructions: string;
  imageUrl: string;
  alcoholic: boolean;
  createdAt: Date;
  updatedAt: Date;
  ingredients: CocktailDataIngredient[];
}
