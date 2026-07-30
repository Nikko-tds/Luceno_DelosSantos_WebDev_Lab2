'use client';

import { useShop } from '@/context/ShopContext';
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
  const sliderMaxPrice = Math.max(highestProductPrice, maxPrice, 20);
  const selectedCategories = category ?? [];
  const availableCategories = CATEGORY_OPTIONS.filter(
    (cat) => !selectedCategories.includes(cat)
  );

  const addCategory = (value: string) => {
    if (!value || selectedCategories.includes(value)) return;

    dispatch({
      type: 'SET_FILTER',
      payload: { category: [...selectedCategories, value] },
    });
  };

  const removeCategory = (value: string) => {
    dispatch({
      type: 'SET_FILTER',
      payload: { category: selectedCategories.filter((cat) => cat !== value) },
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm mb-8 space-y-4">
      
      {/* Top row: Categories & Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Dropdown + Selected Pills */}
        <div className="flex flex-col gap-3 lg:flex-1">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Category:
            </span>
            <Dropdown
              value=""
              onChange={(e) => addCategory(e.target.value)}
              options={[
                { label: 'Select a category', value: '' },
                ...availableCategories.map((cat) => ({ label: cat, value: cat })),
              ]}
              className="min-w-56"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedCategories.length === 0 ? (
              <span className="text-sm text-slate-500">Showing all categories</span>
            ) : (
              selectedCategories.map((cat) => (
                <Pill key={cat} onRemove={() => removeCategory(cat)}>
                  {cat}
                </Pill>
              ))
            )}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sort By:</span>
          <Dropdown
            value={sortBy}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER',
                payload: { sortBy: e.target.value as SortOption },
              })
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

      {/* Bottom row: Mobile Search (if small screen) & Price Range Slider */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Mobile Search Input */}
        <div className="w-full sm:w-auto md:hidden">
          <TextField
            type="text"
            placeholder="Search gear..."
            value={searchQuery}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER',
                payload: { searchQuery: e.target.value },
              })
            }
            className="w-full"
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