import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { subscribeNewsletter } = useStore();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus({
        type: 'error',
        message: 'Please accept the consent terms to receive our fragrant journal updates.'
      });
      return;
    }

    const res = subscribeNewsletter(email);
    if (res.success) {
      setStatus({ type: 'success', message: res.message });
      setEmail('');
      setConsent(false);
    } else {
      setStatus({ type: 'error', message: res.message });
    }
  };

  return (
    <section className="py-20 bg-white border-b border-[#25221F]/8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#F8F4EC] text-[#B08D57] mb-4 border border-[#B08D57]/30">
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="inline-flex items-center gap-2 justify-center mb-2">
          <span className="w-5 h-px bg-[#B08D57]" />
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
            Sacred Letters
          </span>
          <span className="w-5 h-px bg-[#B08D57]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#25221F] font-normal tracking-tight mb-3">
          Notes of Fragrance, Delivered.
        </h2>

        <p className="text-xs sm:text-sm text-[#25221F]/70 max-w-xl mx-auto font-light leading-relaxed mb-8">
          Receive occasional dispatches exploring Indian incense traditions, seasonal ritual guides, and quiet reflections on natural aromatics. No spam, ever.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25221F]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs text-[#25221F] focus:outline-none focus:border-[#B08D57] placeholder-[#25221F]/40"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 text-xs font-semibold uppercase tracking-widest bg-[#54202B] text-white hover:bg-[#3E161F] transition-colors rounded-xs shadow-sm shrink-0"
            >
              Subscribe
            </button>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start justify-center gap-2 text-left text-[11px] text-[#25221F]/70 font-light">
            <input
              type="checkbox"
              id="newsletter-consent"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              className="mt-0.5 rounded border-[#25221F]/30 text-[#54202B] focus:ring-[#B08D57]"
            />
            <label htmlFor="newsletter-consent" className="cursor-pointer">
              I consent to receive newsletter updates from Fagun Perfumers. I can unsubscribe at any time.
            </label>
          </div>

          {/* Status Message */}
          {status.type === 'success' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xs text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {status.type === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xs text-xs flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
