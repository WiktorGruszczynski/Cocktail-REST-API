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

  async getIngredients(
    alcohol?: boolean,
    type?: string,
    sortName?: 'name' | 'createdAt' | 'updatedAt',
    order?: 'asc' | 'desc',
  ): Promise<Ingredient[]> {
    const query = this.ingredientRepository.createQueryBuilder('ingredient');

    if (alcohol !== undefined) {
      query.andWhere('ingredient.alcohol = :alcohol', { alcohol });
    }

    if (type !== undefined) {
      query.andWhere('ingredient.type = :type', { type });
    }

    if (sortName !== undefined) {
      const sortOrder: 'ASC' | 'DESC' =
        order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      query.orderBy(`ingredient.${sortName}`, sortOrder);
    }

    return query.getMany();
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
