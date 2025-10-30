import { Injectable } from '@nestjs/common';

@Injectable()
export class CocktailsService {
  getCocktail(id: string): string {
    return 'Hello ' + id + '!';
  }
}
