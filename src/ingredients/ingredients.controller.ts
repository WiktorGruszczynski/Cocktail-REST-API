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
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './entities/ingredient.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get(':id')
  async getIngredientById(@Param('id') id: number): Promise<Ingredient | null> {
    return this.ingredientsService.getIngredientById(id);
  }

  @Get()
  async getIngredients(
    @Query('alcohol') alcohol?: boolean,
    @Query('type') type?: string,
    @Query('sort') sortName?: 'name' | 'createdAt' | 'updatedAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<Ingredient[]> {
    return this.ingredientsService.getIngredients(
      alcohol,
      type,
      sortName,
      order,
    );
  }

  @Post()
  async addIngredient(@Body() ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientsService.addIngredient(ingredient);
  }

  @Put(':id')
  async updateIngredient(
    @Param('id') id: number,
    @Body() data: Partial<Ingredient>,
  ): Promise<UpdateResult> {
    return this.ingredientsService.updateIngredient(id, data);
  }

  @Delete('/all')
  async deleteAllIngredients(): Promise<DeleteResult> {
    return this.ingredientsService.deleteAllIngredients();
  }

  @Delete(':id')
  async deleteIngredientById(@Param('id') id: number): Promise<DeleteResult> {
    return this.ingredientsService.deleteIngredientById(id);
  }
}
