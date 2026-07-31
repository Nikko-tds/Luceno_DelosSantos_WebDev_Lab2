'use client';

import { Product } from '@/types';
import { useShop } from '@/types/AppStateContext';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useShop();
  const availableStock = product.inStock
  const cartItem = state.cart.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (cartItem) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: cartItem.id, quantity: cartItem.quantity + 1 },
      })
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: product
      });
    }
  };

  return (
    <div className="bg-white border border-green rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
      
      {/* Product Image & Badge Container */}
      <div className="relative h-36 overflow-hidden m-2">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-2xl border border-green"
          unoptimized
        />
        
        {/* Category Pill Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-black text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {product.category}
        </span>

        {/* Stock Status Indicator */}
        {!availableStock && (
          <div className="absolute inset-0 bg-black/40 rounded-2xl backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold rounded-2xl px-3 py-1 shadow-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col grow justify-between space-y-4">
        <div>
          <h3 className="font-semibold text-black text-base line-clamp-1 hover:text-green transition-all cursor-pointer">
            {product.name}
          </h3>
          <div className="mt-2 text-xl font-bold text-black">
            ${product.price.toFixed(2)}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!availableStock}
          variant={availableStock ? 'default' : 'ghost'}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium ${
            !availableStock ? 'cursor-not-allowed' : 'shadow-sm'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add to Cart</span>
        </Button>
      </div>

    </div>
  );
}