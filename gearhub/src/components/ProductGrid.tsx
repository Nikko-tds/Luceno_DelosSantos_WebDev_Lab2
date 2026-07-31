'use client';

import { useEffect, useMemo, useState } from 'react';
import { useShop } from '@/types/AppStateContext';
import ProductCard from './ProductCard';
import ProductCarouselControls from './ProductCarouselControls';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { PackageX } from 'lucide-react';

const ITEMS_PER_PAGE = 10;
const ITEMS_PER_ROW = 5;

export default function ProductGrid() {
  const { state, dispatch } = useShop();
  const { products, filters } = state;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: productsData as Product[] });
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

        const selectedCategories = filters.category ?? [];
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);

        const matchesPrice = product.price <= filters.maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'title') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages - 1);
  const visibleProducts = filteredProducts.slice(
    safePage * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [filters.searchQuery, filters.category, filters.maxPrice, filters.sortBy]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-black">
          Featured Gear{' '}
          <span className="ml-2 text-sm font-normal text-green">
            ({filteredProducts.length} items)
          </span>
        </h2>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <ProductCarouselControls
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl border border-green bg-white p-12 text-center">
          <div className="rounded-full bg-green/10 p-4 text-black">
            <PackageX className="h-8 w-8" />
          </div>
          <h3 className="text-base font-semibold text-Black">No gear found</h3>
          <p className="max-w-sm text-sm text-green">
            Try adjusting your search query, price range, or category filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}