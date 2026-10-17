import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

interface JournalSectionProps {
  onNavigate: (route: string) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onNavigate }) => {
  const { journalArticles } = useStore();

  const published = journalArticles.filter(a => a.published).slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-[#F8F4EC] border-b border-[#25221F]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B08D57]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                Sacred Insights
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
              Journal & Ritual Guides
            </h2>
            <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
              Essays on botanical resins, temple customs, and creating peaceful home sanctums.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/journal')}
            className="mt-4 md:mt-0 text-xs font-semibold tracking-widest uppercase text-[#54202B] hover:text-[#3E161F] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Journal Entries</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {published.map(art => (
            <article
              key={art.id}
              onClick={() => onNavigate(`/journal/${art.slug}`)}
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
    </section>
  );
};
