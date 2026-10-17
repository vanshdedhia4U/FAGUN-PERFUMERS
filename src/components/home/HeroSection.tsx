import React from 'react';
import { useStore } from '../../context/StoreContext';
import { IncenseSmokeCanvas } from '../IncenseSmokeCanvas';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { hero } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#F8F4EC] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#25221F]/8">
      {/* Background warm gradient ambiance */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(176,141,87,0.12)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6 z-20">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-[#B08D57]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                {hero.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#25221F] font-normal tracking-tight leading-[1.08] text-balance">
              {hero.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#25221F]/75 font-light leading-relaxed max-w-xl">
              {hero.supportingCopy}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('/shop')}
                className="py-3.5 px-8 text-xs font-semibold tracking-widest uppercase bg-[#54202B] text-white hover:bg-[#3E161F] transition-all duration-200 rounded-xs flex items-center justify-center gap-2 shadow-sm group"
              >
                <span>{hero.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/our-story')}
                className="py-3.5 px-6 text-xs font-semibold tracking-widest uppercase text-[#25221F] hover:text-[#54202B] transition-colors border-b border-[#25221F]/20 hover:border-[#54202B] text-center"
              >
                {hero.secondaryButtonText}
              </button>
            </div>

            {/* Micro trust cues */}
            <div className="pt-6 border-t border-[#25221F]/8 flex flex-wrap gap-6 text-xs text-[#25221F]/70">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                <span>100% Charcoal-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                <span>Pure Plant & Resins</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                <span>Temple Grade Fragrance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Incense Visual with interactive smoke canvas */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-sm overflow-hidden bg-gradient-to-b from-[#FAF4EA] to-[#EAE0D0] border border-[#B08D57]/20 shadow-xl">
              {/* Interactive smoke simulation canvas on top */}
              <IncenseSmokeCanvas className="z-20" />

              {/* Composition Artwork: Handcrafted Indian Brass Burner, Cylindrical Box, and Warm Sandalwood */}
              <div className="absolute inset-0 flex flex-col justify-end items-center p-8 z-10 pointer-events-none select-none">
                {/* Visual Art Layers */}
                <div className="relative w-full max-w-sm flex flex-col items-center">
                  {/* Subtle golden halo behind the incense arrangement */}
                  <div className="absolute -top-16 w-48 h-48 bg-[#B08D57]/15 rounded-full blur-2xl" />

                  {/* Cylindrical Packaging Box for Fagun Perfumers */}
                  <div className="absolute -left-6 bottom-8 w-24 sm:w-28 h-52 sm:h-60 rounded-xs bg-[#54202B] border border-[#B08D57]/40 shadow-2xl p-3 flex flex-col justify-between -rotate-6">
                    <div className="w-full text-center">
                      <div className="w-6 h-6 mx-auto rounded-full border border-[#B08D57]/50 flex items-center justify-center mb-1">
                        <span className="text-[9px] font-serif text-[#B08D57]">FP</span>
                      </div>
                      <p className="text-[7px] tracking-[0.2em] text-[#B08D57] uppercase font-semibold">
                        Fagun
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-serif text-[11px] text-white font-normal leading-tight">
                        Royal Mysore
                      </p>
                      <p className="text-[8px] text-[#B08D57] font-light">Sandalwood</p>
                    </div>
                    <div className="border-t border-[#B08D57]/30 pt-1 text-center">
                      <p className="text-[6px] tracking-widest text-white/60 uppercase">
                        Temple Grade
                      </p>
                    </div>
                  </div>

                  {/* Central Polished Brass Burner Base */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* The Slender Agarbatti Incense Stick standing upright/angled */}
                    <div className="relative w-1.5 h-44 origin-bottom -rotate-12 bg-gradient-to-t from-[#B08D57] via-[#5C4033] to-[#2B1D14] rounded-t-sm shadow-md">
                      {/* Active Ember Glowing at Tip */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#ff7700]" />
                    </div>

                    {/* Handcrafted Brass Urli / Incense Dhoop Daan */}
                    <div className="relative w-44 sm:w-52 h-14 bg-gradient-to-r from-[#8C6A35] via-[#D5B57A] to-[#8C6A35] rounded-b-[40px] shadow-2xl border-t-2 border-[#FFE8A3] flex items-center justify-center">
                      {/* Filigree carved band motif */}
                      <div className="absolute inset-x-4 top-1.5 h-2 border-y border-[#54202B]/30 opacity-70 flex justify-around items-center">
                        <div className="w-1 h-1 rounded-full bg-[#54202B]/60" />
                        <div className="w-1 h-1 rounded-full bg-[#54202B]/60" />
                        <div className="w-1 h-1 rounded-full bg-[#54202B]/60" />
                        <div className="w-1 h-1 rounded-full bg-[#54202B]/60" />
                      </div>

                      {/* Golden Plate Rim Reflection */}
                      <span className="font-serif text-[10px] tracking-[0.2em] text-[#3A270D] uppercase font-semibold">
                        Fagun Heritage
                      </span>
                    </div>

                    {/* Cast Shadow on warm limestone */}
                    <div className="w-60 h-4 bg-[#25221F]/15 rounded-full blur-[8px] mt-1" />
                  </div>

                  {/* Natural Raw Sandalwood Bark & Jasmine Petals on right side */}
                  <div className="absolute -right-4 bottom-4 flex items-center gap-2 opacity-90">
                    <div className="w-14 h-8 bg-[#8C6338] rounded-sm transform rotate-12 shadow-md border border-[#5C4022]/40" />
                    <div className="w-3 h-3 bg-white/90 rounded-full shadow-xs" />
                  </div>
                </div>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#25221F]/60 bg-[#F8F4EC]/80 px-2.5 py-1 backdrop-blur-xs rounded-xs">
                  Touch canvas to guide fragrant smoke
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
