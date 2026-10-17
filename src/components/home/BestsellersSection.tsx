import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../ProductCard';
import { ArrowRight } from 'lucide-react';

interface BestsellersSectionProps {
  onNavigate: (route: string) => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({ onNavigate }) => {
  const { products } = useStore();

  const bestsellers = products.filter(p => p.bestseller || p.featured).slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#25221F]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B08D57]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                Curated Favorites
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
              Most Cherished Fragrances
            </h2>
            <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
              Time-honored recipes hand-crafted for temples, home shrines, and quiet contemplation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/shop?filter=bestseller')}
            className="mt-4 md:mt-0 text-xs font-semibold tracking-widest uppercase text-[#54202B] hover:text-[#3E161F] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
};
