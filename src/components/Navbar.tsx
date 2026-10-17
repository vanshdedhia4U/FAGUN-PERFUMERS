import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const { announcement, cartCount, wishlist, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop All', route: '/shop' },
    { label: 'Incense Sticks', route: '/collections/incense-sticks' },
    { label: 'Dhoop Sticks', route: '/collections/dhoop-sticks' },
    { label: 'Bestsellers', route: '/shop?filter=bestseller' },
    { label: 'Gift Sets', route: '/collections/gift-sets' },
    { label: 'Our Story', route: '/our-story' }
  ];

  const handleLinkClick = (route: string) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F4EC]/95 backdrop-blur-md border-b border-[#25221F]/8 transition-colors duration-200">
      {/* Section 1 — Announcement Bar */}
      {announcement.enabled && (
        <div className="bg-[#54202B] text-[#F8F4EC] text-xs py-2 px-4 border-b border-[#B08D57]/30">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-light tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57] shrink-0" />
            <span>{announcement.text}</span>
            {announcement.linkText && announcement.linkUrl && (
              <button
                onClick={() => onNavigate(announcement.linkUrl || '/shop')}
                className="underline underline-offset-4 font-medium text-[#B08D57] hover:text-white ml-1 transition-colors"
              >
                {announcement.linkText}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Section 2 — Strict 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#25221F] hover:text-[#54202B] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => onNavigate('/')}
              className="group text-left focus:outline-none whitespace-nowrap shrink-0"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.06em] text-[#25221F] group-hover:text-[#54202B] transition-colors font-medium">
                Fagun Perfumers
              </span>
              <span className="block text-[9px] tracking-[0.28em] text-[#B08D57] uppercase font-sans font-semibold">
                Indian Incense & Dhoop House
              </span>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-widest text-[#25221F]/80">
            {navLinks.map(link => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.route)}
                  className={`relative py-1 whitespace-nowrap shrink-0 hover:text-[#54202B] transition-colors ${
                    isActive ? 'text-[#54202B] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#54202B]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions (Search, Wishlist, Bag, Account) */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0 text-[#25221F]">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 hover:text-[#54202B] transition-colors"
              aria-label="Search Fragrances"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => onNavigate('/wishlist')}
              className="p-2 hover:text-[#54202B] transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B08D57] text-white text-[9px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-[#54202B] transition-colors relative"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#54202B] text-white text-[9px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Admin Portal */}
            <button
              onClick={() => onNavigate('/account')}
              className="p-2 hover:text-[#54202B] transition-colors"
              aria-label="Account and Owner Portal"
              title="Customer Account & Owner Dashboard"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F4EC] border-b border-[#25221F]/10 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.route)}
                className="text-left py-2 text-sm font-medium uppercase tracking-widest text-[#25221F] hover:text-[#54202B] border-b border-[#25221F]/5"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2 text-xs text-[#25221F]/70">
              <button
                onClick={() => handleLinkClick('/track-order')}
                className="text-left py-1 hover:text-[#54202B]"
              >
                Track Your Order
              </button>
              <button
                onClick={() => handleLinkClick('/journal')}
                className="text-left py-1 hover:text-[#54202B]"
              >
                Journal & Ritual Guides
              </button>
              <button
                onClick={() => handleLinkClick('/admin')}
                className="text-left py-1 text-[#B08D57] font-semibold"
              >
                Owner Administration Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
