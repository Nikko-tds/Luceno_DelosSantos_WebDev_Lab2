'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/types';

const CATEGORIES = ['All', 'Keyboards', 'Mice', 'Audio', 'Monitors', 'Accessories'];

export default function FilterBar() {
  const { state, dispatch } = useShop();
  const { category, maxPrice, sortBy, searchQuery } = state.filters;
  const highestProductPrice = state.products.length > 0
    ? Math.max(...state.products.map((product) => product.price))
    : 500;
  const sliderMaxPrice = Math.max(highestProductPrice, maxPrice, 20);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm mb-8 space-y-4">
      
      {/* Top row: Categories & Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: { category: cat } })}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all shrink-0 ${
                category === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER',
                payload: { sortBy: e.target.value as SortOption },
              })
            }
            className="bg-slate-100 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>

      </div>

      {/* Bottom row: Mobile Search (if small screen) & Price Range Slider */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Mobile Search Input */}
        <div className="w-full sm:w-auto md:hidden">
          <input
            type="text"
            placeholder="Search gear..."
            value={searchQuery}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER',
                payload: { searchQuery: e.target.value },
              })
            }
            className="w-full px-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:bg-white"
          />
        </div>

        {/* Max Price Slider */}
        <div className="w-full sm:w-72 flex items-center gap-3 ml-auto">
          <div className="text-xs text-slate-500 font-medium shrink-0">
            Max Price: <span className="font-bold text-slate-900">${maxPrice}</span>
          </div>
          <input
            type="range"
            min="20"
            max={sliderMaxPrice}
            step="10"
            value={maxPrice}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER',
                payload: { maxPrice: Number(e.target.value) },
              })
            }
            className="w-full accent-slate-900 cursor-pointer"
          />
        </div>

      </div>

    </div>
  );
}