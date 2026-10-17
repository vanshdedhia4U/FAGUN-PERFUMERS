import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from '../components/ProductVisual';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Clock,
  Sparkles,
  Check,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const {
    products,
    reviews,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
    settings
  } = useStore();

  const product = products.find(p => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedPackSize, setSelectedPackSize] = useState(product?.packSize || '');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    tested: boolean;
    valid: boolean;
    message: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'notes' | 'specs' | 'usage' | 'shipping'>('notes');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#25221F] mb-2">Fragrance Not Found</h2>
        <p className="text-xs text-[#25221F]/70 max-w-sm mb-6">
          The requested incense or dhoop blend may have been archived or retired from our permanent catalogue.
        </p>
        <button
          onClick={() => onNavigate('/shop')}
          className="px-6 py-2.5 bg-[#54202B] text-white text-xs uppercase tracking-widest font-medium rounded-xs"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const productReviews = reviews.filter(
    r => r.productId === product.id && r.status === 'approved'
  );
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedPackSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedPackSize);
    setIsCartOpen(false);
    onNavigate('/checkout');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    // Indian PIN codes are 6 numeric digits
    if (/^[1-9][0-9]{5}$/.test(clean)) {
      setPincodeStatus({
        tested: true,
        valid: true,
        message: `Standard delivery serviceable to ${clean}. Expected arrival within 3–5 business days.`
      });
    } else {
      setPincodeStatus({
        tested: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
    }
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#25221F]/60 uppercase tracking-widest mb-8 font-medium">
          <button onClick={() => onNavigate('/')} className="hover:text-[#54202B]">
            Home
          </button>
          <span aria-hidden="true">/</span>
          <button
            onClick={() => onNavigate(`/collections/${product.category}`)}
            className="hover:text-[#54202B] capitalize"
          >
            {product.category.replace('-', ' ')}
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#25221F] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Contiguous PDP Grid: Left Gallery, Right Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="sticky top-28 aspect-[4/5] w-full rounded-sm overflow-hidden bg-white border border-[#25221F]/10 shadow-md">
              <ProductVisual
                imageKey={product.image}
                name={product.name}
                variant={product.variant}
                aspectRatio="4:5"
              />
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Category & Fragrance Family unboxed metadata */}
              <div className="flex items-center gap-2 text-xs text-[#B08D57] font-semibold uppercase tracking-widest mb-2">
                <span>{product.category.replace('-', ' ')}</span>
                <span aria-hidden="true">·</span>
                <span>{product.fragranceFamily} Family</span>
                {product.bestseller && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#54202B]">Bestseller</span>
                  </>
                )}
              </div>

              {/* Title & Variant */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-[#25221F]/70 font-light mt-1">
                {product.variant}
              </p>

              {/* Rating & Review summary */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-[#B08D57]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#B08D57] text-[#B08D57]'
                          : 'text-[#25221F]/20'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-[#25221F] ml-1.5 tabular-nums">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-[#25221F]/50 tabular-nums">
                  ({productReviews.length} verified devotee reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-xs border border-[#25221F]/8 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#25221F] tabular-nums">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#25221F]/40 line-through tabular-nums">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-white bg-[#54202B] px-2 py-0.5">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#25221F]/60 mt-1">
                  Inclusive of all taxes (5% GST). Shipping calculated at checkout.
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-medium ${
                    product.inStock ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {product.inStock
                    ? product.stockQuantity < 10
                      ? `Only ${product.stockQuantity} Left in Stock`
                      : 'In Stock'
                    : 'Out of Stock'}
                </span>
                <p className="text-[10px] text-[#25221F]/50 tabular-nums">SKU: {product.sku}</p>
              </div>
            </div>

            {/* Product Short Description */}
            <p className="text-sm text-[#25221F]/80 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Pack Size Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#25221F]/70 font-semibold mb-2">
                Selected Packaging Format
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-medium rounded-xs border bg-[#54202B] text-white border-[#54202B] shadow-xs"
                >
                  {product.packSize}
                </button>
              </div>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#25221F]/20 rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-[#F8F4EC] text-[#25221F] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    disabled={quantity >= product.stockQuantity}
                    className="p-2.5 hover:bg-[#F8F4EC] text-[#25221F] transition-colors disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 py-3 px-6 text-xs uppercase tracking-widest font-semibold bg-[#25221F] hover:bg-[#54202B] text-white transition-colors rounded-xs flex items-center justify-center gap-2 shadow-xs disabled:bg-gray-400"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.inStock ? 'Add to Bag' : 'Out of Stock'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xs border transition-colors ${
                    wishlisted
                      ? 'bg-[#54202B] text-white border-[#54202B]'
                      : 'bg-white text-[#25221F] border-[#25221F]/20 hover:border-[#54202B]'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3 px-6 text-xs uppercase tracking-widest font-semibold bg-[#54202B] hover:bg-[#3E161F] text-white transition-colors rounded-xs shadow-sm flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                <span>Buy Now with One Click</span>
              </button>
            </div>

            {/* Indian Pincode Delivery Check */}
            <div className="p-4 bg-white rounded-xs border border-[#25221F]/8 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#25221F]/80">
                Check Delivery Serviceability
              </label>
              <form onSubmit={checkPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Indian PIN (e.g. 380001)"
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs focus:outline-none focus:border-[#B08D57] tabular-nums"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#25221F] text-white text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-[#54202B] transition-colors shrink-0"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <div
                  className={`text-xs p-2.5 rounded-xs flex items-center gap-2 mt-2 ${
                    pincodeStatus.valid
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {pincodeStatus.valid ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  )}
                  <span>{pincodeStatus.message}</span>
                </div>
              )}
            </div>

            {/* Key Assurance Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#25221F]/70">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B08D57]" />
                <span>Complimentary shipping above ₹{settings.freeShippingThreshold}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B08D57]" />
                <span>{product.burnTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#B08D57]" />
                <span>Damage-replacement guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                <span>100% Charcoal-free natural gums</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Fragrance Notes, Specs, Usage, Shipping) */}
        <div className="bg-white rounded-sm border border-[#25221F]/8 p-6 sm:p-8 mb-16 shadow-xs">
          {/* Tab buttons */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-[#25221F]/10 pb-4 overflow-x-auto scrollbar-none">
            {[
              { id: 'notes', label: 'Fragrance Pyramid' },
              { id: 'specs', label: 'Specifications & Ingredients' },
              { id: 'usage', label: 'Ritual Usage & Safety' },
              { id: 'shipping', label: 'Delivery & Returns' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs font-semibold uppercase tracking-widest pb-1 whitespace-nowrap shrink-0 transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#54202B] border-b-2 border-[#54202B]'
                    : 'text-[#25221F]/60 hover:text-[#25221F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === 'notes' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/6">
                    <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                      Top Notes (First Impression)
                    </span>
                    <p className="font-serif text-lg text-[#25221F]">
                      {product.fragranceNotes.top}
                    </p>
                    <p className="text-xs text-[#25221F]/60 font-light mt-1">
                      Crisp, delicate notes that fill the room immediately upon ignition.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/6">
                    <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                      Heart Notes (Ritual Core)
                    </span>
                    <p className="font-serif text-lg text-[#25221F]">
                      {product.fragranceNotes.heart}
                    </p>
                    <p className="text-xs text-[#25221F]/60 font-light mt-1">
                      The enduring sacred body of the aroma during meditation and prayer.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/6">
                    <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                      Base Notes (Lingering Stillness)
                    </span>
                    <p className="font-serif text-lg text-[#25221F]">
                      {product.fragranceNotes.base}
                    </p>
                    <p className="text-xs text-[#25221F]/60 font-light mt-1">
                      Deep resins and wood extracts that quietly ground the temple space for hours.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#25221F]/70 font-light leading-relaxed">
                  <p>
                    All Fagun Perfumers fragrances are compounded without synthetic phthalates or artificial smoke enhancers. The aroma unfolds organically according to traditional Ayurvedic rasas.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex justify-between py-2 border-b border-[#25221F]/8">
                    <span className="text-[#25221F]/60 font-medium">Fragrance Family</span>
                    <span className="text-[#25221F] font-semibold">{product.fragranceFamily}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#25221F]/8">
                    <span className="text-[#25221F]/60 font-medium">Approx. Burn Time</span>
                    <span className="text-[#25221F] font-semibold">{product.burnTime}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#25221F]/8">
                    <span className="text-[#25221F]/60 font-medium">Units per Package</span>
                    <span className="text-[#25221F] font-semibold tabular-nums">{product.unitsPerPack} Sticks</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#25221F]/8">
                    <span className="text-[#25221F]/60 font-medium">Bamboo Core</span>
                    <span className="text-[#25221F] font-semibold">
                      {product.category === 'dhoop-sticks' ? '100% Bambooless' : 'Natural Bamboo Stick'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#25221F] mb-2">
                    Verified Ingredients & Formulation
                  </h4>
                  <ul className="list-disc list-inside text-xs text-[#25221F]/75 space-y-1 font-light">
                    {product.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-4 text-xs text-[#25221F]/80 font-light leading-relaxed">
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-[#25221F] mb-1">
                    Directions for Ritual Use
                  </h4>
                  <p>{product.usageInstructions}</p>
                </div>

                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-[#25221F] mb-1">
                    Safety & Mindful Handling
                  </h4>
                  <p>{product.safetyInstructions}</p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3 text-xs text-[#25221F]/80 font-light leading-relaxed">
                <p>
                  Orders are dispatched within 24 to 48 hours from our production facility in Ahmedabad, Gujarat. Delivery typically takes 3 to 5 business days depending on destination PIN code.
                </p>
                <p>
                  Complimentary standard shipping applies on all Indian orders above ₹{settings.freeShippingThreshold}. A flat fee of ₹{settings.standardShippingFee} applies on lower cart totals.
                </p>
                <p>
                  We replace any product damaged during transit without hesitation. Simply contact care@fagunperfumers.com with your Order ID and package photo within 48 hours of delivery.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews for this Product */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#25221F] font-normal">
              Customer Reflections ({productReviews.length})
            </h3>
          </div>

          {productReviews.length === 0 ? (
            <div className="p-8 bg-white rounded-sm border border-[#25221F]/8 text-center text-xs text-[#25221F]/60">
              No verified reviews for this fragrance yet. Be the first to share your experience on the homepage!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productReviews.map(rev => (
                <div
                  key={rev.id}
                  className="bg-white p-6 rounded-sm border border-[#25221F]/8 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-[#B08D57] text-[#B08D57]' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#25221F]/50 tabular-nums">{rev.date}</span>
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#25221F]">
                    “{rev.title}”
                  </h4>
                  <p className="text-xs text-[#25221F]/70 font-light leading-relaxed">
                    {rev.comment}
                  </p>
                  <p className="text-[11px] font-medium text-[#B08D57]">{rev.reviewerName}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B08D57]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                Complementary Offerings
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#25221F] font-normal mb-8">
              More from this Collection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
