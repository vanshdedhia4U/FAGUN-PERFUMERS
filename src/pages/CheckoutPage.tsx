import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVisual } from '../components/ProductVisual';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Tag,
  AlertCircle
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (route: string) => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Delhi',
  'Gujarat',
  'Haryana',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    createOrder,
    settings
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form state
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: 'Gujarat',
    pincode: ''
  });

  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay_test'>('razorpay_test');
  const [selectedUpiMethod, setSelectedUpiMethod] = useState<'gpay' | 'phonepe' | 'paytm' | 'card'>('gpay');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#25221F] mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#25221F]/70 max-w-sm mb-6">
          Add artisanal incense or dhoop products to begin your checkout.
        </p>
        <button
          onClick={() => onNavigate('/shop')}
          className="px-6 py-2.5 bg-[#54202B] text-white text-xs uppercase tracking-widest font-medium rounded-xs"
        >
          Discover Fragrances
        </button>
      </div>
    );
  }

  // Authoritative calculations
  const expressFee = deliveryOption === 'express' ? 95 : 0;
  const currentTotal = finalTotal + expressFee;

  const validateStep1 = () => {
    setErrorMsg(null);
    if (!customer.fullName.trim()) return 'Please enter your full name.';
    if (!customer.email.includes('@')) return 'Please enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(customer.mobile.replace(/\D/g, ''))) {
      return 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!customer.address.trim()) return 'Please provide your complete delivery address.';
    if (!customer.city.trim()) return 'Please provide your city.';
    if (!/^[1-9][0-9]{5}$/.test(customer.pincode.trim())) {
      return 'Please enter a valid 6-digit Indian postal PIN code.';
    }
    return null;
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customer,
        paymentMethod,
        notes: notes.trim() || undefined,
        paymentReference:
          paymentMethod === 'cod'
            ? 'COD-PAY-ON-DELIVERY'
            : `RZP_TEST_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      });

      setIsProcessing(false);
      onNavigate(`/order-confirmation?orderNumber=${order.orderNumber}`);
    }, 1200);
  };

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#25221F]/10">
          <div>
            <span className="font-serif text-2xl text-[#25221F]">Fagun Perfumers</span>
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
              Secure Checkout
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#25221F]/70">
            <Lock className="w-4 h-4 text-[#B08D57]" />
            <span className="hidden sm:inline">256-bit Encrypted Checkout</span>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-2 mb-8 text-center text-xs">
          {[
            { num: 1, label: 'Information' },
            { num: 2, label: 'Delivery' },
            { num: 3, label: 'Payment' },
            { num: 4, label: 'Review' }
          ].map(s => (
            <div
              key={s.num}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                step >= s.num
                  ? 'border-[#54202B] text-[#54202B]'
                  : 'border-[#25221F]/10 text-[#25221F]/40'
              }`}
            >
              <span>
                {s.num}. {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form Column */}
          <div className="lg:col-span-7 space-y-6">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Customer & Address Information */}
            {step === 1 && (
              <form onSubmit={handleNextToStep2} className="bg-white p-6 sm:p-8 rounded-sm border border-[#25221F]/8 space-y-4">
                <h3 className="font-serif text-xl text-[#25221F] mb-2">
                  Delivery Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={customer.fullName}
                      onChange={e => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Email Address (for order confirmation) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. radhika@gmail.com"
                      value={customer.email}
                      onChange={e => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Mobile Number (for courier updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98200 45123"
                      value={customer.mobile}
                      onChange={e => setCustomer({ ...customer, mobile: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Street Address & Flat / House Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 402, Nilgiri Residency, Opp. Jain Temple"
                      value={customer.address}
                      onChange={e => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmedabad"
                      value={customer.city}
                      onChange={e => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      State *
                    </label>
                    <select
                      value={customer.state}
                      onChange={e => setCustomer({ ...customer, state: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57]"
                    >
                      {INDIAN_STATES.map(st => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                      Postal PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="6 digits (e.g. 380054)"
                      value={customer.pincode}
                      onChange={e =>
                        setCustomer({ ...customer, pincode: e.target.value.replace(/\D/g, '') })
                      }
                      className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs focus:outline-none focus:border-[#B08D57] tabular-nums"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#54202B] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#3E161F] transition-colors flex items-center gap-2"
                  >
                    <span>Continue to Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Delivery Speed */}
            {step === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#25221F]/8 space-y-4">
                <h3 className="font-serif text-xl text-[#25221F] mb-1">
                  Select Delivery Speed
                </h3>
                <p className="text-xs text-[#25221F]/70 font-light mb-4">
                  All packages are dispatched in eco-friendly protective packaging to prevent damage to fragile incense sticks.
                </p>

                <div className="space-y-3">
                  <label
                    onClick={() => setDeliveryOption('standard')}
                    className={`flex items-center justify-between p-4 rounded-xs border cursor-pointer transition-all ${
                      deliveryOption === 'standard'
                        ? 'border-[#54202B] bg-[#FAF7F0]'
                        : 'border-[#25221F]/10 hover:border-[#B08D57]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryOption === 'standard'}
                        onChange={() => setDeliveryOption('standard')}
                        className="text-[#54202B] focus:ring-[#B08D57]"
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#25221F]">
                          Standard Insured Courier (DTDC / Blue Dart)
                        </div>
                        <div className="text-[11px] text-[#25221F]/60">
                          Estimated arrival: 3 to 5 business days
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#25221F] tabular-nums">
                      {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryOption('express')}
                    className={`flex items-center justify-between p-4 rounded-xs border cursor-pointer transition-all ${
                      deliveryOption === 'express'
                        ? 'border-[#54202B] bg-[#FAF7F0]'
                        : 'border-[#25221F]/10 hover:border-[#B08D57]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryOption === 'express'}
                        onChange={() => setDeliveryOption('express')}
                        className="text-[#54202B] focus:ring-[#B08D57]"
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#25221F]">
                          Express Air Priority Dispatch
                        </div>
                        <div className="text-[11px] text-[#25221F]/60">
                          Priority packaging & air cargo: 1 to 2 business days
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#25221F] tabular-nums">
                      ₹95
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-5 text-xs text-[#25221F]/70 hover:text-[#54202B] flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Details</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="py-3 px-6 bg-[#54202B] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#3E161F] transition-colors flex items-center gap-2"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#25221F]/8 space-y-4">
                <h3 className="font-serif text-xl text-[#25221F] mb-1">
                  Payment Method
                </h3>
                <p className="text-xs text-[#25221F]/70 font-light mb-4">
                  Select your preferred Indian payment mode. All online transactions are handled through simulated test credentials until owner production keys are supplied.
                </p>

                <div className="space-y-3">
                  {/* Indian Payment Gateway (UPI / Cards / Netbanking) */}
                  <label
                    onClick={() => setPaymentMethod('razorpay_test')}
                    className={`block p-4 rounded-xs border cursor-pointer transition-all ${
                      paymentMethod === 'razorpay_test'
                        ? 'border-[#54202B] bg-[#FAF7F0]'
                        : 'border-[#25221F]/10 hover:border-[#B08D57]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'razorpay_test'}
                          onChange={() => setPaymentMethod('razorpay_test')}
                          className="text-[#54202B] focus:ring-[#B08D57]"
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#25221F]">
                            Online Payment (UPI, Credit/Debit Card, Netbanking)
                          </div>
                          <div className="text-[11px] text-[#25221F]/60">
                            Instant verification via Indian Payment Gateway
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#B08D57] bg-[#F8F4EC] px-2 py-0.5 border border-[#B08D57]/30">
                        Zero Fee
                      </span>
                    </div>

                    {paymentMethod === 'razorpay_test' && (
                      <div className="mt-3 pt-3 border-t border-[#25221F]/10 pl-7 space-y-2">
                        <p className="text-[11px] text-[#25221F]/70">
                          Select online payment channel:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { id: 'gpay', label: 'Google Pay / BHIM UPI' },
                            { id: 'phonepe', label: 'PhonePe' },
                            { id: 'paytm', label: 'Paytm UPI' },
                            { id: 'card', label: 'Visa / Mastercard / Rupay' }
                          ].map(opt => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setSelectedUpiMethod(opt.id as any)}
                              className={`px-3 py-1.5 text-xs rounded-xs border ${
                                selectedUpiMethod === opt.id
                                  ? 'bg-[#54202B] text-white border-[#54202B]'
                                  : 'bg-white text-[#25221F] border-[#25221F]/15'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Cash on Delivery (COD) */}
                  {settings.codEnabled && (
                    <label
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex items-start justify-between p-4 rounded-xs border cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#54202B] bg-[#FAF7F0]'
                          : 'border-[#25221F]/10 hover:border-[#B08D57]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="mt-0.5 text-[#54202B] focus:ring-[#B08D57]"
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#25221F]">
                            Cash on Delivery (Pay upon Receipt)
                          </div>
                          <div className="text-[11px] text-[#25221F]/60">
                            Pay with cash or UPI QR scanner when the courier delivers your package.
                          </div>
                        </div>
                      </div>
                    </label>
                  )}
                </div>

                {/* Special Delivery Notes */}
                <div className="pt-2">
                  <label className="block text-xs uppercase tracking-wider text-[#25221F]/70 font-semibold mb-1">
                    Special Instructions / Notes for Dispatch
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please leave with security desk, or delivery required before evening pooja."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="py-3 px-5 text-xs text-[#25221F]/70 hover:text-[#54202B] flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Delivery</span>
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="py-3 px-6 bg-[#54202B] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#3E161F] transition-colors flex items-center gap-2"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Final Order Review & Server Confirmation */}
            {step === 4 && (
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#25221F]/8 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#25221F] mb-1">
                    Review and Confirm Order
                  </h3>
                  <p className="text-xs text-[#25221F]/70 font-light">
                    Please review your shipping destination and payment details before finalizing.
                  </p>
                </div>

                {/* Customer summary */}
                <div className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/8 space-y-2 text-xs">
                  <div className="flex justify-between font-semibold text-[#25221F] border-b border-[#25221F]/8 pb-1.5">
                    <span>Recipient</span>
                    <button
                      onClick={() => setStep(1)}
                      className="text-[#54202B] hover:underline font-normal"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="font-medium text-[#25221F]">{customer.fullName}</p>
                  <p className="text-[#25221F]/70">
                    {customer.address}, {customer.city}, {customer.state} — {customer.pincode}
                  </p>
                  <p className="text-[#25221F]/70">
                    Phone: {customer.mobile} · Email: {customer.email}
                  </p>
                </div>

                {/* Payment and Delivery summary */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#FAF7F0] rounded-xs border border-[#25221F]/8">
                    <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block mb-1">
                      Payment Mode
                    </span>
                    <p className="font-semibold text-[#25221F]">
                      {paymentMethod === 'cod'
                        ? 'Cash on Delivery (Pay upon arrival)'
                        : `Online Gateway (${selectedUpiMethod.toUpperCase()})`}
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF7F0] rounded-xs border border-[#25221F]/8">
                    <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block mb-1">
                      Delivery Option
                    </span>
                    <p className="font-semibold text-[#25221F]">
                      {deliveryOption === 'express'
                        ? 'Express Air Priority Dispatch'
                        : 'Standard Insured Courier'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-[#25221F]/10">
                  <button
                    onClick={() => setStep(3)}
                    className="py-3 px-5 text-xs text-[#25221F]/70 hover:text-[#54202B] flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="py-3.5 px-8 bg-[#54202B] hover:bg-[#3E161F] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-colors flex items-center gap-2 disabled:bg-gray-400"
                  >
                    {isProcessing ? (
                      <span>Verifying with Server...</span>
                    ) : (
                      <>
                        <span>Confirm & Place Order (₹{currentTotal.toFixed(2)})</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Column (Sticky Right) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-sm border border-[#25221F]/8 shadow-xs sticky top-28 space-y-4">
              <h4 className="font-serif text-lg text-[#25221F] pb-3 border-b border-[#25221F]/10">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h4>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 text-xs">
                    <div className="w-12 aspect-[4/5] rounded-xs overflow-hidden shrink-0 border border-[#25221F]/5">
                      <ProductVisual
                        imageKey={item.product.image}
                        name={item.product.name}
                        aspectRatio="4:5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif font-medium text-[#25221F] truncate">
                        {item.product.name}
                      </h5>
                      <p className="text-[10px] text-[#25221F]/60">
                        Qty: {item.quantity} × ₹{item.product.price}
                      </p>
                      <p className="text-[10px] text-[#B08D57] font-light">
                        {item.selectedPackSize}
                      </p>
                    </div>
                    <span className="font-semibold text-[#25221F] tabular-nums">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 pt-4 border-t border-[#25221F]/8 text-xs">
                <div className="flex justify-between text-[#25221F]/70">
                  <span>Bag Subtotal</span>
                  <span className="tabular-nums">₹{cartSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#54202B]">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#25221F]/70">
                  <span>Standard Shipping</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                  </span>
                </div>

                {deliveryOption === 'express' && (
                  <div className="flex justify-between text-[#25221F]/70">
                    <span>Express Air Priority</span>
                    <span className="tabular-nums">₹95</span>
                  </div>
                )}

                <div className="flex justify-between text-[#25221F]/70">
                  <span>GST (5%)</span>
                  <span className="tabular-nums">₹{taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#25221F] pt-3 border-t border-[#25221F]/10">
                  <span>Total Amount</span>
                  <span className="text-[#54202B] tabular-nums">
                    ₹{currentTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#25221F]/60 space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span>Authorized Indian Fragrance House</span>
                </div>
                <p className="text-[10px]">
                  Tamper-evident parcel sealing to preserve pure botanical aromatics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
