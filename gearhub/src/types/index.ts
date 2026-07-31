export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'title';

export interface FilterState {
  searchQuery: string;
  category: string;
  maxPrice: number;
  sortBy: string;
}

export interface State {
  products: Product[];
  cart: CartItem[];
  filters: FilterState;
  isCartOpen: boolean;
}

export type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_MAX_PRICE'; payload: number };
