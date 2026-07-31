'use client';

import { useShop } from '@/types/AppStateContext';
import productsData from '@/data/products.json';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/types';
import { Button, Dropdown, Pill, TextField } from './ui';

const CATEGORY_OPTIONS = Array.from(
    new Set(productsData.map((product) => product.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

export default function FilterBar() {
  const { state, dispatch } = useShop();
  const { category, maxPrice, sortBy, searchQuery } = state.filters;
  const highestProductPrice = state.products.length > 0
    ? Math.max(...state.products.map((product) => product.price))
    : 500;
  const sliderMaxPrice = Math.ceil(Math.max(highestProductPrice, maxPrice, 20));

  const changeCategory = (value: string) => {
    if (value === 'All') {
      value = '';
    }
    dispatch({
      type: 'SET_CATEGORY',
      payload: value,
    });
  };

  const changeSort = (value: string) => {
    dispatch({
      type: 'SET_SORT',
      payload: value,
    });
  };

  const changeSearchQuery = (value: string) => {
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: value,
    });
  }

  const changeMaxPrice = (value: number) => {
    dispatch({
      type: 'SET_MAX_PRICE',
      payload: value,
    });
  }

  return (
    <div className="bg-white border border-green rounded-2xl p-4 sm:p-6 shadow-sm mb-8 space-y-4">
      
      {/* Categories & Sort */}
      <div className="flex flex-col lg:flex-row lg:justify-start items-start gap-4">
        
        {/* Category Dropdown */}
        <div className="flex items-center gap-2 overflow-x-auto mb-1 lg:pb-0 scrollbar-none">
          <span className="text-xs font-semibold uppercase tracking-wider text-black flex items-center gap-1 mr-2 shrink-0">
            <SlidersHorizontal className="w-5 h-5" /> Category:
          </span>
          <Dropdown
            value={category}
            onChange={(e) => changeCategory(e.target.value)}
            options={[
              { label: 'Select a category', value: '' },
              ...CATEGORY_OPTIONS.map((cat) => ({ label: cat, value: cat })),
            ]}
            className="min-w-56"
          />
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center text-black gap-2 shrink-0 self-start lg:self-auto">
          <ArrowUpDown className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Sort By:</span>
          <Dropdown
            value={sortBy}
            onChange={(e) =>
              changeSort(e.target.value)
            }
            options={[
              { label: 'Featured', value: 'default' },
              { label: 'Price: Low to High', value: 'price-asc' },
              { label: 'Price: High to Low', value: 'price-desc' },
              { label: 'Alphabetical (A-Z)', value: 'title' },
            ]}
          />
        </div>

      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-black flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Mobile Search Input */}
        <div className="w-full sm:w-auto md:hidden">
          <TextField
            type="text"
            placeholder="Search gear..."
            value={searchQuery}
            onChange={(e) => changeSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Max Price Slider */}
        <div className="w-full sm:w-72 flex items-center gap-3 ml-auto">
          <div className="text-xs text-green font-medium shrink-0">
            Max Price: <span className="font-bold text-green">${maxPrice}</span>
          </div>
          <input
            type="range"
            min="20"
            max={sliderMaxPrice}
            step="10"
            value={maxPrice}
            onChange={(e) =>
              changeMaxPrice(Number(e.target.value))
            }
            className="w-full accent-green cursor-pointer"
          />
        </div>

      </div>

    </div>
  );
}