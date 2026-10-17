import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from '../components/ProductVisual';
import { CheckCircle2, Package, Truck, ArrowRight, Printer } from 'lucide-react';

interface OrderConfirmationPageProps {
  orderNumber: string;
  onNavigate: (route: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderNumber,
  onNavigate
}) => {
  const { getOrderByIdOrNumber } = useStore();
  const order = getOrderByIdOrNumber(orderNumber);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#25221F] mb-2">Order Not Found</h2>
        <p className="text-xs text-[#25221F]/70 max-w-sm mb-6">
          We could not locate this order reference.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-2.5 bg-[#54202B] text-white text-xs uppercase tracking-widest font-medium rounded-xs"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm border border-[#25221F]/10 p-6 sm:p-10 shadow-sm space-y-8">
          {/* Success Banner */}
          <div className="text-center space-y-3 pb-8 border-b border-[#25221F]/10">
            <div className="w-14 h-14 rounded-full bg-[#FAF7F0] border border-[#B08D57]/40 flex items-center justify-center text-[#54202B] mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#54202B]" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
              Order Confirmed & Received
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
              Thank You for Welcoming Fagun
            </h1>

            <p className="text-xs sm:text-sm text-[#25221F]/75 max-w-md mx-auto font-light leading-relaxed">
              Your sacred order has been confirmed. A receipt and courier notification have been prepared for <strong>{order.customer.email}</strong>.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#F8F4EC] px-4 py-2 rounded-xs border border-[#25221F]/10 text-xs font-semibold text-[#25221F]">
              <span>Order Number:</span>
              <span className="text-[#54202B] font-mono tracking-wider tabular-nums">
                {order.orderNumber}
              </span>
            </div>
          </div>

          {/* Details Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/6 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block mb-1">
                Delivery Destination
              </span>
              <p className="font-semibold text-[#25221F]">{order.customer.fullName}</p>
              <p className="text-[#25221F]/70">
                {order.customer.address}, {order.customer.city}, {order.customer.state} — {order.customer.pincode}
              </p>
              <p className="text-[#25221F]/70">Phone: {order.customer.mobile}</p>
            </div>

            <div className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/6 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block mb-1">
                Payment Details
              </span>
              <p className="font-semibold text-[#25221F] capitalize">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Verified)'}
              </p>
              <p className="text-[#25221F]/70">
                Status: <strong className="uppercase">{order.paymentStatus}</strong>
              </p>
              <p className="text-[#25221F]/70 font-mono text-[11px]">
                Ref: {order.paymentReference || 'N/A'}
              </p>
            </div>
          </div>

          {/* Purchased Items */}
          <div>
            <h3 className="font-serif text-lg text-[#25221F] mb-4 pb-2 border-b border-[#25221F]/10">
              Purchased Fragrances
            </h3>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.productId} className="flex items-center gap-4 text-xs py-2">
                  <div className="w-12 aspect-[4/5] rounded-xs overflow-hidden shrink-0 border border-[#25221F]/5">
                    <ProductVisual imageKey={item.image} name={item.name} aspectRatio="4:5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium text-[#25221F] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#25221F]/60">
                      {item.variant} · {item.packSize}
                    </p>
                    <p className="text-[10px] text-[#25221F]/50 tabular-nums">
                      Qty: {item.quantity} × ₹{item.unitPrice}
                    </p>
                  </div>
                  <span className="font-semibold text-[#25221F] tabular-nums">
                    ₹{item.totalPrice}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="mt-4 pt-4 border-t border-[#25221F]/10 space-y-1 text-xs">
              <div className="flex justify-between text-[#25221F]/70">
                <span>Subtotal</span>
                <span className="tabular-nums">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#54202B]">
                  <span>Discount</span>
                  <span className="tabular-nums">-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#25221F]/70">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {order.shipping === 0 ? 'Complimentary' : `₹${order.shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-[#25221F]/70">
                <span>GST (5%)</span>
                <span className="tabular-nums">₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#25221F] pt-2 border-t border-[#25221F]/10">
                <span>Total Paid / Payable</span>
                <span className="text-[#54202B] tabular-nums">
                  ₹{order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#25221F]/10">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#25221F] border border-[#25221F]/20 hover:border-[#54202B] rounded-xs flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate(`/track-order?orderNumber=${order.orderNumber}`)}
                className="py-2.5 px-5 text-xs font-semibold uppercase tracking-wider bg-[#25221F] text-white hover:bg-[#54202B] rounded-xs transition-colors"
              >
                Track Fulfillment
              </button>
              <button
                onClick={() => onNavigate('/shop')}
                className="py-2.5 px-5 text-xs font-semibold uppercase tracking-wider bg-[#54202B] text-white hover:bg-[#3E161F] rounded-xs transition-colors flex items-center gap-1.5"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
