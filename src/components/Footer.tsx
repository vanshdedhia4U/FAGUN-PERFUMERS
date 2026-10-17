import React from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Shield, Sparkles, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings } = useStore();

  return (
    <footer className="bg-[#25221F] text-[#F8F4EC] pt-16 pb-12 border-t border-[#B08D57]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-wide text-white block">
                Fagun Perfumers
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#B08D57] uppercase font-sans font-medium">
                Traditional Indian Incense & Dhoop
              </span>
            </div>

            <p className="text-xs text-[#F8F4EC]/70 font-light leading-relaxed max-w-sm">
              Artisanal spiritual fragrances crafted for moments of devotion, morning prayer, and daily stillness. 100% charcoal-free, blended with pure botanical resins and temple flowers.
            </p>

            <div className="pt-2 text-xs text-[#F8F4EC]/60 space-y-1.5 font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B08D57] shrink-0" />
                <span>{settings.businessAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B08D57] shrink-0" />
                <span>{settings.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B08D57] shrink-0" />
                <span>{settings.supportPhone}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              Fragrances
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F4EC]/75 font-light">
              <li>
                <button
                  onClick={() => onNavigate('/collections/incense-sticks')}
                  className="hover:text-white transition-colors"
                >
                  Incense Sticks (Agarbatti)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/dhoop-sticks')}
                  className="hover:text-white transition-colors"
                >
                  Bambooless Dhoop Sticks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/premium-fragrances')}
                  className="hover:text-white transition-colors"
                >
                  Temple Flower Blends
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/gift-sets')}
                  className="hover:text-white transition-colors"
                >
                  Festive & Pooja Gift Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?filter=bestseller')}
                  className="hover:text-white transition-colors"
                >
                  Bestselling Formulations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Devotion & Stories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              Rituals & Heritage
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F4EC]/75 font-light">
              <li>
                <button onClick={() => onNavigate('/our-story')} className="hover:text-white transition-colors">
                  Our Artisanal Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/journal')} className="hover:text-white transition-colors">
                  Journal & Ritual Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/track-order')} className="hover:text-white transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">
                  Contact & Assistance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
              Customer Care & Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F4EC]/75 font-light">
              <li>
                <button onClick={() => onNavigate('/shipping-policy')} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/returns-policy')} className="hover:text-white transition-colors">
                  Returns & Replacements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('/admin')}
                  className="text-[#B08D57] hover:underline font-medium text-[11px] flex items-center gap-1"
                >
                  <Shield className="w-3 h-3" />
                  <span>Owner Administration</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F8F4EC]/50 font-light gap-4">
          <p>© {new Date().getFullYear()} Fagun Perfumers. All rights reserved. Crafted with devotion in Bharat.</p>
          <div className="flex items-center gap-4">
            <span>GST Registered Incense House</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
