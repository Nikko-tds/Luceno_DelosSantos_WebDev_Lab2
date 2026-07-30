export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'title';

export interface FilterState {
  searchQuery: string;
  category: string[];
  maxPrice: number;
  sortBy: SortOption;
}

export interface State {
  products: Product[];
  cart: CartItem[];
  filters: FilterState;
  isCartOpen: boolean;
  cartWarning: string | null;
}

export type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_FILTER'; payload: Partial<FilterState> }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLEAR_CART' };