import React from 'react';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-black flex flex-col selection:bg-green selection:text-white">
      <Navbar />

      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <FilterBar />
        <ProductGrid />
      </main>

      <CartDrawer />
    </div>
  );
}