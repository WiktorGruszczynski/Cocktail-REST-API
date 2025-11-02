import { Injectable } from '@nestjs/common';
import { Cocktail } from './entities/cocktail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CocktailData } from '../common/schemas/cocktail_data';
import {
  mapCocktailDataToCocktail,
  mapCocktailToCocktailData,
} from './tools/cocktails.mapper';
import { CocktailDataIngredient } from '../common/schemas/cocktail_data_ingredient';
import { CocktailIngredient } from '../common/entities/cocktail_ingredient.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { CocktailIngredientUpdate } from '../common/schemas/cocktail_ingredient_update';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,

    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,

    @InjectRepository(CocktailIngredient)
    private cocktailIngredientRepository: Repository<CocktailIngredient>,
  ) {}

  async getCocktail(id: number): Promise<CocktailData | null> {
    const cocktail = await this.cocktailRepository.findOne({
      where: { id: id },
    });

    if (!cocktail) {
      return cocktail;
    } else {
      return mapCocktailToCocktailData(cocktail);
    }
  }

  async getCocktails(
    alcoholic?: boolean,
    ingredientId?: number,
    category?: string,
    sortName?: string,
    order?: 'asc' | 'desc',
  ): Promise<CocktailData[]> {
    const query = this.cocktailRepository
      .createQueryBuilder('cocktail')
      .leftJoinAndSelect('cocktail.ingredients', 'cocktailIngredient')
      .leftJoinAndSelect('cocktailIngredient.ingredient', 'ingredient');

    if (alcoholic !== undefined) {
      query.andWhere('cocktail.alcoholic = :alcoholic', { alcoholic });
    }

    if (ingredientId !== undefined) {
      query.andWhere('ingredient.id = :ingredientId', { ingredientId });
    }

    if (category !== undefined) {
      query.andWhere('cocktail.category = :category', { category });
    }

    if (sortName) {
      const sortOrder: 'ASC' | 'DESC' =
        order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      query.orderBy(`cocktail.${sortName}`, sortOrder);
    }

    const cocktails = await query.getMany();
    const cocktailDataArray: CocktailData[] = [];

    cocktails.forEach((cocktail) => {
      cocktailDataArray.push(mapCocktailToCocktailData(cocktail));
    });

    return cocktailDataArray;
  }

  async addCocktail(cocktailData: CocktailData): Promise<CocktailData> {
    return mapCocktailToCocktailData(
      await this.cocktailRepository.save(
        this.cocktailRepository.create(mapCocktailDataToCocktail(cocktailData)),
      ),
    );
  }

  async addIngredientToCocktail(
    cocktailId: number,
    ingredientData: CocktailDataIngredient,
  ): Promise<boolean> {
    const measure = ingredientData.measure;
    const cocktail = await this.cocktailRepository.findOne({
      where: { id: cocktailId },
    });

    const ingredient = await this.ingredientRepository.findOne({
      where: { id: ingredientData.id },
    });

    if (cocktail && ingredient) {
      const cocktailIngredient = new CocktailIngredient();
      cocktailIngredient.cocktail = cocktail;
      cocktailIngredient.measure = measure;
      cocktailIngredient.ingredient = ingredient;

      await this.cocktailIngredientRepository.save(
        this.cocktailIngredientRepository.create(cocktailIngredient),
      );
      return true;
    } else {
      return false;
    }
  }

  async updateCocktail(
    id: number,
    cocktailData: Partial<CocktailData>,
  ): Promise<UpdateResult> {
    const cocktail = mapCocktailDataToCocktail(cocktailData);
    delete cocktail.ingredients;

    return await this.cocktailRepository.update(id, cocktail);
  }

  async updateCocktailIngredientMeasure(
    cocktailId: number,
    ingredientId: number,
    data: CocktailIngredientUpdate,
  ): Promise<boolean> {
    const cocktailIngredient = await this.cocktailIngredientRepository.findOne({
      where: {
        cocktail: { id: cocktailId },
        ingredient: { id: ingredientId },
      },
      relations: ['cocktail', 'ingredient'],
    });

    if (!cocktailIngredient) {
      return false;
    } else {
      cocktailIngredient.measure = data.measure;
      await this.cocktailIngredientRepository.save(cocktailIngredient);
      return true;
    }
  }

  async deleteAllCocktails(): Promise<DeleteResult> {
    return this.cocktailRepository.deleteAll();
  }

  async deleteCocktailById(id: number): Promise<DeleteResult> {
    return this.cocktailRepository.delete(id);
  }

  async deleteIngredientFromCocktail(
    cocktailId: number,
    ingredientId: number,
  ): Promise<boolean> {
    const cocktailIngredient = await this.cocktailIngredientRepository.findOne({
      where: {
        cocktail: { id: cocktailId },
        ingredient: { id: ingredientId },
      },
      relations: ['cocktail', 'ingredient'],
    });

    if (!cocktailIngredient) {
      return false;
    }

    await this.cocktailIngredientRepository.delete(cocktailIngredient);
    return true;
  }
}
