import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProducts = [{ id: '1', name: 'Test Product' }];
  const mockCategories = [{ id: 'cat1', name: 'Test Category' }];

  const mockService = {
    findAll: jest.fn().mockResolvedValue(mockProducts),
    findFeatured: jest.fn().mockResolvedValue(mockProducts),
    getCategories: jest.fn().mockResolvedValue(mockCategories),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call service.findAll with category', async () => {
      await controller.findAll('coins');
      expect(service.findAll).toHaveBeenCalledWith('coins');
    });

    it('should return products', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('getFeatured', () => {
    it('should call service.findFeatured', async () => {
      await controller.getFeatured();
      expect(service.findFeatured).toHaveBeenCalled();
    });

    it('should return featured products', async () => {
      const result = await controller.getFeatured();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('getCategories', () => {
    it('should call service.getCategories', async () => {
      await controller.getCategories();
      expect(service.getCategories).toHaveBeenCalled();
    });

    it('should return categories', async () => {
      const result = await controller.getCategories();
      expect(result).toEqual(mockCategories);
    });
  });
});
