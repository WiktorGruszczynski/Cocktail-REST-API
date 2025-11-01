import { Injectable } from '@nestjs/common';
import { Ingredient } from './entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async addIngredient(ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientRepository.save(
      this.ingredientRepository.create(ingredient),
    );
  }

  async getAllIngredients(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  async getIngredientById(id: number): Promise<Ingredient | null> {
    return this.ingredientRepository.findOne({
      where: { id },
    });
  }

  async updateIngredient(
    id: number,
    data: Partial<Ingredient>,
  ): Promise<UpdateResult> {
    return this.ingredientRepository.update(id, data);
  }

  async deleteAllIngredients(): Promise<DeleteResult> {
    return this.ingredientRepository.deleteAll();
  }

  async deleteIngredientById(id: number): Promise<DeleteResult> {
    return this.ingredientRepository.delete(id);
  }

}
