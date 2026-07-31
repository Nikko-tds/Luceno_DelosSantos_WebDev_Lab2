'use client';

import { useShop } from '@/types/AppStateContext';
import { ShoppingCart, Search, Cog } from 'lucide-react';
import { Button } from './ui';

export default function Navbar() {
  const { state, dispatch } = useShop();

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  
  const changeSearchQuery = (value: string) => {
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: value,
    });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-green bg-white backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center">
          <div className=" text-green rounded-xl flex items-center justify-center">
            <Cog className="w-12 h-12" />
          </div>
          <span className="font-bold text-4xl tracking-tight text-green">
            Gear<span className="text-black">Hub</span>
          </span>
        </div>

        {/* Quick Search Input */}
        <div className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-5 h-5 text-green absolute left-3" />
          <input
            type="text"
            placeholder="Search gear..."
            value={state.filters.searchQuery}
            onChange={(e) => changeSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm text-green bg-offwhite border border-transparent rounded-full focus:outline-none focus:ring-2 focus:bg-white focus:border-green transition-all"
          />
        </div>

        {/* Cart Drawer Trigger Button */}
        <Button
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          disabled={false}
          variant={'ghost'}
          className="relative p-2.5 rounded-full border border-transparent hover:bg-white hover:border-green hover:text-green flex items-center gap-2"
          aria-label="Open Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium pr-1">Cart</span>
          
          {/* Badge Counter */}
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-green text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}