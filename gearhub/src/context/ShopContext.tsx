'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { State, Action, FilterState } from '@/types';
import productsData from '@/data/products.json';

const highestPrice = Math.max(...productsData.map((product) => product.price));

const initialFilters: FilterState = {
  searchQuery: '',
  category: [],
  maxPrice: highestPrice,
  sortBy: 'default',
};

const initialState: State = {
  products: [],
  cart: [],
  filters: initialFilters,
  isCartOpen: false,
  cartWarning: null,
};

function shopReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PRODUCTS': {
      const highestProductPrice = action.payload.length > 0
        ? Math.max(...action.payload.map((product) => product.price))
        : state.filters.maxPrice;

      return {
        ...state,
        products: action.payload,
        filters: {
          ...state.filters,
          maxPrice: Math.max(state.filters.maxPrice, highestProductPrice),
        },
        cartWarning: null,
      };
    }

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        cartWarning: null,
      };

    case 'ADD_TO_CART': {
      if (action.payload.inStock <= 0) {
        return {
          ...state,
          cartWarning: `${action.payload.name} is out of stock.`,
        };
      }

      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex > -1) {
        const existingItem = state.cart[existingIndex];
        if (existingItem.quantity >= action.payload.inStock) {
          return {
            ...state,
            cartWarning: `Maximum stock reached for ${action.payload.name}.`,
          };
        }

        const updatedCart = [...state.cart];
        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        return { ...state, cart: updatedCart, cartWarning: null };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        cartWarning: null,
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        cartWarning: null,
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const currentItem = state.cart.find((item) => item.id === id);

      if (!currentItem) {
        return state;
      }

      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id),
          cartWarning: null,
        };
      }

      if (quantity > currentItem.inStock) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: currentItem.inStock } : item
          ),
          cartWarning: `Only ${currentItem.inStock} ${currentItem.inStock === 1 ? 'unit' : 'units'} of ${currentItem.name} available.`,
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
        cartWarning: null,
      };
    }

    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen, cartWarning: null };

    case 'CLEAR_CART':
      return { ...state, cart: [], isCartOpen: false, cartWarning: null };

    default:
      return state;
  }
}

interface ShopContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}