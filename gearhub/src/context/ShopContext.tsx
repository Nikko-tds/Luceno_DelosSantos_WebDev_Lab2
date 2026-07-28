'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { State, Action, FilterState } from '@/types';

// Define initial state values
const initialFilters: FilterState = {
  searchQuery: '',
  category: 'All',
  maxPrice: 500, // Safe default covering your highest mock item
  sortBy: 'default',
};

const initialState: State = {
  products: [],
  cart: [],
  filters: initialFilters,
  isCartOpen: false,
};

// Reducer function handling state transitions
function shopReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };

    case 'CLEAR_CART':
      return { ...state, cart: [], isCartOpen: false };

    default:
      return state;
  }
}

// Create Context
interface ShopContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Context Provider Component
export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}

// Custom hook for easier consumption in components
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}