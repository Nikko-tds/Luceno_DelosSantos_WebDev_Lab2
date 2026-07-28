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
        
        {/* Hero Banner Section */}
        <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
              <Zap className="w-3.5 h-3.5" /> Next-Gen Tech Gear
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Elevate Your Setup with <span className="text-blue-400">GearHub</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our curated selection of high-performance keyboards, ergonomic mice, premium audio gear, and workstation essentials designed for peak productivity and gaming.
            </p>
          </div>

          <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 items-center gap-6 opacity-20">
            <Headphones className="w-32 h-32" />
            <ShieldCheck className="w-32 h-32" />
          </div>
        </div>

        {/* Filter and Search Bar */}
        <FilterBar />

        {/* Product Catalog Grid */}
        <ProductGrid />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GearHub E-Commerce. Built with Next.js & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-900 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </footer>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

    </div>
  );
}