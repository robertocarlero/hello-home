import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {
  MockProductsRepository,
  ProductsRepository,
} from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductsRepository,
      useClass: MockProductsRepository,
    },
  ],
})
export class ProductsModule {}
