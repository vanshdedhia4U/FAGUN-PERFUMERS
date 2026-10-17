export interface FragranceNotes {
  top: string;
  heart: string;
  base: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  variant: string;
  category: 'incense-sticks' | 'dhoop-sticks' | 'premium-fragrances' | 'gift-sets';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  description: string;
  fragranceFamily: 'Woody' | 'Floral' | 'Resinous' | 'Herbal' | 'Musk';
  fragranceNotes: FragranceNotes;
  packSize: string;
  unitsPerPack: number;
  burnTime: string;
  ingredients: string[];
  usageInstructions: string;
  safetyInstructions: string;
  image: string;
  secondaryImage?: string;
  featured?: boolean;
  bestseller?: boolean;
  occasions: string[];
  createdAt: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  title: string;
  comment: string;
  reviewerName: string;
  verifiedPurchase: boolean;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPackSize: string;
}

export type OrderStatus =
  | 'pending_payment'
  | 'payment_failed'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refund_pending'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note?: string;
  actor?: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItemSnapshot {
  productId: string;
  name: string;
  variant: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  packSize: string;
  image: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: OrderItemSnapshot[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: 'cod' | 'razorpay_test';
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  fulfilmentStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: OrderStatusHistoryItem[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minCartValue: number;
  maxDiscount?: number;
  active: boolean;
  expiresAt: string;
  usageCount: number;
  maxUsage?: number;
}

export interface SiteAnnouncement {
  enabled: boolean;
  text: string;
  linkText?: string;
  linkUrl?: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface PromoBannerContent {
  enabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkUrl: string;
}

export interface BrandStoryContent {
  title: string;
  subtitle: string;
  body1: string;
  body2: string;
  quote: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currency: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  codEnabled: boolean;
  taxPercentage: number;
  supportEmail: string;
  supportPhone: string;
  businessAddress: string;
  operationalHours: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  excerpt: string;
  content: string[];
  tags: string[];
  published: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entityType: 'order' | 'product' | 'inventory' | 'coupon' | 'content' | 'settings' | 'auth';
  entityId?: string;
  details: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  change: number;
  previousStock: number;
  newStock: number;
  reason: string;
  timestamp: string;
  actor: string;
}
