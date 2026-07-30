'use client';

import { useShop } from '@/context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
  const { state, dispatch } = useShop();
  const { cart, isCartOpen, cartWarning } = state;

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10.00 : 0;
  const grandTotal = subtotal + shipping;

  const handleCheckout = () => {
    alert('Order placed successfully! Thank you for shopping with GearHub.');
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">

      <div 
        className="absolute inset-0 transition-opacity"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">

        <div className="w-screen max-w-md bg-white border-l border-green shadow-2xl shadow-green flex flex-col">
          {/* Cart Header */}
          <div className="px-6 py-3.5 border-b border-green flex items-center justify-between bg-offwhite">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-green" />
              <h2 className="font-bold text-lg text-green">Your Cart</h2>
              <span className="text-xs bg-green text-white font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="p-2 rounded-full hover:bg-offwhite text-green transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {cartWarning && (
            <div className="border-b border-amber-200 bg-amber-50 px-6 py-3">
              <p className="text-sm font-medium text-amber-700">{cartWarning}</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-3 bg-offwhite border border-green rounded-2xl relative group"
                >
                  <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-black">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-black truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-green mt-0.5">
                      ${item.price.toFixed(2)} each
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-grey bg-white rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity - 1 },
                            })
                          }
                          className="p-1 hover:bg-green hover:text-white text-grey transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-black">
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
                          className="p-1 hover:bg-green hover:text-white text-grey transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                        }
                        className="text-green hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-bold text-sm text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="bg-offwhite p-4 rounded-full text-black">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-base">Your cart is empty</h3>
                <p className="text-sm text-green max-w-xs">
                  Looks like you haven&apos;t added any gear to your cart yet. Explore our catalog and grab what you need!
                </p>
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="border-t border-green p-6 bg-white space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-green">
                  <span>Subtotal</span>
                  <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-black">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-black pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-green">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-black hover:bg-green text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-full text-center text-xs text-green hover:text-red-500 transition-colors pt-1"
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