import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustHighlights } from '../components/home/TrustHighlights';
import { CollectionsGrid } from '../components/home/CollectionsGrid';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { BrandStorySection } from '../components/home/BrandStorySection';
import { ShopByOccasion } from '../components/home/ShopByOccasion';
import { ProductBenefitsSection } from '../components/home/ProductBenefitsSection';
import { CustomerReviewsSection } from '../components/home/CustomerReviewsSection';
import { PromotionalBanner } from '../components/home/PromotionalBanner';
import { JournalSection } from '../components/home/JournalSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main>
      {/* Section 3 — Cinematic Hero Experience */}
      <HeroSection onNavigate={onNavigate} />

      {/* Section 4 — Trust and Brand Highlights */}
      <TrustHighlights />

      {/* Section 5 — Shop by Collection */}
      <CollectionsGrid onNavigate={onNavigate} />

      {/* Section 6 — Bestsellers */}
      <BestsellersSection onNavigate={onNavigate} />

      {/* Section 7 — Brand Storytelling */}
      <BrandStorySection onNavigate={onNavigate} />

      {/* Section 8 — Shop by Occasion */}
      <ShopByOccasion onNavigate={onNavigate} />

      {/* Section 9 — Product Benefits & Fragrance Discovery */}
      <ProductBenefitsSection />

      {/* Section 10 — Customer Reviews */}
      <CustomerReviewsSection />

      {/* Section 11 — Promotional Banner */}
      <PromotionalBanner onNavigate={onNavigate} />

      {/* Section 12 — Journal and Ritual Guides */}
      <JournalSection onNavigate={onNavigate} />

      {/* Section 13 — Newsletter */}
      <NewsletterSection />
    </main>
  );
};
