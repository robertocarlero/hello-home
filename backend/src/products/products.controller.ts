import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('featured')
  getFeatured() {
    return this.productsService.findFeatured();
  }

  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  @Get()
  findAll(@Query('category') category?: string) {
    return this.productsService.findAll(category);
  }
}
