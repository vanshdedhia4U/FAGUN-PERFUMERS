import React from 'react';
import { useStore } from '../context/StoreContext';
import { User, Shield, Package, Heart, Mail, Phone, ArrowRight } from 'lucide-react';

interface AccountPageProps {
  onNavigate: (route: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { orders, wishlist, settings } = useStore();

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#25221F]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-[#B08D57]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                Customer & Owner Portal
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
              Account & Orders
            </h1>
          </div>

          <button
            onClick={() => onNavigate('/admin')}
            className="py-2.5 px-5 bg-[#54202B] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#3E161F] transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
          >
            <Shield className="w-4 h-4" />
            <span>Owner Admin Dashboard</span>
          </button>
        </div>

        {/* Quick Links Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('/track-order')}
            className="p-5 bg-white rounded-xs border border-[#25221F]/8 hover:border-[#B08D57]/40 cursor-pointer shadow-xs transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-[#FAF7F0] text-[#54202B] rounded-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base text-[#25221F] font-medium">Track Order</h3>
              <p className="text-xs text-[#25221F]/60">Check live parcel status</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('/wishlist')}
            className="p-5 bg-white rounded-xs border border-[#25221F]/8 hover:border-[#B08D57]/40 cursor-pointer shadow-xs transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-[#FAF7F0] text-[#54202B] rounded-xs">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base text-[#25221F] font-medium">
                Saved Wishlist ({wishlist.length})
              </h3>
              <p className="text-xs text-[#25221F]/60">View favored blends</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('/contact')}
            className="p-5 bg-white rounded-xs border border-[#25221F]/8 hover:border-[#B08D57]/40 cursor-pointer shadow-xs transition-colors flex items-center gap-4"
          >
            <div className="p-3 bg-[#FAF7F0] text-[#54202B] rounded-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base text-[#25221F] font-medium">Customer Care</h3>
              <p className="text-xs text-[#25221F]/60">Reach our Ahmedabad office</p>
            </div>
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-white rounded-sm border border-[#25221F]/10 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#25221F]/10">
            <h3 className="font-serif text-xl text-[#25221F]">
              Recent Orders in System ({orders.length})
            </h3>
            <button
              onClick={() => onNavigate('/track-order')}
              className="text-xs text-[#54202B] font-medium hover:underline"
            >
              Track Specific Order
            </button>
          </div>

          {orders.length === 0 ? (
            <p className="text-xs text-[#25221F]/60 py-6 text-center">No orders placed yet.</p>
          ) : (
            <div className="divide-y divide-[#25221F]/8">
              {orders.slice(0, 5).map(ord => (
                <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#25221F] text-sm">
                        {ord.orderNumber}
                      </span>
                      <span className="px-2 py-0.5 bg-[#FAF7F0] text-[#54202B] uppercase tracking-wider font-semibold text-[10px] rounded-xs border border-[#B08D57]/30">
                        {ord.fulfilmentStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[#25221F]/60 mt-0.5">
                      {ord.items.length} item(s) · Placed by {ord.customer.fullName} on{' '}
                      {new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <span className="font-semibold text-sm text-[#25221F] tabular-nums">
                      ₹{ord.total.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onNavigate(`/track-order?orderNumber=${ord.orderNumber}`)}
                      className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#54202B] hover:text-white text-[#25221F] rounded-xs border border-[#25221F]/10 font-medium transition-colors"
                    >
                      Track
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Business and Owner Assurance Card */}
        <div className="bg-[#FAF7F0] p-6 rounded-xs border border-[#B08D57]/30 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#54202B] font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Owner Authorization Notice</span>
          </div>
          <p className="text-[#25221F]/80 font-light leading-relaxed">
            The Fagun Perfumers administrative dashboard is secured by server-side authorization. Store owners and inventory managers can sign in with their authorized owner passkey to manage orders, products, inventory, coupons, and content.
          </p>
          <button
            onClick={() => onNavigate('/admin')}
            className="text-[#54202B] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
          >
            <span>Proceed to Owner Portal Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
