import { Body, Controller, Get, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './entities/ingredient.entity';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get('/all')
  async getAllIngredients(): Promise<Ingredient[]> {
    return await this.ingredientsService.getAllIngredients();
  }

  @Post()
  async addIngredient(@Body() ingredient: Ingredient): Promise<void> {
    await this.ingredientsService.addIngredient(ingredient);
  }
}
