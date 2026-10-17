import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface WishlistPageProps {
  onNavigate: (route: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist, products } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-[#54202B] fill-[#54202B]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
              Sacred Wishlist
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
            Your Saved Fragrances
          </h1>
          <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
            Blends saved for upcoming pooja dates, festival gifting, or personal contemplation.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-sm border border-[#25221F]/10 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#FAF7F0] border border-[#B08D57]/30 flex items-center justify-center text-[#B08D57] mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl text-[#25221F]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#25221F]/70 font-light">
              Tap the heart icon on any incense or dhoop product to save it to your sacred list.
            </p>
            <button
              onClick={() => onNavigate('/shop')}
              className="px-6 py-2.5 bg-[#54202B] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#3E161F] transition-colors"
            >
              Discover Fragrances
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
