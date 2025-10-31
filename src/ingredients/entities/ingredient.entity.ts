import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CocktailIngredient } from '../../common/entities/cocktail_ingredient.entity';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  alcohol: boolean;

  @Column()
  type: string;

  @Column()
  percentage: number;

  @Column()
  imageUrl: string;

  @Column({ type: 'timestamp', default: new Date() })
  createdAt: Date;

  @Column({ type: 'timestamp', default: new Date() })
  updatedAt: Date;

  @OneToMany(() => CocktailIngredient, (ci) => ci.ingredient)
  cocktailIngredients: CocktailIngredient[];
}
