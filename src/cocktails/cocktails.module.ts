import { Module } from '@nestjs/common';
import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocktail } from './entities/cocktail.entity';
import { CocktailIngredient } from '../common/entities/cocktail_ingredient.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cocktail, CocktailIngredient, Ingredient]),
  ],
  controllers: [CocktailsController],
  providers: [CocktailsService],
})
export class CocktailsModule {}
