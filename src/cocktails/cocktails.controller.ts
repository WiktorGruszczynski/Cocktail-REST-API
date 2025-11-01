import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { Cocktail } from './entities/cocktail.entity';
import { CocktailData } from '../common/schemas/cocktail_data';
import { DeleteResult } from 'typeorm';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Get(':id')
  getCocktail(@Param('id') id: string): string {
    return this.cocktailsService.getCocktail(id);
  }

  @Get()
  async getCocktails(): Promise<CocktailData[]> {
    return this.cocktailsService.getCocktails();
  }

  @Post()
  async addCocktail(@Body() cocktailData: CocktailData): Promise<Cocktail> {
    return this.cocktailsService.addCocktail(cocktailData);
  }

  @Delete('/all')
  async deleteAllCocktails(): Promise<DeleteResult> {
    return this.cocktailsService.deleteAllCocktails();
  }
}
