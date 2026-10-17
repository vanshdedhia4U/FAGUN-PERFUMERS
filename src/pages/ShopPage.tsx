import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: string;
  initialFilter?: string;
  initialOccasion?: string;
  onNavigate: (route: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory,
  initialFilter,
  initialOccasion,
  onNavigate
}) => {
  const { products, collections } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion || 'all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1500);

  const categories = [
    { slug: 'all', name: 'All Fragrances' },
    ...collections.map(c => ({ slug: c.slug, name: c.name }))
  ];

  const fragranceFamilies = ['all', 'Woody', 'Floral', 'Resinous', 'Herbal', 'Musk'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.variant.toLowerCase().includes(q) ||
          p.fragranceFamily.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Fragrance family
      if (selectedFamily !== 'all' && p.fragranceFamily !== selectedFamily) {
        return false;
      }

      // Occasion
      if (selectedOccasion !== 'all' && !p.occasions.includes(selectedOccasion)) {
        return false;
      }

      // Initial filter (e.g. bestseller)
      if (initialFilter === 'bestseller' && !p.bestseller) {
        return false;
      }

      // Stock
      if (inStockOnly && (!p.inStock || p.stockQuantity <= 0)) {
        return false;
      }

      // Max price
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedFamily,
    selectedOccasion,
    initialFilter,
    inStockOnly,
    maxPrice,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFamily('all');
    setSelectedOccasion('all');
    setInStockOnly(false);
    setMaxPrice(1500);
    setSortBy('featured');
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#25221F]/60 uppercase tracking-widest mb-2 font-medium">
            <button onClick={() => onNavigate('/')} className="hover:text-[#54202B]">
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#54202B]">Catalogue</span>
            {selectedCategory !== 'all' && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#25221F] capitalize">{selectedCategory.replace('-', ' ')}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
            {selectedCategory === 'all'
              ? 'Complete Fragrance Catalogue'
              : categories.find(c => c.slug === selectedCategory)?.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#25221F]/70 font-light mt-1">
            Artisanal Indian incense, bambooless dhoop sticks, and consecrated pooja offerings.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#25221F]/10 scrollbar-none">
          {categories.map(cat => {
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium whitespace-nowrap shrink-0 transition-colors rounded-xs border ${
                  active
                    ? 'bg-[#54202B] text-white border-[#54202B] shadow-xs'
                    : 'bg-white text-[#25221F] border-[#25221F]/10 hover:border-[#B08D57]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-xs border border-[#25221F]/8 mb-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25221F]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search note or fragrance..."
                className="w-full pl-9 pr-3 py-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs text-[#25221F] focus:outline-none focus:border-[#B08D57]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#25221F]/40"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Fragrance Family Dropdown */}
            <div>
              <select
                value={selectedFamily}
                onChange={e => setSelectedFamily(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs text-[#25221F] focus:outline-none focus:border-[#B08D57]"
              >
                <option value="all">All Fragrance Families</option>
                {fragranceFamilies.slice(1).map(fam => (
                  <option key={fam} value={fam}>
                    {fam} Family
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs text-[#25221F] focus:outline-none focus:border-[#B08D57]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated Devotee Favorites</option>
              </select>
            </div>

            {/* In-Stock & Price Range Controls */}
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-xs text-[#25221F]/80 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="rounded border-[#25221F]/30 text-[#54202B] focus:ring-[#B08D57]"
                />
                <span>In Stock Only</span>
              </label>

              {(searchQuery ||
                selectedCategory !== 'all' ||
                selectedFamily !== 'all' ||
                selectedOccasion !== 'all' ||
                inStockOnly ||
                maxPrice < 1500) && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#54202B] hover:underline font-medium"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Count & Grid */}
        <div className="flex items-center justify-between text-xs text-[#25221F]/60 mb-6 uppercase tracking-wider font-medium">
          <span>
            Displaying <strong className="text-[#25221F] tabular-nums">{filteredProducts.length}</strong> authentic formulation{filteredProducts.length === 1 ? '' : 's'}
          </span>
          <span className="text-[11px] font-normal lowercase">All prices inclusive of 5% GST</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-sm border border-[#25221F]/8 p-8 space-y-3">
            <Sparkles className="w-8 h-8 text-[#B08D57] mx-auto" />
            <h3 className="font-serif text-2xl text-[#25221F]">No Fragrances Found</h3>
            <p className="text-xs text-[#25221F]/70 max-w-sm mx-auto font-light">
              We couldn't find any products matching your specific combination of filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-5 py-2 text-xs uppercase tracking-widest font-medium bg-[#54202B] text-white hover:bg-[#3E161F] transition-colors rounded-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
