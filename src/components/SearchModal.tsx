import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from './ProductVisual';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { products } = useStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.variant.toLowerCase().includes(q) ||
        p.fragranceFamily.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.occasions.some(o => o.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (!isOpen) return null;

  const handleSelectProduct = (slug: string) => {
    onClose();
    onNavigate(`/products/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#25221F]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-20">
        <div className="relative w-full max-w-2xl bg-[#F8F4EC] rounded-sm shadow-2xl border border-[#B08D57]/30 overflow-hidden">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#25221F]/10 flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#B08D57] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by fragrance, note (e.g. Chandan, Loban, Rose, Havan)..."
              className="flex-1 bg-transparent text-base sm:text-lg text-[#25221F] placeholder-[#25221F]/40 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#25221F]/40 hover:text-[#54202B]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-xs uppercase tracking-wider text-[#25221F]/60 hover:text-[#54202B] font-medium"
            >
              Close
            </button>
          </div>

          {/* Popular Suggestions */}
          {!query && (
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#25221F]/50 mb-3">
                Suggested Fragrance Explorations
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Royal Mysore Sandalwood',
                  'Vrindavan Kasturi',
                  'Kashi Loban',
                  'Parijat Jasmine',
                  'Damask Rose',
                  'Havan Dhoop',
                  'Festive Gift Set'
                ].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1.5 text-xs bg-white hover:bg-[#54202B] hover:text-white border border-[#25221F]/10 text-[#25221F] transition-colors rounded-xs"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results list */}
          {query && (
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="py-12 text-center text-[#25221F]/60">
                  <p className="font-serif text-lg">No fragrances found matching “{query}”</p>
                  <p className="text-xs mt-1">Try exploring Sandalwood, Dhoop, Loban, or Rose.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#25221F]/60 mb-2 uppercase tracking-wider">
                    {results.length} Fragrance{results.length > 1 ? 's' : ''} Found
                  </p>
                  {results.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.slug)}
                      className="flex items-center gap-4 p-3 bg-white hover:bg-[#FAF7F0] border border-[#25221F]/8 hover:border-[#B08D57]/40 cursor-pointer rounded-xs transition-colors group"
                    >
                      <div className="w-14 aspect-[4/5] overflow-hidden rounded-xs shrink-0 border border-[#25221F]/5">
                        <ProductVisual imageKey={prod.image} name={prod.name} aspectRatio="4:5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] tracking-widest uppercase text-[#B08D57] font-medium">
                          {prod.category.replace('-', ' ')} · {prod.fragranceFamily}
                        </div>
                        <h4 className="font-serif text-base text-[#25221F] group-hover:text-[#54202B] transition-colors truncate">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-[#25221F]/60 truncate">{prod.variant}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-semibold text-[#25221F] tabular-nums">
                          ₹{prod.price}
                        </div>
                        <div className="text-[11px] text-[#54202B] flex items-center gap-1 mt-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
