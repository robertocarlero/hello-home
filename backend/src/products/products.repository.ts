import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { Category } from './interfaces/category.interface';

export abstract class ProductsRepository {
  abstract findAll(category?: string): Promise<Product[]>;
  abstract findFeatured(): Promise<Product[]>;
  abstract getCategories(): Promise<Category[]>;
}

@Injectable()
export class MockProductsRepository implements ProductsRepository {
  private products: Product[] = [
    {
      id: '1',
      name: 'Organic Cutting Board Set',
      description: 'Durable, organic cutting boards for all your prep needs.',
      price: 29.99,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1714702846875-ca3a149c0592?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'utensils',
      isFeatured: true,
    },
    {
      id: '2',
      name: 'Cast Iron Skillet',
      description:
        'Heirloom-quality cast iron skillet for perfect searing and baking.',
      price: 49.5,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1716488286931-79cef654e08c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'cookware',
      isFeatured: true,
    },
    {
      id: '3',
      name: 'Glass Food Container Set',
      description:
        'Airtight glass containers to keep your leftovers fresh and plastic-free.',
      price: 34.99,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1664391802903-aa09789f9a3e?q=80&w=477&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'storage',
      isFeatured: true,
    },
    {
      id: '4',
      name: 'Coconut Bowl Duo',
      description:
        'Handcrafted coconut shells perfect for smoothie bowls and salads.',
      price: 18.0,
      imageUrl:
        'https://images.unsplash.com/photo-1596450553765-a859422df5ba?auto=format&fit=crop&w=400&q=80',
      category: 'utensils',
      isFeatured: false,
    },
    {
      id: '5',
      name: 'Cotton Reusable Bags',
      description:
        'Leakproof and freezer-safe cotton bags to replace single-use plastic.',
      price: 15.99,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1681498856888-2f3552c0b189?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'storage',
      isFeatured: true,
    },
    {
      id: '6',
      name: 'Copper Saucepan',
      description:
        'Professional-grade copper saucepan for precise temperature control.',
      price: 120.0,
      imageUrl:
        'https://images.unsplash.com/photo-1587570417937-291fd6b29f04?auto=format&fit=crop&w=400&q=80',
      category: 'cookware',
      isFeatured: false,
    },
    {
      id: '7',
      name: 'Biodegradable Sponges',
      description:
        'Plant-based sponges that clean effectively and compost completely.',
      price: 9.99,
      imageUrl:
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80',
      category: 'cleaning',
      isFeatured: false,
    },
    {
      id: '8',
      name: 'Stainless Steel Compost Bin',
      description: 'Odor-free countertop bin for easy kitchen composting.',
      price: 29.99,
      imageUrl:
        'https://images.unsplash.com/photo-1605608547469-6d5df5e56e43?auto=format&fit=crop&w=400&q=80',
      category: 'cleaning',
      isFeatured: false,
    },
    {
      id: '9',
      name: 'Ceramic Non-Stick Pan',
      description:
        'Toxin-free non-stick ceramic pan for healthy effortless cooking.',
      price: 55.0,
      imageUrl:
        'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=400&q=80',
      category: 'cookware',
      isFeatured: false,
    },
  ];

  private categories: Category[] = [
    {
      id: 'cookware',
      name: 'Cookware',
      imageUrl:
        'https://images.unsplash.com/photo-1556910148-3adb7f0c665a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 'utensils',
      name: 'Utensils',
      imageUrl:
        'https://images.unsplash.com/photo-1557687790-902ede7ab58c?q=80&w=398&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 'storage',
      name: 'Storage',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1680098057218-070cf9a653f7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 'cleaning',
      name: 'Cleaning',
      imageUrl:
        'https://images.unsplash.com/photo-1632334994199-cc2ba6538141?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  async findAll(category?: string): Promise<Product[]> {
    if (category) {
      return this.products.filter((p) => p.category === category);
    }
    return this.products;
  }

  async findFeatured(): Promise<Product[]> {
    return this.products.filter((p) => p.isFeatured);
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }
}
