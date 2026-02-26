import type { IProduct } from "../../products/types/product.types";

export interface IAddToCartBody {
  id: number;
  userId: number;
  products: IProduct[];
}

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  category: string;
}

export interface ICartStore {
  cartItems: ICartItem[];
  addToStore: (product: ICartItem) => void;
  removeFromStore: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
}
