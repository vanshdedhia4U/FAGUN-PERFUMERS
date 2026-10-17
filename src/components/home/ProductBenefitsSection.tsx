import React from 'react';
import { Leaf, Clock, ShieldCheck, Flame, Compass, Heart } from 'lucide-react';

export const ProductBenefitsSection: React.FC = () => {
  const families = [
    {
      name: 'Woody & Earthy',
      notes: 'Mysore Sandalwood, Himalayan Cedar, Oakmoss',
      description: 'Warm, grounding foundations for deep focus and serene morning pooja.'
    },
    {
      name: 'Resinous & Sacred',
      notes: 'Sal Tree Loban, Guggul Gum, Myrrh Tears',
      description: 'Slow-smoldering balsamic tree tears that dispel stagnant atmosphere.'
    },
    {
      name: 'Floral & Nectar',
      notes: 'Kannauj Damask Rose, Parijat, Temple Mogra',
      description: 'Delicate, joyful blossoms gathered at dawn for pushpanjali offerings.'
    },
    {
      name: 'Herbal & Agnihotra',
      notes: 'Desi Cow Ghee, Vetiver (Khus), Jatamansi, Camphor',
      description: 'Ayurvedic formulations inspired by sacred havan rites and natural purification.'
    }
  ];

  const standards = [
    {
      icon: Leaf,
      title: '100% Charcoal-Free',
      detail: 'Traditional incense relies on raw black charcoal dipping. Fagun uses only natural wood powders and plant starches for pure, non-toxic combustion.'
    },
    {
      icon: Clock,
      title: 'Even 45–55 Min Burn Time',
      detail: 'Consistent density guarantees a steady, peaceful burn without flame flare-ups or sudden extinguishing.'
    },
    {
      icon: ShieldCheck,
      title: 'Authentic Botanical Gums',
      detail: 'Bound with pure halmaddi and jigat tree resins. No artificial petroleum masking agents or chemical accelerants.'
    },
    {
      icon: Flame,
      title: 'Mindful Ash Dispersion',
      detail: 'Designed to produce fine, compact ash that drops directly into your plate or burner holder without scattering.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F8F4EC] border-b border-[#25221F]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fragrance Families Guide */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4 text-[#B08D57]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                  The Olfactory Journey
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
                Indian Fragrance Families
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25221F]/70 max-w-md font-light mt-2 md:mt-0">
              Understanding the origin and sacred characteristics of our traditional aroma profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {families.map((fam, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-sm border border-[#25221F]/8 hover:border-[#B08D57]/40 shadow-xs transition-colors"
              >
                <div className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold mb-2">
                  Family 0{idx + 1}
                </div>
                <h3 className="font-serif text-xl text-[#25221F] font-medium mb-1">
                  {fam.name}
                </h3>
                <p className="text-xs font-medium text-[#54202B] mb-2">{fam.notes}</p>
                <p className="text-xs text-[#25221F]/70 font-light leading-relaxed">
                  {fam.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Standards & Transparency */}
        <div className="bg-[#FAF7F0] p-8 sm:p-12 rounded-sm border border-[#25221F]/8">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
              Craftsmanship & Purity
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#25221F] font-normal">
              What Sets Fagun Perfumers Apart
            </h3>
            <p className="text-xs sm:text-sm text-[#25221F]/70 font-light mt-1">
              Devotional incense should elevate the breath, not irritate the senses. Here is our solemn manufacturing pledge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((std, idx) => {
              const Icon = std.icon;
              return (
                <div key={idx} className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#54202B] shadow-xs border border-[#25221F]/10">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-lg text-[#25221F] font-medium leading-snug">
                    {std.title}
                  </h4>
                  <p className="text-xs text-[#25221F]/70 font-light leading-relaxed">
                    {std.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
