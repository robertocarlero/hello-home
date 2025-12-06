import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  findAll(category?: string) {
    return this.productsRepository.findAll(category);
  }

  findFeatured() {
    return this.productsRepository.findFeatured();
  }

  getCategories() {
    return this.productsRepository.getCategories();
  }
}
