import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Quote } from 'lucide-react';

interface BrandStorySectionProps {
  onNavigate: (route: string) => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onNavigate }) => {
  const { brandStory } = useStore();

  return (
    <section className="py-20 lg:py-28 bg-[#FAF6F0] border-b border-[#25221F]/8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atmospheric Visual Arrangement */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Main Card with Warm Texture */}
              <div className="aspect-[4/5] rounded-xs bg-[#54202B] text-white p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-[#B08D57]/30">
                {/* Subtle mandala background watermark */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,141,87,0.15)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full border border-[#B08D57]/60 flex items-center justify-center mb-6">
                    <span className="font-serif text-[#B08D57] text-lg">FP</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#B08D57] font-semibold block mb-2">
                    Our Philosophy
                  </span>
                  <p className="font-serif text-2xl sm:text-3xl font-light italic leading-relaxed text-[#F8F4EC]">
                    {brandStory.quote}
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-[#B08D57]/30 flex items-center justify-between text-xs text-white/70">
                  <span className="tracking-widest uppercase text-[10px]">Natural Heritage</span>
                  <span className="tracking-widest uppercase text-[10px]">Zero Charcoal</span>
                </div>
              </div>

              {/* Decorative Accent Box */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 p-4 bg-white rounded-xs shadow-lg border border-[#25221F]/8 z-20">
                <p className="text-[10px] tracking-widest uppercase text-[#B08D57] font-semibold mb-1">
                  Artisanal Integrity
                </p>
                <p className="text-xs text-[#25221F]/80 leading-snug font-light">
                  Hand-rolled by multigenerational craftspeople using pure tree gums and shade-dried petals.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Storytelling */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-[#B08D57]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                The Heritage of Fagun
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#25221F] font-normal tracking-tight text-balance">
              {brandStory.title}
            </h2>

            <p className="text-sm font-medium text-[#54202B] uppercase tracking-wider">
              {brandStory.subtitle}
            </p>

            <div className="space-y-4 text-base text-[#25221F]/80 font-light leading-relaxed">
              <p>{brandStory.body1}</p>
              <p>{brandStory.body2}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('/our-story')}
                className="py-3 px-6 text-xs font-semibold tracking-widest uppercase bg-[#25221F] text-white hover:bg-[#54202B] transition-colors rounded-xs flex items-center gap-2 shadow-sm group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
