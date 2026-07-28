import React from 'react';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import { ShieldCheck, Zap, Headphones } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Container */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Filter and Search Bar */}
        <FilterBar />

        {/* Product Catalog Grid */}
        <ProductGrid />

      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

    </div>
  );
}