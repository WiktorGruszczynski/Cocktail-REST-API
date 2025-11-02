import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CocktailData } from '../common/schemas/cocktail_data';
import { DeleteResult } from 'typeorm';
import { CocktailDataIngredient } from '../common/schemas/cocktail_data_ingredient';
import { CocktailIngredientUpdate } from '../common/schemas/cocktail_ingredient_update';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Get(':id')
  getCocktail(@Param('id') id: number): Promise<CocktailData | null> {
    return this.cocktailsService.getCocktail(id);
  }

  @Get()
  async getCocktails(
    @Query('alcoholic') alcoholic?: boolean,
    @Query('hasIngredient') inredientId?: number,
    @Query('category') category?: string,
    @Query('sort') sortName?: 'name' | 'createdAt' | 'updatedAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<CocktailData[]> {
    return this.cocktailsService.getCocktails(
      alcoholic,
      inredientId,
      category,
      sortName,
      order,
    );
  }

  @Post()
  async addCocktail(@Body() cocktailData: CocktailData): Promise<CocktailData> {
    return this.cocktailsService.addCocktail(cocktailData);
  }

  @Post(':cocktail_id/ingredients/')
  async addIngredientToCocktail(
    @Param('cocktail_id') cocktailId: number,
    @Body() ingredient: CocktailDataIngredient,
  ): Promise<boolean> {
    return this.cocktailsService.addIngredientToCocktail(
      cocktailId,
      ingredient,
    );
  }

  @Put(':id')
  async updateCocktail(
    @Param('id') id: number,
    @Body() cocktailData: Partial<CocktailData>,
  ) {
    return this.cocktailsService.updateCocktail(id, cocktailData);
  }

  @Put(':cocktail_id/ingredients/:ingredient_id')
  async updateCocktailIngredientMeasure(
    @Param('cocktail_id') cocktailId: number,
    @Param('ingredient_id') ingredientId: number,
    @Body() data: CocktailIngredientUpdate,
  ): Promise<boolean> {
    return this.cocktailsService.updateCocktailIngredientMeasure(
      cocktailId,
      ingredientId,
      data,
    );
  }

  @Delete('/all')
  async deleteAllCocktails(): Promise<DeleteResult> {
    return this.cocktailsService.deleteAllCocktails();
  }

  @Delete(':id')
  async deleteCocktailById(@Param('id') id: number): Promise<DeleteResult> {
    return this.cocktailsService.deleteCocktailById(id);
  }

  @Delete(':cocktail_id/ingredients/:ingredient_id')
  async deleteIngredientFromCocktail(
    @Param('cocktail_id') cocktailId: number,
    @Param('ingredient_id') ingredientId: number,
  ): Promise<boolean> {
    return this.cocktailsService.deleteIngredientFromCocktail(
      cocktailId,
      ingredientId,
    );
  }
}
