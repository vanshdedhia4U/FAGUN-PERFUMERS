import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TrackOrderPageProps {
  initialOrderNumber?: string;
  onNavigate: (route: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialOrderNumber,
  onNavigate
}) => {
  const { getOrderByIdOrNumber } = useStore();
  const [orderQuery, setOrderQuery] = useState(initialOrderNumber || '');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialOrderNumber) {
      const found = getOrderByIdOrNumber(initialOrderNumber);
      if (found) {
        setSearchedOrder(found);
        setSearched(true);
      }
    }
  }, [initialOrderNumber, getOrderByIdOrNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    const found = getOrderByIdOrNumber(orderQuery.trim());
    setSearchedOrder(found);
    setSearched(true);
  };

  const getStatusStepIndex = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 1;
      case 'processing':
        return 2;
      case 'packed':
        return 3;
      case 'shipped':
        return 4;
      case 'delivered':
        return 5;
      default:
        return 1;
    }
  };

  const timelineSteps = [
    { title: 'Order Confirmed', desc: 'Received & verified' },
    { title: 'Processing', desc: 'Batch botanicals checked' },
    { title: 'Carefully Packed', desc: 'Tamper-evident sealing' },
    { title: 'Dispatched', desc: 'Handed to courier partner' },
    { title: 'Delivered', desc: 'Arrived at your sanctum' }
  ];

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#B08D57]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
              Consignment Tracking
            </span>
            <span className="w-5 h-px bg-[#B08D57]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
            Track Your Fragrance Parcel
          </h1>
          <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
            Enter your unique order number (e.g. FP-8921) to check live packaging and dispatch progress.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-md mx-auto mb-12 flex gap-2 bg-white p-2 rounded-xs border border-[#25221F]/15 shadow-sm"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25221F]/40" />
            <input
              type="text"
              required
              value={orderQuery}
              onChange={e => setOrderQuery(e.target.value)}
              placeholder="e.g. FP-8921 or FP-8922"
              className="w-full pl-9 pr-3 py-2 text-xs uppercase tracking-wider text-[#25221F] focus:outline-none placeholder-normal"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-[#54202B] hover:bg-[#3E161F] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors shrink-0"
          >
            Track
          </button>
        </form>

        {searched && !searchedOrder && (
          <div className="bg-white p-8 rounded-sm border border-[#25221F]/10 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="w-8 h-8 text-[#B08D57] mx-auto" />
            <h3 className="font-serif text-xl text-[#25221F]">Order Not Found</h3>
            <p className="text-xs text-[#25221F]/70 font-light">
              No order found matching “{orderQuery}”. Please check your confirmation email for the exact order ID (format: FP-XXXX).
            </p>
          </div>
        )}

        {searchedOrder && (
          <div className="bg-white rounded-sm border border-[#25221F]/10 p-6 sm:p-10 shadow-sm space-y-8">
            {/* Top Consignment Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#25221F]/10 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
                  Order Number
                </span>
                <h3 className="font-mono text-2xl font-bold text-[#25221F]">
                  {searchedOrder.orderNumber}
                </h3>
                <p className="text-xs text-[#25221F]/60">
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs uppercase tracking-widest text-[#25221F]/60 font-semibold block">
                  Current Status
                </span>
                <span className="inline-block mt-1 px-3 py-1 bg-[#54202B] text-white text-xs font-semibold uppercase tracking-wider rounded-xs">
                  {searchedOrder.fulfilmentStatus.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Visual Timeline Progress */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#25221F] mb-6">
                Consignment Timeline
              </h4>

              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {timelineSteps.map((step, idx) => {
                    const currentIndex = getStatusStepIndex(searchedOrder.fulfilmentStatus);
                    const isPassed = idx + 1 <= currentIndex;
                    const isCurrent = idx + 1 === currentIndex;

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xs border transition-colors ${
                          isCurrent
                            ? 'bg-[#FAF7F0] border-[#54202B]'
                            : isPassed
                            ? 'bg-white border-[#B08D57]/40'
                            : 'bg-[#F8F4EC]/50 border-transparent text-[#25221F]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                              isPassed
                                ? 'bg-[#54202B] text-white'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold">
                            {isCurrent ? 'In Progress' : isPassed ? 'Complete' : 'Pending'}
                          </span>
                        </div>
                        <h5 className="font-serif text-sm font-medium text-[#25221F]">
                          {step.title}
                        </h5>
                        <p className="text-[11px] text-[#25221F]/60 mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Courier & Tracking Information */}
            {searchedOrder.trackingNumber && (
              <div className="p-4 bg-[#FAF7F0] rounded-xs border border-[#B08D57]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#B08D57]" />
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-[#25221F]">
                      Courier Partner: {searchedOrder.carrier || 'DTDC Express'}
                    </h5>
                    <p className="text-xs text-[#25221F]/70 font-mono">
                      Air Waybill (AWB): {searchedOrder.trackingNumber}
                    </p>
                  </div>
                </div>
                {searchedOrder.estimatedDelivery && (
                  <div className="text-xs text-[#54202B] font-medium">
                    Estimated Delivery: <strong>{searchedOrder.estimatedDelivery}</strong>
                  </div>
                )}
              </div>
            )}

            {/* Status History Log */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#25221F] mb-3">
                Tracking Updates Log
              </h4>
              <div className="border border-[#25221F]/10 rounded-xs divide-y divide-[#25221F]/5 text-xs">
                {searchedOrder.statusHistory.map((item: any, i: number) => (
                  <div key={i} className="p-3 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-semibold uppercase tracking-wider text-[#54202B]">
                        {item.status}
                      </span>
                      {item.note && (
                        <p className="text-[#25221F]/80 mt-0.5">{item.note}</p>
                      )}
                    </div>
                    <span className="text-[11px] text-[#25221F]/50 tabular-nums shrink-0">
                      {new Date(item.timestamp).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient & Summary */}
            <div className="pt-4 border-t border-[#25221F]/10 flex flex-col sm:flex-row justify-between text-xs text-[#25221F]/70 gap-2">
              <div>
                <span>Delivering to: </span>
                <strong className="text-[#25221F]">
                  {searchedOrder.customer.fullName} ({searchedOrder.customer.city})
                </strong>
              </div>
              <div>
                <span>Parcel Value: </span>
                <strong className="text-[#54202B] tabular-nums">
                  ₹{searchedOrder.total.toFixed(2)}
                </strong>{' '}
                ({searchedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid Online'})
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
