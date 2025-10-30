import { Controller, Get, Param } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}


  @Get(':id')
  getCocktail(@Param('id') id: string): string {
    return this.cocktailsService.getCocktail(id);
  }
}
