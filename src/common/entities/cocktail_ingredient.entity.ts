import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cocktail } from '../../cocktails/entities/cocktail.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity('cocktail_ingredients')
export class CocktailIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cocktail, (cocktail) => cocktail.ingredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cocktail_id' })
  cocktail: Cocktail;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.cocktailIngredients, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column()
  measure: string;
}
