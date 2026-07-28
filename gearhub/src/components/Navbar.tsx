'use client';

import { useShop } from '@/context/ShopContext';
import { ShoppingBag, Search, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const { state, dispatch } = useShop();

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 text-white p-2 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Gear<span className="text-blue-600">Hub</span>
          </span>
        </div>

        {/* Quick Search Input */}
        <div className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search gear..."
            value={state.filters.searchQuery}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER',
                payload: { searchQuery: e.target.value },
              })
            }
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-slate-300 transition-all"
          />
        </div>

        {/* Cart Drawer Trigger Button */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          className="relative p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-2"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium pr-1">Cart</span>
          
          {/* Badge Counter */}
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          )}
        </button>

      </div>
    </header>
  );
}