import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CocktailIngredient } from '../../common/entities/cocktail_ingredient.entity';

@Entity('cocktails')
export class Cocktail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  glass: string;

  @Column({ nullable: true })
  instructions: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  alcoholic: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => CocktailIngredient, (ci) => ci.cocktail, { cascade: true })
  ingredients: CocktailIngredient[];
}
