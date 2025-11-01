import { Injectable } from '@nestjs/common';
import { Cocktail } from './entities/cocktail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CocktailIngredient } from '../common/entities/cocktail_ingredient.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { CocktailData } from '../common/schemas/cocktail_data';
import { CocktailDataIngredient } from '../common/schemas/cocktail_data_ingredient';
import {
  mapCocktailDataToCocktail,
  mapCocktailToCocktailData,
} from './tools/cocktails.mapper';

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
      cocktailDataArray.push(mapCocktailToCocktailData(cocktail));
    });

    return cocktailDataArray;
  }



  async addCocktail(cocktailData: CocktailData): Promise<CocktailData> {
    return mapCocktailToCocktailData(
      await this.cocktailRepository.save(
        this.cocktailRepository.create(
          mapCocktailDataToCocktail(cocktailData)
        ),
      ),
    );
  }

  async deleteAllCocktails(): Promise<DeleteResult> {
    return this.cocktailRepository.deleteAll();
  }
}
