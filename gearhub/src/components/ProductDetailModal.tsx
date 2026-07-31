'use client';

import Image from 'next/image';
import { X, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useShop } from '@/types/AppStateContext';
import { Button } from './ui';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { state, dispatch } = useShop();
  const cartItem = state.cart.find((item) => item.id === product.id);
  const availableStock = product.inStock;

  const handleAddToCart = () => {
    if (cartItem) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: cartItem.id, quantity: cartItem.quantity + 1 },
      });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close product details"
      />

      <div
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-green"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-green px-6 py-4 bg-offwhite">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-green font-semibold">
              Product details
            </p>
            <h2 className="mt-1 text-2xl font-bold text-black">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-green hover:bg-green/10 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] p-6">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-green bg-black/5">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-green">
                {product.category}
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  This {product.category.toLowerCase()} from GearHub is designed for performance and everyday use. It combines reliable style with a user-friendly experience so you can enjoy your setup with confidence.
                </p>
                <p>
                  Ideal for desktop setups, gaming areas, and creative workspaces, it offers premium quality and seamless integration with other gear.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green font-semibold">Price</span>
                  <span className="text-xl font-bold text-black">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Availability</span>
                  <span className={availableStock ? 'text-green font-semibold' : 'text-red-600 font-semibold'}>
                    {availableStock ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Product ID</span>
                  <span className="text-black font-medium">{product.id}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!availableStock}
                variant={availableStock ? 'default' : 'ghost'}
                className="w-full py-3 text-base font-semibold"
              >
                <Plus className="w-4 h-4" />
                {cartItem ? 'Add Another' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
