'use client';

import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useShop();
  const cartItem = state.cart.find((item) => item.id === product.id);
  const availableStock = product.inStock - (cartItem?.quantity ?? 0);
  const isOutOfStock = availableStock <= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
      
      {/* Product Image & Badge Container */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        
        {/* Category Pill Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {product.category}
        </span>

        {/* Stock Status Indicator */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col grow justify-between space-y-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
            !isOutOfStock
              ? 'bg-slate-900 hover:bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
}