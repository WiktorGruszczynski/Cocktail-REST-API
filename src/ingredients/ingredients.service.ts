import { Injectable } from '@nestjs/common';
import { Ingredient } from './entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async getAllIngredients(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find();
  }

  async addIngredient(ingredient: Ingredient): Promise<void> {
    await this.ingredientRepository.save(
      this.ingredientRepository.create(ingredient),
    );
  }
}
