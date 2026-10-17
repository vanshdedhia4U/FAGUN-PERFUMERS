import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from './ProductVisual';
import { Heart, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (route: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    onNavigate(`/products/${product.slug}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col bg-white border border-[#25221F]/8 hover:border-[#B08D57]/40 transition-all duration-300 cursor-pointer h-full rounded-sm overflow-hidden"
    >
      {/* 4:5 Aspect Ratio Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F8F4EC]/60">
        <ProductVisual
          imageKey={product.image}
          name={product.name}
          variant={product.variant}
          aspectRatio="4:5"
        />

        {/* Top Badges / Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
          <div>
            {product.originalPrice && product.originalPrice > product.price ? (
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white bg-[#54202B] px-2 py-0.5">
                Save ₹{product.originalPrice - product.price}
              </span>
            ) : product.bestseller ? (
              <span className="text-[10px] font-medium tracking-widest uppercase text-[#54202B] bg-[#F8F4EC]/95 px-2 py-0.5 border border-[#B08D57]/30">
                Bestseller
              </span>
            ) : null}
          </div>

          <button
            onClick={handleWishlist}
            aria-label="Save to Wishlist"
            className="pointer-events-auto p-2 rounded-full bg-white/90 text-[#25221F] hover:text-[#54202B] hover:bg-white shadow-sm transition-colors duration-200"
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 ${
                wishlisted ? 'fill-[#54202B] text-[#54202B]' : ''
              }`}
            />
          </button>
        </div>

        {/* Quick Add Button Slide-up on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 text-xs font-medium tracking-wider uppercase text-white transition-colors duration-200 flex items-center justify-center gap-2 shadow-md ${
              product.inStock
                ? 'bg-[#54202B] hover:bg-[#3E161F]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Quick Add' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Fragrance Family unboxed metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#25221F]/60 uppercase tracking-widest mb-1.5">
            <span>{product.category.replace('-', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fragranceFamily}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg text-[#25221F] font-normal leading-snug group-hover:text-[#54202B] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Variant */}
          <p className="text-xs text-[#25221F]/70 font-light mt-0.5 line-clamp-1">
            {product.variant}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-[#25221F]/6 flex items-baseline justify-between">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#25221F] tabular-nums">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#25221F]/40 line-through tabular-nums">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-[#25221F]/80">
            <Star className="w-3 h-3 fill-[#B08D57] text-[#B08D57]" />
            <span className="font-medium tabular-nums">{product.rating}</span>
            <span className="text-[#25221F]/50 tabular-nums">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
