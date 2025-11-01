import { Injectable } from '@nestjs/common';
import { Cocktail } from './entities/cocktail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CocktailIngredient } from '../common/entities/cocktail_ingredient.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { CocktailData } from '../common/schemas/cocktail_data';
import { CocktailDataIngredient } from '../common/schemas/cocktail_data_ingredient';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
  ) {}

  getCocktail(id: string): string {
    return 'Hello ' + id + '!';
  }

  async getCocktails(): Promise<CocktailData[]> {
    const cocktails: Cocktail[] = await this.cocktailRepository.find({
      relations: ['ingredients'],
    });

    const cocktailDataArray: CocktailData[] = [];
    cocktails.forEach((cocktail) => {
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
      cData.ingredients = [];

      cocktail.ingredients.forEach((cIngredient) => {
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

        cData.ingredients.push(iData);
      });

      cocktailDataArray.push(cData);
    });

    return cocktailDataArray;
  }

  addCocktail(cocktailData: CocktailData): Promise<Cocktail> {
    const cocktail = new Cocktail();

    cocktail.name = cocktailData.name;
    cocktail.category = cocktailData.category;
    cocktail.glass = cocktailData.glass;
    cocktail.tags = cocktailData.tags;
    cocktail.instructions = cocktailData.instructions;
    cocktail.imageUrl = cocktailData.imageUrl;
    cocktail.alcoholic = cocktailData.alcoholic;

    cocktail.ingredients = cocktailData.ingredients.map((i) => {
      const ci = new CocktailIngredient();
      ci.ingredient = { id: i.id } as Ingredient;
      ci.measure = i.measure;
      return ci;
    });
    

    return this.cocktailRepository.save(
      this.cocktailRepository.create(cocktail),
    );
  }
  
  async deleteAllCocktails(): Promise<DeleteResult> {
    return this.cocktailRepository.deleteAll();
  }
}
