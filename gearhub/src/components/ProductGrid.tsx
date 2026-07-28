'use client';

import React, { useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import ProductCard from './ProductCard';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { PackageX } from 'lucide-react';

export default function ProductGrid() {
  const { state, dispatch } = useShop();
  const { products, filters } = state;

  // Load mock data into global state on initial mount
  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: productsData as Product[] });
  }, [dispatch]);

  // Filter and sort products based on active filters
  const filteredProducts = products
    .filter((product) => {
      // Search query filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory =
        filters.category === 'All' || product.category === filters.category;
      
      // Price filter
      const matchesPrice = product.price <= filters.maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'title') return a.name.localeCompare(b.name);
      return 0; // 'default'
    });

  return (
    <div>
      {/* Results Count indicator */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Featured Gear <span className="text-sm font-normal text-slate-500 ml-2">({filteredProducts.length} items)</span>
        </h2>
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="bg-slate-100 p-4 rounded-full text-slate-400">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-900 text-base">No gear found</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Try adjusting your search query, price range, or category filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}