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

  @Post()
  async addCocktail(@Body() cocktailData: CocktailData): Promise<CocktailData> {
    return this.cocktailsService.addCocktail(cocktailData);
  }

  @Post(':cocktailId/ingredients/')
  async addIngredientToCocktail(
    @Param('cocktailId') cocktailId: number,
    @Body() ingredient: CocktailDataIngredient,
  ): Promise<boolean> {
    return this.cocktailsService.addIngredientToCocktail(
      cocktailId,
      ingredient,
    );
  }

  @Put(':cocktailId/ingredients/:ingredientId')
  async updateCocktailIngredientMeasure(
    @Param('cocktailId') cocktailId: number,
    @Param('ingredientId') ingredientId: number,
    @Body() data: CocktailIngredientUpdate,
  ): Promise<boolean> {
    return this.cocktailsService.updateCocktailIngredientMeasure(
      cocktailId,
      ingredientId,
      data,
    );
  }

  @Get(':id')
  getCocktail(@Param('id') id: number): Promise<CocktailData | null> {
    return this.cocktailsService.getCocktail(id);
  }

  @Get()
  async getCocktails(
    @Query('alcoholic') alcoholic?: boolean,
    @Query('hasIngredient') inredientId?: number,
    @Query('sort') sortName?: 'name' | 'createdAt' | 'updatedAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<CocktailData[]> {
    return this.cocktailsService.getCocktails(
      alcoholic,
      inredientId,
      sortName,
      order,
    );
  }

  @Put(':id')
  async updateCocktail(
    @Param('id') id: number,
    @Body() cocktailData: Partial<CocktailData>,
  ) {
    return this.cocktailsService.updateCocktail(id, cocktailData);
  }

  @Delete('/all')
  async deleteAllCocktails(): Promise<DeleteResult> {
    return this.cocktailsService.deleteAllCocktails();
  }

  @Delete(':id')
  async deleteCocktailById(@Param('id') id: number): Promise<DeleteResult> {
    return this.cocktailsService.deleteCocktailById(id);
  }

  @Delete(':cocktailId/ingredients/:ingredientId')
  async deleteIngredientFromCocktail(
    @Param('cocktailId') cocktailId: number,
    @Param('ingredientId') ingredientId: number,
  ): Promise<boolean> {
    return this.cocktailsService.deleteIngredientFromCocktail(
      cocktailId,
      ingredientId,
    );
  }
}
