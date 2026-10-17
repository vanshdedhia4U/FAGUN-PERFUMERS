import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ShopByOccasionProps {
  onNavigate: (route: string) => void;
}

export const ShopByOccasion: React.FC<ShopByOccasionProps> = ({ onNavigate }) => {
  const occasions = [
    {
      title: 'Daily Pooja',
      subtitle: 'Gentle, uplifting notes for your household mandir',
      filter: 'Daily Pooja',
      color: 'from-[#54202B] to-[#2B1016]'
    },
    {
      title: 'Morning Rituals',
      subtitle: 'Clear mind and start the day with sandalwood & parijat',
      filter: 'Morning Rituals',
      color: 'from-[#B08D57] to-[#6E5531]'
    },
    {
      title: 'Meditation & Stillness',
      subtitle: 'Deep botanical musk and grounding Himalayan cedarwood',
      filter: 'Meditation and Quiet Moments',
      color: 'from-[#25221F] to-[#121110]'
    },
    {
      title: 'Festivals & Celebrations',
      subtitle: 'Sanctifying Loban, Guggul & pure Desi Havan dhoop',
      filter: 'Festivals and Celebrations',
      color: 'from-[#858B73] to-[#4D5240]'
    },
    {
      title: 'Thoughtful Gifting',
      subtitle: 'Artisanal gift sets with handcrafted solid brassware',
      filter: 'Thoughtful Gifting',
      color: 'from-[#54202B] to-[#7A3645]'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#25221F]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#B08D57]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
              Sacred Moments
            </span>
            <span className="w-5 h-px bg-[#B08D57]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
            Shop By Occasion
          </h2>
          <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
            Every ritual holds its own cadence. Find the traditional fragrance formulated to accompany it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {occasions.map((occ, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate(`/shop?occasion=${encodeURIComponent(occ.filter)}`)}
              className="group relative h-64 rounded-sm p-6 flex flex-col justify-between overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${occ.color} opacity-95 group-hover:scale-105 transition-transform duration-500`}
              />

              {/* Indian geometric lattice overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none" />

              {/* Top Tag */}
              <div className="relative z-10 flex items-center justify-between text-white/70">
                <Sparkles className="w-4 h-4 text-[#B08D57]" />
                <span className="text-[9px] uppercase tracking-widest font-medium">
                  Occasion 0{idx + 1}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10">
                <h3 className="font-serif text-xl text-white font-medium mb-1 group-hover:text-[#B08D57] transition-colors leading-snug">
                  {occ.title}
                </h3>
                <p className="text-xs text-white/75 font-light leading-relaxed line-clamp-2">
                  {occ.subtitle}
                </p>

                <div className="pt-3 mt-2 border-t border-white/20 flex items-center justify-between text-[11px] font-medium text-white/90">
                  <span className="uppercase tracking-wider">Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
