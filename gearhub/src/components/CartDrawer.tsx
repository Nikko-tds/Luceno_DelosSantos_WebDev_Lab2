'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
  const { state, dispatch } = useShop();
  const { cart, isCartOpen, cartWarning } = state;

  // If cart drawer is closed, don't render anything
  if (!isCartOpen) return null;

  // Calculate Subtotal and Grand Total
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10.00 : 0; // Flat shipping rate
  const grandTotal = subtotal + shipping;

  const handleCheckout = () => {
    alert('Order placed successfully! Thank you for shopping with GearHub.');
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />

      {/* Slide-out Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <h2 className="font-bold text-lg text-slate-900">Your Cart</h2>
              <span className="text-xs bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cartWarning && (
            <div className="border-b border-amber-200 bg-amber-50 px-6 py-3">
              <p className="text-sm font-medium text-amber-700">{cartWarning}</p>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl relative group"
                >
                  {/* Item Thumbnail */}
                  <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      ${item.price.toFixed(2)} each
                    </p>

                    {/* Quantity Modifier Control */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity - 1 },
                            })
                          }
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity + 1 },
                            })
                          }
                          disabled={item.quantity >= item.inStock}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove single item button */}
                      <button
                        onClick={() =>
                          dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                        }
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total Price */}
                  <div className="text-right font-bold text-sm text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="bg-slate-100 p-4 rounded-full text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-slate-900 text-base">Your cart is empty</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  Looks like you haven&apos;t added any gear to your cart yet. Explore our catalog and grab what you need!
                </p>
              </div>
            )}
          </div>

          {/* Drawer Footer / Totals & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-slate-200 p-6 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-slate-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-full text-center text-xs text-slate-500 hover:text-red-500 transition-colors pt-1"
              >
                Clear Cart Entirely
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}