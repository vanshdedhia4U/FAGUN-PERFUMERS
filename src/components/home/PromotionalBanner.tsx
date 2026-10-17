import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Gift } from 'lucide-react';

interface PromotionalBannerProps {
  onNavigate: (route: string) => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onNavigate }) => {
  const { promoBanner } = useStore();

  if (!promoBanner.enabled) return null;

  return (
    <section className="py-12 bg-[#54202B] text-white relative overflow-hidden border-b border-[#B08D57]/30">
      {/* Subtle traditional motif backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(176,141,87,0.2)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#B08D57]" />
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase">
                {promoBanner.badge}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
              {promoBanner.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              {promoBanner.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onNavigate(promoBanner.linkUrl || '/shop')}
              className="py-3 px-6 text-xs font-semibold tracking-widest uppercase bg-[#B08D57] text-[#25221F] hover:bg-[#C9A975] transition-colors rounded-xs flex items-center gap-2 shadow-md group"
            >
              <span>{promoBanner.linkText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
