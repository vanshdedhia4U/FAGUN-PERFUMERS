import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { JournalArticle } from '../types';
import { Clock, Tag, ArrowRight, ArrowLeft, BookOpen, Share2 } from 'lucide-react';

interface JournalPageProps {
  initialSlug?: string;
  onNavigate: (route: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ initialSlug, onNavigate }) => {
  const { journalArticles, showToast } = useStore();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);

  const activeArticle = journalArticles.find(a => a.slug === selectedSlug);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard.');
    }
  };

  if (activeArticle) {
    return (
      <div className="bg-[#F8F4EC] min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => setSelectedSlug(null)}
            className="text-xs uppercase tracking-wider font-semibold text-[#54202B] hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Journal Entries</span>
          </button>

          <header className="space-y-3 pb-6 border-b border-[#25221F]/10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
              <span>{activeArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#25221F]/50 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeArticle.readTime}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#25221F] font-normal leading-tight">
              {activeArticle.title}
            </h1>

            <div className="flex items-center justify-between text-xs text-[#25221F]/60 pt-2">
              <span className="tabular-nums">Published on {activeArticle.publishedAt}</span>
              <button
                onClick={handleShare}
                className="hover:text-[#54202B] flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide</span>
              </button>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base text-[#25221F]/85 font-light leading-relaxed">
            {activeArticle.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#25221F]/10 flex flex-wrap gap-2 items-center">
            <span className="text-xs uppercase tracking-wider text-[#25221F]/50 font-semibold mr-2">
              Topics:
            </span>
            {activeArticle.tags.map(t => (
              <span
                key={t}
                className="text-xs px-3 py-1 bg-white border border-[#25221F]/10 rounded-xs text-[#25221F]/80"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="p-6 bg-white rounded-xs border border-[#25221F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg text-[#25221F]">Experience the Fragrances</h4>
              <p className="text-xs text-[#25221F]/70 font-light">
                Discover the pure natural incense and dhoop referenced in this article.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/shop')}
              className="py-2.5 px-6 bg-[#54202B] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#3E161F] transition-colors shrink-0"
            >
              Shop Catalogue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#B08D57]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
              Sacred Articles
            </span>
            <span className="w-5 h-px bg-[#B08D57]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
            The Fagun Perfumers Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
            Essays on Indian fragrance families, botanical tree gums, temple rituals, and preparing home pooja sanctuaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalArticles.map(art => (
            <article
              key={art.id}
              onClick={() => setSelectedSlug(art.slug)}
              className="bg-white rounded-sm border border-[#25221F]/8 hover:border-[#B08D57]/40 shadow-xs cursor-pointer group flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 text-[11px] text-[#B08D57] font-semibold uppercase tracking-wider mb-2">
                  <span>{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#25221F]/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#25221F] font-medium group-hover:text-[#54202B] transition-colors leading-snug mb-3">
                  {art.title}
                </h3>

                <p className="text-xs text-[#25221F]/70 font-light leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="px-6 py-4 bg-[#FAF7F0] border-t border-[#25221F]/6 flex items-center justify-between text-xs font-medium text-[#54202B]">
                <span className="text-[#25221F]/50 text-[11px] tabular-nums">{art.publishedAt}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
