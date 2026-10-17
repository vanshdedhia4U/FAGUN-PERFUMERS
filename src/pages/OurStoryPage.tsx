import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface OurStoryPageProps {
  onNavigate: (route: string) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  const { brandStory } = useStore();

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-[#B08D57]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
              Origins & Devotion
            </span>
            <span className="w-6 h-px bg-[#B08D57]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#25221F] font-normal leading-tight">
            The Living Heritage of Fagun Perfumers
          </h1>

          <p className="text-base sm:text-lg text-[#25221F]/70 font-light max-w-2xl mx-auto leading-relaxed">
            Rooted in Indian traditions. Handcrafting charcoal-free incense and sacred dhoop for moments of devotion, stillness, and everyday prayer.
          </p>
        </div>

        {/* Featured Quote Card */}
        <div className="bg-[#54202B] text-white p-8 sm:p-12 rounded-sm border border-[#B08D57]/40 shadow-xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,141,87,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B08D57] font-semibold">
              Our Core Conviction
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-light italic leading-relaxed text-[#F8F4EC]">
              {brandStory.quote}
            </p>
            <p className="text-xs tracking-wider uppercase text-white/60">
              Fagun Perfumers Guild · Ahmedabad & Varanasi
            </p>
          </div>
        </div>

        {/* Three Pillars of Indian Fragrance */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 aspect-[4/3] rounded-xs bg-[#FAF7F0] border border-[#25221F]/10 p-6 flex flex-col justify-center text-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B08D57] mb-2">
                Chapter 01
              </span>
              <h3 className="font-serif text-2xl text-[#25221F] mb-2">The Purity of Resins</h3>
              <p className="text-xs text-[#25221F]/70 font-light leading-relaxed">
                Benzoin tears from Sal trees and Himalayan Guggul gum harvested in harmony with seasonal rhythms.
              </p>
            </div>
            <div className="md:col-span-7 space-y-3">
              <h3 className="font-serif text-2xl text-[#25221F]">Rejecting Chemical Accelerants</h3>
              <p className="text-sm text-[#25221F]/80 font-light leading-relaxed">
                In commercial mass manufacturing, incense sticks are manufactured by pressing raw coal powder and soaking them in synthetic chemical fragrance oils dissolved in industrial solvents.
              </p>
              <p className="text-sm text-[#25221F]/80 font-light leading-relaxed">
                At Fagun Perfumers, we reject charcoal entirely. Every single agarbatti and dhoop stick is kneaded with organic tree jigat, pure halmaddi binder, dried flower petals, and aged botanical essential oils.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 order-2 md:order-1 space-y-3">
              <h3 className="font-serif text-2xl text-[#25221F]">The Sacred Agnihotra Tradition</h3>
              <p className="text-sm text-[#25221F]/80 font-light leading-relaxed">
                Our dhoop sticks draw inspiration from ancient Vedic havan ceremonies. By blending pure A2 desi cow ghee, Bhimseni camphor, vetiver roots, and 32 healing herbs, we create a sacred atmosphere that calms the senses and centers the heart.
              </p>
              <p className="text-sm text-[#25221F]/80 font-light leading-relaxed">
                Whether you light our dhoop during Sandhya Aarti or before morning japa, you participate in a living tradition of sanctified offerings.
              </p>
            </div>
            <div className="md:col-span-5 order-1 md:order-2 aspect-[4/3] rounded-xs bg-[#FAF7F0] border border-[#25221F]/10 p-6 flex flex-col justify-center text-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B08D57] mb-2">
                Chapter 02
              </span>
              <h3 className="font-serif text-2xl text-[#25221F] mb-2">Temple Sanctum Quality</h3>
              <p className="text-xs text-[#25221F]/70 font-light leading-relaxed">
                Crafted for peace of mind: zero stinging in the eyes, no acrid smoke, and delicate lasting sweetness.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-[#25221F]/10">
          <button
            onClick={() => onNavigate('/shop')}
            className="py-3.5 px-8 text-xs uppercase tracking-widest font-semibold bg-[#54202B] text-white hover:bg-[#3E161F] transition-colors rounded-xs inline-flex items-center gap-2 shadow-sm"
          >
            <span>Explore the Sacred Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
