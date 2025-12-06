import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  const mockProducts = [{ id: '1', name: 'Test Product' }];
  const mockCategories = [{ id: 'cat1', name: 'Test Category' }];

  const mockRepository = {
    findAll: jest.fn().mockResolvedValue(mockProducts),
    findFeatured: jest.fn().mockResolvedValue(mockProducts),
    getCategories: jest.fn().mockResolvedValue(mockCategories),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call repository.findAll with category', async () => {
      await service.findAll('coins');
      expect(repository.findAll).toHaveBeenCalledWith('coins');
    });

    it('should return products', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findFeatured', () => {
    it('should call repository.findFeatured', async () => {
      await service.findFeatured();
      expect(repository.findFeatured).toHaveBeenCalled();
    });

    it('should return featured products', async () => {
      const result = await service.findFeatured();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('getCategories', () => {
    it('should call repository.getCategories', async () => {
      await service.getCategories();
      expect(repository.getCategories).toHaveBeenCalled();
    });

    it('should return categories', async () => {
      const result = await service.getCategories();
      expect(result).toEqual(mockCategories);
    });
  });
});
