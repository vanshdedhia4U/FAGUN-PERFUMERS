import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from './ProductVisual';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (route: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    settings
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingRemainder = Math.max(0, settings.freeShippingThreshold - (cartSubtotal - discountAmount));
  const progressPercent = Math.min(
    100,
    Math.round(((cartSubtotal - discountAmount) / settings.freeShippingThreshold) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    onNavigate('/checkout');
  };

  const handleViewShop = () => {
    setIsCartOpen(false);
    onNavigate('/shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#25221F]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F4EC] text-[#25221F] shadow-2xl flex flex-col border-l border-[#B08D57]/20">
          {/* Header */}
          <div className="p-5 border-b border-[#25221F]/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-wide text-[#25221F]">
                Shopping Bag
              </span>
              <span className="text-xs text-[#25221F]/60 font-medium tabular-nums">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#25221F]/60 hover:text-[#54202B] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF7F0] px-5 py-3 border-b border-[#25221F]/8">
            {freeShippingRemainder > 0 ? (
              <p className="text-xs text-[#25221F]/80 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>
                  Add <strong className="font-semibold tabular-nums">₹{freeShippingRemainder}</strong> more for complimentary delivery.
                </span>
              </p>
            ) : (
              <p className="text-xs font-medium text-[#54202B] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Your order qualifies for complimentary delivery across India.</span>
              </p>
            )}
            <div className="w-full bg-[#25221F]/10 h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#B08D57] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#B08D57]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl text-[#25221F]">Your Bag is Empty</h4>
                <p className="text-xs text-[#25221F]/70 max-w-xs font-light">
                  Invite authentic peace and devotion into your home with our handcrafted Indian agarbatti and dhoop.
                </p>
                <button
                  onClick={handleViewShop}
                  className="px-6 py-2.5 text-xs uppercase tracking-widest font-medium bg-[#54202B] text-white hover:bg-[#3E161F] transition-colors"
                >
                  Discover Fragrances
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white border border-[#25221F]/8 rounded-sm shadow-xs"
                >
                  <div className="w-20 aspect-[4/5] rounded-xs overflow-hidden shrink-0 border border-[#25221F]/5">
                    <ProductVisual
                      imageKey={item.product.image}
                      name={item.product.name}
                      aspectRatio="4:5"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#25221F] leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#25221F]/40 hover:text-[#54202B] p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#25221F]/60 mt-0.5 font-light">
                        {item.selectedPackSize || item.product.packSize}
                      </p>

                      <div className="mt-1 text-xs font-semibold text-[#25221F] tabular-nums">
                        ₹{item.product.price}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#25221F]/5">
                      <div className="flex items-center border border-[#25221F]/15 rounded-xs bg-[#FAF7F0]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#25221F]/10 text-[#25221F]/80 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockQuantity}
                          className="p-1 hover:bg-[#25221F]/10 text-[#25221F]/80 transition-colors disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-medium text-[#54202B] tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Input & Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#25221F]/10 space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#F8F4EC] p-2.5 rounded-xs border border-[#B08D57]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>
                      <strong className="font-semibold text-[#54202B]">{appliedCoupon.code}</strong> applied
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-[#54202B] hover:underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. FAGUN10)"
                    className="flex-1 bg-[#F8F4EC] border border-[#25221F]/20 text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-[#B08D57] uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#25221F] text-white text-xs font-medium rounded-xs hover:bg-[#54202B] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#25221F]/8">
                <div className="flex justify-between text-[#25221F]/80">
                  <span>Subtotal</span>
                  <span className="tabular-nums">₹{cartSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#54202B]">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#25221F]/80">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#25221F]/80">
                  <span>Estimated GST (5%)</span>
                  <span className="tabular-nums">₹{taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-[#25221F] pt-2 border-t border-[#25221F]/10">
                  <span>Final Payable</span>
                  <span className="tabular-nums text-base text-[#54202B]">
                    ₹{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 px-4 bg-[#54202B] hover:bg-[#3E161F] text-white text-xs uppercase tracking-widest font-medium rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#25221F]/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Encrypted Indian payment & Cash on Delivery supported</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
