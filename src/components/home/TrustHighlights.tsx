import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Flame } from 'lucide-react';

export const TrustHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Flame,
      title: 'Crafted for Daily Rituals',
      description: 'Slow-smoldering, charcoal-free formulations created specifically for morning pooja and quiet devotion.'
    },
    {
      icon: Sparkles,
      title: 'Thoughtful Fragrance Selection',
      description: 'Authentic Indian botanical notes derived from pure tree resins, essential oils, and sacred temple flowers.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description: 'Protected payments via UPI, major cards, and Cash on Delivery with tamper-proof parcel handling.'
    },
    {
      icon: HeartHandshake,
      title: 'Reliable Customer Support',
      description: 'Direct assistance for product recommendations, order tracking, and custom ritual gifting.'
    }
  ];

  return (
    <section className="bg-white py-10 border-b border-[#25221F]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2.5 rounded-xs bg-[#F8F4EC] text-[#B08D57] shrink-0 border border-[#B08D57]/20">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#25221F] font-medium leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#25221F]/65 mt-1 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
