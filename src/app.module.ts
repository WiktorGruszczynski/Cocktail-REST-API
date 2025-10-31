import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CocktailsModule } from './cocktails/cocktails.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsModule } from './ingredients/ingredients.module';
import { Cocktail } from './cocktails/entities/cocktail.entity';
import { Ingredient } from './ingredients/entities/ingredient.entity';
import { CocktailIngredient } from './common/entities/cocktail_ingredient.entity';

@Module({
  imports: [
    CocktailsModule,
    IngredientsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5477,
      username: 'postgres',
      password: 'solvro2025',
      database: 'cocktail_db',
      entities: [Cocktail, Ingredient, CocktailIngredient],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
