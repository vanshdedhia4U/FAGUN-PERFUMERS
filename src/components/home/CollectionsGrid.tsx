import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductVisual } from '../ProductVisual';
import { ArrowRight } from 'lucide-react';

interface CollectionsGridProps {
  onNavigate: (route: string) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ onNavigate }) => {
  const { collections, products } = useStore();

  // Filter out collections that have no published products
  const activeCollections = collections.filter(col => {
    return products.some(p => p.category === col.slug);
  });

  return (
    <section className="py-16 lg:py-24 bg-[#F8F4EC] border-b border-[#25221F]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B08D57]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase">
                Shop By Category
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
              Sacred Fragrance Collections
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/shop')}
            className="mt-4 md:mt-0 text-xs font-semibold tracking-widest uppercase text-[#54202B] hover:text-[#3E161F] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCollections.map(col => {
            const count = products.filter(p => p.category === col.slug).length;
            return (
              <div
                key={col.id}
                onClick={() => onNavigate(`/collections/${col.slug}`)}
                className="group relative bg-white border border-[#25221F]/8 hover:border-[#B08D57]/50 rounded-sm overflow-hidden cursor-pointer shadow-xs transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F0]">
                  <ProductVisual
                    imageKey={col.image}
                    name={col.name}
                    aspectRatio="16:9"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold mb-1">
                      {count} Fragrance{count > 1 ? 's' : ''}
                    </div>
                    <h3 className="font-serif text-xl text-[#25221F] group-hover:text-[#54202B] transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-xs text-[#25221F]/70 font-light mt-1.5 leading-relaxed line-clamp-2">
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#25221F]/6 flex items-center justify-between text-xs font-medium text-[#54202B]">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
