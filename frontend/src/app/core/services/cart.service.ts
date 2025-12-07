import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Product } from '@core/models/product.interface';
import { CartItem } from '@core/models/cart-item.interface';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'shopping-cart';

  // Signal for cart items
  private readonly _cartItems = signal<CartItem[]>([]);

  // Public readonly access to cart items
  readonly cartItems = this._cartItems.asReadonly();

  // Computed signals
  readonly totalItems = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly itemCount = computed(() => this._cartItems().length);

  constructor() {
    this.loadCart();

    // Automatically save to localStorage whenever cart changes
    effect(() => {
      const items = this._cartItems();
      this.saveCart(items);
    });
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this._cartItems();
    const existingItem = currentItems.find((item) => item.product.id === product.id);

    let description = 'Item successfully added';
    let updatedItems = [...currentItems];

    if (existingItem) {
      existingItem.quantity += quantity;
      description = `Item quantity updated to ${existingItem.quantity}`;
      updatedItems = currentItems.map((item) =>
        item.product.id === product.id ? existingItem : item
      );
    } else {
      updatedItems.push({
        product,
        quantity,
      });
    }

    this._cartItems.set(updatedItems);
    toast.success(`${product.name} added to cart!`, { description });
  }

  removeFromCart(productId: string): void {
    const currentItems = this._cartItems();
    const updatedItems = currentItems.filter((item) => item.product.id !== productId);
    this._cartItems.set(updatedItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this._cartItems();
    const updatedItems = currentItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this._cartItems.set(updatedItems);
  }

  clearCart(): void {
    this._cartItems.set([]);
  }

  getCartItem(productId: string): CartItem | undefined {
    return this._cartItems().find((item) => item.product.id === productId);
  }

  private loadCart(): void {
    try {
      const storedCart = localStorage.getItem(this.STORAGE_KEY);
      if (storedCart) {
        const items = JSON.parse(storedCart) as CartItem[];
        this._cartItems.set(items);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      this._cartItems.set([]);
    }
  }

  private saveCart(items: CartItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
}
