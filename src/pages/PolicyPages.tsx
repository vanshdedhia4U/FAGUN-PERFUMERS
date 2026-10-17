import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, ChevronDown, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

interface PolicyPageProps {
  pageType: 'contact' | 'faq' | 'shipping' | 'returns' | 'privacy' | 'terms';
  onNavigate: (route: string) => void;
}

export const PolicyPages: React.FC<PolicyPageProps> = ({ pageType, onNavigate }) => {
  const { settings, showToast } = useStore();

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are Fagun Perfumers incense sticks 100% charcoal-free?',
      a: 'Yes, absolutely. We do not use raw black charcoal powder, kerosene binders, or petroleum chemical accelerants. Our agarbatti and dhoop sticks are crafted with aged sandalwood and cedarwood powders, natural aromatic bark (jigat), pure halmaddi tree resin, and cold-pressed essential oils.'
    },
    {
      q: 'What is the key difference between Agarbatti and Bambooless Dhoop?',
      a: 'Agarbatti has a slender natural bamboo core around which the incense paste is rolled. It produces a fine, steady vertical wisp of smoke ideal for delicate daily ambiance. Bambooless Dhoop is made entirely of compressed herbal and resin paste with no inner stick, yielding a richer, denser smoke suited for sanctifying living spaces during evening aarti and festival poojas.'
    },
    {
      q: 'Do your fragrances cause headaches or stinging in the eyes?',
      a: 'Headaches and burning eyes from commercial incense are caused by cheap synthetic dip-chemicals and burning charcoal. Because Fagun formulations rely exclusively on pure plant botanicals and edible-grade Bhimseni camphor, the aroma is gentle, clean, and non-irritating.'
    },
    {
      q: 'What is the average burn time for each stick?',
      a: 'Standard agarbatti sticks burn for approximately 45 to 55 minutes in a still room. Bambooless dhoop sticks smolder slowly for 35 to 45 minutes.'
    },
    {
      q: 'How should natural incense be stored?',
      a: 'Store your incense boxes in a cool, dry place away from direct sunlight and dampness. Keeping the inner foil sleeve sealed ensures the pure essential oils remain aromatic for over two years.'
    },
    {
      q: 'What are the shipping charges across India?',
      a: `Complimentary standard shipping applies on all orders above ₹${settings.freeShippingThreshold}. For orders below this threshold, a nominal flat fee of ₹${settings.standardShippingFee} is applied at checkout.`
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    showToast('Your message has been sent to our customer care team.');
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Page */}
        {pageType === 'contact' && (
          <div className="space-y-10">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                Get in Touch
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal mt-1">
                Contact Fagun Perfumers
              </h1>
              <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
                Have questions regarding custom wedding hampers, bulk temple samagri, or order inquiries? We welcome your message.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5 bg-white p-6 sm:p-8 rounded-sm border border-[#25221F]/10 space-y-6">
                <h3 className="font-serif text-xl text-[#25221F]">Care & Inquiries</h3>

                <div className="space-y-4 text-xs text-[#25221F]/80 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-[#25221F]">Workshops & Office</strong>
                      <span>{settings.businessAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-[#25221F]">Email Support</strong>
                      <span>{settings.supportEmail}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-[#25221F]">Direct Line</strong>
                      <span>{settings.supportPhone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-[#25221F]">Operational Hours</strong>
                      <span>{settings.operationalHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-[#25221F]/10">
                {contactSubmitted ? (
                  <div className="py-12 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-[#54202B] mx-auto" />
                    <h3 className="font-serif text-2xl text-[#25221F]">Message Received</h3>
                    <p className="text-xs text-[#25221F]/70 max-w-sm mx-auto font-light">
                      Thank you for contacting Fagun Perfumers. Our care team will respond to <strong>{contactForm.email}</strong> within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                        Subject
                      </label>
                      <select
                        value={contactForm.subject}
                        onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                      >
                        <option value="General Inquiry">General Fragrance Inquiry</option>
                        <option value="Order Status">Order & Courier Tracking</option>
                        <option value="Bulk Pooja Hamper">Bulk Gifting & Temple Hampers</option>
                        <option value="Feedback">Product Experience & Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#54202B] text-white uppercase tracking-widest font-semibold rounded-xs hover:bg-[#3E161F] transition-colors"
                    >
                      Send Message to Fagun
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FAQ Page */}
        {pageType === 'faq' && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B08D57] uppercase font-sans">
                Common Inquiries
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F] font-normal mt-1">
                Frequently Asked Questions
              </h1>
              <p className="text-xs sm:text-sm text-[#25221F]/70 mt-1 font-light">
                Insights into our ingredients, burning qualities, pooja suitability, and shipping.
              </p>
            </div>

            <div className="bg-white rounded-sm border border-[#25221F]/10 divide-y divide-[#25221F]/8 shadow-xs">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="p-5 sm:p-6">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-serif text-lg text-[#25221F] font-medium pr-4">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#B08D57] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-xs sm:text-sm text-[#25221F]/75 font-light leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Shipping Policy */}
        {pageType === 'shipping' && (
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#25221F]/10 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold">
              Policy & Logistics
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F]">Shipping & Delivery Policy</h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#25221F]/80 font-light leading-relaxed">
              <h3 className="font-serif text-lg font-semibold text-[#25221F]">1. Dispatch Timeline</h3>
              <p>
                All orders are packaged and dispatched from our primary facility in Ahmedabad within 24 to 48 hours of order confirmation, excluding Sundays and gazetted Indian holidays.
              </p>

              <h3 className="font-serif text-lg font-semibold text-[#25221F]">2. Shipping Charges</h3>
              <p>
                - Orders above ₹{settings.freeShippingThreshold} qualify for complimentary standard delivery across all serviceable Indian postal PIN codes.<br />
                - For orders under ₹{settings.freeShippingThreshold}, a flat fee of ₹{settings.standardShippingFee} is applied.
              </p>

              <h3 className="font-serif text-lg font-semibold text-[#25221F]">3. Courier Partners & Tracking</h3>
              <p>
                We partner with trusted express couriers including DTDC, Blue Dart, and Delhivery. Once dispatched, an automated tracking number (AWB) is shared via email and SMS. Customers can also track consignment progress directly on our <button onClick={() => onNavigate('/track-order')} className="text-[#54202B] underline">Track Order</button> page.
              </p>
            </div>
          </div>
        )}

        {/* Returns & Refund Policy */}
        {pageType === 'returns' && (
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#25221F]/10 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold">
              Devotee Guarantee
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F]">Returns & Replacements Policy</h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#25221F]/80 font-light leading-relaxed">
              <h3 className="font-serif text-lg font-semibold text-[#25221F]">1. Transit Damage Guarantee</h3>
              <p>
                Incense sticks and brassware are delicate. In the rare event that your package arrives damaged or broken during transit, we provide an immediate no-questions-asked replacement.
              </p>

              <h3 className="font-serif text-lg font-semibold text-[#25221F]">2. How to Claim a Replacement</h3>
              <p>
                Please notify us at <strong>{settings.supportEmail}</strong> within 48 hours of delivery, attaching your Order Number (e.g. FP-8921) and a clear photo of the damaged parcel. We will dispatch a fresh package within 24 hours.
              </p>

              <h3 className="font-serif text-lg font-semibold text-[#25221F]">3. Refunds</h3>
              <p>
                Approved refunds are processed to the original payment method within 5 to 7 working days. For Cash on Delivery orders, refunds are credited via direct NEFT or UPI transfer.
              </p>
            </div>
          </div>
        )}

        {/* Privacy Policy */}
        {pageType === 'privacy' && (
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#25221F]/10 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold">
              Data Privacy
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F]">Privacy & Data Policy</h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#25221F]/80 font-light leading-relaxed">
              <p>
                At Fagun Perfumers, we hold our customers' privacy in sacred trust. This policy describes how we collect and protect your information when you visit or make a purchase from our website.
              </p>
              <h3 className="font-serif text-lg font-semibold text-[#25221F]">Information We Collect</h3>
              <p>
                We collect your name, billing and shipping address, contact email, and phone number solely to fulfill orders and provide consignment updates. We never sell or lease customer information to third-party marketing databases.
              </p>
              <h3 className="font-serif text-lg font-semibold text-[#25221F]">Payment Security</h3>
              <p>
                We do not store your raw credit or debit card numbers, CVVs, or UPI PINs. All payment transactions are encrypted and processed through certified Indian payment gateways.
              </p>
            </div>
          </div>
        )}

        {/* Terms of Service */}
        {pageType === 'terms' && (
          <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#25221F]/10 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold">
              Terms of Use
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#25221F]">Terms and Conditions</h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#25221F]/80 font-light leading-relaxed">
              <p>
                Welcome to Fagun Perfumers. By browsing or purchasing from our platform, you agree to comply with and be bound by the terms detailed herein.
              </p>
              <h3 className="font-serif text-lg font-semibold text-[#25221F]">Product Accuracy & Natural Variations</h3>
              <p>
                Because our products utilize natural raw tree barks, floral extracts, and botanical gums, minor natural variations in stick shade and aroma density may occur across batches. This is the authentic hallmark of non-synthetic incense making.
              </p>
              <h3 className="font-serif text-lg font-semibold text-[#25221F]">Pricing & Taxes</h3>
              <p>
                All prices on the platform are listed in Indian Rupees (INR) and are inclusive of standard 5% Goods and Services Tax (GST) applicable to spiritual incense and dhoop.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
