import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, ShieldCheck, Plus, Check } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const { reviews, products, submitReview } = useStore();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form state
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const approvedReviews = reviews.filter(r => r.status === 'approved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    const prod = products.find(p => p.id === selectedProduct);
    submitReview({
      productId: selectedProduct,
      productName: prod ? prod.name : 'Fagun Incense',
      rating,
      title: title.trim() || 'Sacred Fragrance Experience',
      comment: comment.trim(),
      reviewerName: reviewerName.trim(),
      verifiedPurchase: true
    });

    setShowSubmitModal(false);
    setTitle('');
    setComment('');
    setReviewerName('');
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#25221F]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B08D57]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                Devotee Experiences
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal">
              Words From Devoted Homes
            </h2>
            <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
              Real reflections from families who welcome our fragrances into their daily pooja and rituals.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="mt-4 md:mt-0 py-2.5 px-5 text-xs font-semibold tracking-wider uppercase border border-[#54202B] text-[#54202B] hover:bg-[#54202B] hover:text-white transition-colors rounded-xs flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Reviews Cards */}
        {approvedReviews.length === 0 ? (
          <div className="py-12 text-center text-[#25221F]/60 bg-[#F8F4EC] rounded-sm p-8">
            <p className="font-serif text-xl">Be the first to share your experience with Fagun Perfumers.</p>
            <p className="text-xs mt-1">We publish only authentic, verified purchaser reflections.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approvedReviews.map(rev => (
              <div
                key={rev.id}
                className="bg-[#FAF7F0] p-6 rounded-sm border border-[#25221F]/8 flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-[#B08D57] text-[#B08D57]'
                            : 'text-[#25221F]/20'
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="font-serif text-base font-semibold text-[#25221F] mb-1 leading-snug">
                    “{rev.title}”
                  </h3>

                  <p className="text-xs text-[#25221F]/75 font-light leading-relaxed line-clamp-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#25221F]/8">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#25221F]">{rev.reviewerName}</span>
                    <span className="text-[#25221F]/40 tabular-nums">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#B08D57] mt-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="truncate">{rev.productName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Review Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 bg-[#25221F]/70 backdrop-blur-xs"
              onClick={() => setShowSubmitModal(false)}
            />
            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="relative w-full max-w-lg bg-[#F8F4EC] p-6 sm:p-8 rounded-sm shadow-2xl border border-[#B08D57]/30">
                <h3 className="font-serif text-2xl text-[#25221F] mb-1">
                  Share Your Fragrance Experience
                </h3>
                <p className="text-xs text-[#25221F]/70 mb-5 font-light">
                  Your feedback helps maintain the integrity of our devotional products.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Fragrance Product
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={e => setSelectedProduct(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#25221F]/20 rounded-xs text-[#25221F] focus:outline-none focus:border-[#B08D57]"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.variant})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'fill-[#B08D57] text-[#B08D57]'
                                : 'text-[#25221F]/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Your Name & City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma (Ahmedabad)"
                      value={reviewerName}
                      onChange={e => setReviewerName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#25221F]/20 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Review Headline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pure soothing fragrance for morning pooja"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#25221F]/20 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Detailed Reflection
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the burn quality, fragrance notes, and ambient feel during your ritual..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#25221F]/20 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-[#25221F]/10">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="px-4 py-2 text-[#25221F]/70 hover:text-[#54202B]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#54202B] text-white font-medium uppercase tracking-wider hover:bg-[#3E161F] transition-colors rounded-xs shadow-sm"
                    >
                      Submit for Moderation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
