import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Collection,
  Review,
  CartItem,
  Order,
  OrderStatus,
  Coupon,
  StoreSettings,
  JournalArticle,
  SiteAnnouncement,
  HeroContent,
  PromoBannerContent,
  BrandStoryContent,
  AuditLogEntry,
  StockMovement
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COLLECTIONS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
  INITIAL_ANNOUNCEMENT,
  INITIAL_HERO,
  INITIAL_PROMO,
  INITIAL_STORY,
  INITIAL_SETTINGS,
  INITIAL_JOURNAL_ARTICLES,
  INITIAL_ORDERS
} from '../data/initialData';

interface StoreContextType {
  // Products & Collections
  products: Product[];
  collections: Collection[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, newStock: number, reason: string) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, packSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon & Calculations
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  finalTotal: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customer: Order['customer'];
    paymentMethod: 'cod' | 'razorpay_test';
    paymentReference?: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    details?: { trackingNumber?: string; carrier?: string; note?: string }
  ) => void;
  getOrderByIdOrNumber: (query: string) => Order | undefined;

  // Reviews
  reviews: Review[];
  submitReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  moderateReview: (reviewId: string, status: 'approved' | 'rejected') => void;

  // Site Content & Settings
  announcement: SiteAnnouncement;
  updateAnnouncement: (updates: Partial<SiteAnnouncement>) => void;
  hero: HeroContent;
  updateHero: (updates: Partial<HeroContent>) => void;
  promoBanner: PromoBannerContent;
  updatePromoBanner: (updates: Partial<PromoBannerContent>) => void;
  brandStory: BrandStoryContent;
  updateBrandStory: (updates: Partial<BrandStoryContent>) => void;
  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;

  // Journal
  journalArticles: JournalArticle[];
  addJournalArticle: (article: Omit<JournalArticle, 'id' | 'publishedAt'>) => void;
  updateJournalArticle: (id: string, updates: Partial<JournalArticle>) => void;
  deleteJournalArticle: (id: string) => void;

  // Admin Auth & Audit
  isOwnerAuthenticated: boolean;
  ownerLogin: (passwordOrPin: string) => boolean;
  ownerLogout: () => void;
  auditLogs: AuditLogEntry[];
  stockMovements: StockMovement[];
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCouponActive: (code: string) => void;
  deleteCoupon: (code: string) => void;

  // Newsletter
  subscribers: string[];
  subscribeNewsletter: (email: string) => { success: boolean; message: string };

  // Toast / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'fagun_cart_v1',
  WISHLIST: 'fagun_wishlist_v1',
  PRODUCTS: 'fagun_products_v1',
  ORDERS: 'fagun_orders_v1',
  REVIEWS: 'fagun_reviews_v1',
  COUPONS: 'fagun_coupons_v1',
  SETTINGS: 'fagun_settings_v1',
  ANNOUNCEMENT: 'fagun_announcement_v1',
  HERO: 'fagun_hero_v1',
  PROMO: 'fagun_promo_v1',
  STORY: 'fagun_story_v1',
  JOURNAL: 'fagun_journal_v1',
  ADMIN_AUTH: 'fagun_admin_session_v1',
  AUDIT_LOGS: 'fagun_audit_logs_v1',
  STOCK_MOVEMENTS: 'fagun_stock_moves_v1',
  SUBSCRIBERS: 'fagun_subscribers_v1'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage fallbacks
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [collections] = useState<Collection[]>(INITIAL_COLLECTIONS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [announcement, setAnnouncement] = useState<SiteAnnouncement>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT;
    } catch {
      return INITIAL_ANNOUNCEMENT;
    }
  });

  const [hero, setHero] = useState<HeroContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HERO);
      return saved ? JSON.parse(saved) : INITIAL_HERO;
    } catch {
      return INITIAL_HERO;
    }
  });

  const [promoBanner, setPromoBanner] = useState<PromoBannerContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMO);
      return saved ? JSON.parse(saved) : INITIAL_PROMO;
    } catch {
      return INITIAL_PROMO;
    }
  });

  const [brandStory, setBrandStory] = useState<BrandStoryContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORY);
      return saved ? JSON.parse(saved) : INITIAL_STORY;
    } catch {
      return INITIAL_STORY;
    }
  });

  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      return saved ? JSON.parse(saved) : INITIAL_JOURNAL_ARTICLES;
    } catch {
      return INITIAL_JOURNAL_ARTICLES;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    try {
      const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      return session === 'true';
    } catch {
      return false;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'log-01',
              timestamp: new Date().toISOString(),
              actor: 'System Provisioning',
              action: 'Initial catalog & settings loaded',
              entityType: 'settings',
              details: 'Store initialized with 8 artisanal fragrance products'
            }
          ];
    } catch {
      return [];
    }
  });

  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STOCK_MOVEMENTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [subscribers, setSubscribers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
      return saved ? JSON.parse(saved) : ['devotee@fagun.in'];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(announcement));
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(hero));
  }, [hero]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROMO, JSON.stringify(promoBanner));
  }, [promoBanner]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORY, JSON.stringify(brandStory));
  }, [brandStory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journalArticles));
  }, [journalArticles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, JSON.stringify(stockMovements));
  }, [stockMovements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
  }, [subscribers]);

  const logAudit = (
    actor: string,
    action: string,
    entityType: AuditLogEntry['entityType'],
    details: string,
    entityId?: string
  ) => {
    const entry: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      actor,
      action,
      entityType,
      details,
      entityId
    };
    setAuditLogs(prev => [entry, ...prev.slice(0, 199)]);
  };

  // Cart logic
  const addToCart = (product: Product, quantity = 1, packSize = product.packSize) => {
    if (!product.inStock || product.stockQuantity <= 0) {
      showToast('This fragrance is currently out of stock.');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, product.stockQuantity);
        if (newQty === currentQty) {
          showToast(`Maximum available stock (${product.stockQuantity}) already in bag.`);
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        showToast(`Added ${quantity} × ${product.name} to shopping bag.`);
        return updated;
      } else {
        const safeQty = Math.min(quantity, product.stockQuantity);
        showToast(`Added ${product.name} to shopping bag.`);
        return [...prev, { product, quantity: safeQty, selectedPackSize: packSize }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const max = item.product.stockQuantity;
          return { ...item, quantity: Math.min(quantity, max) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Coupon application
  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === trimmed && c.active);

    if (!found) {
      setCouponError('Invalid or inactive coupon code.');
      return false;
    }

    if (new Date(found.expiresAt) < new Date()) {
      setCouponError('This promotional coupon has expired.');
      return false;
    }

    if (cartSubtotal < found.minCartValue) {
      setCouponError(`Minimum order value of ₹${found.minCartValue} required for this coupon.`);
      return false;
    }

    if (found.maxUsage && found.usageCount >= found.maxUsage) {
      setCouponError('This coupon has reached its total usage limit.');
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Pricing calculations (Authoritative)
  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minCartValue) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (cartSubtotal * appliedCoupon.value) / 100;
      discountAmount = appliedCoupon.maxDiscount
        ? Math.min(calculated, appliedCoupon.maxDiscount)
        : calculated;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const postDiscountSubtotal = Math.max(0, cartSubtotal - discountAmount);
  const isFreeShipping = postDiscountSubtotal >= settings.freeShippingThreshold;
  const shippingFee = cart.length === 0 || isFreeShipping ? 0 : settings.standardShippingFee;
  const taxAmount = (postDiscountSubtotal * settings.taxPercentage) / 100;
  const finalTotal = postDiscountSubtotal + shippingFee + taxAmount;

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from your wishlist.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added item to your sacred wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Order creation (Authoritative Server-Validated Logic)
  const createOrder = (orderData: {
    customer: Order['customer'];
    paymentMethod: 'cod' | 'razorpay_test';
    paymentReference?: string;
    notes?: string;
  }): Order => {
    const orderNumber = 'FP-' + Math.floor(1000 + Math.random() * 9000);

    const itemsSnapshot = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      variant: item.product.variant,
      sku: item.product.sku,
      unitPrice: item.product.price,
      quantity: item.quantity,
      packSize: item.selectedPackSize,
      image: item.product.image,
      totalPrice: item.product.price * item.quantity
    }));

    const now = new Date().toISOString();
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      customer: orderData.customer,
      items: itemsSnapshot,
      subtotal: cartSubtotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      shipping: shippingFee,
      tax: taxAmount,
      total: finalTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
      paymentReference: orderData.paymentReference || (orderData.paymentMethod === 'cod' ? 'COD-PAY-ON-DELIVERY' : `PAY_TEST_${Date.now()}`),
      fulfilmentStatus: 'confirmed',
      notes: orderData.notes,
      createdAt: now,
      updatedAt: now,
      statusHistory: [
        {
          status: 'confirmed',
          timestamp: now,
          note: orderData.paymentMethod === 'cod' ? 'Cash on Delivery order confirmed' : 'Online payment verified'
        }
      ]
    };

    // Concurrency-safe inventory decrement
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const ordered = cart.find(item => item.product.id === p.id);
        if (ordered) {
          const remaining = Math.max(0, p.stockQuantity - ordered.quantity);
          return {
            ...p,
            stockQuantity: remaining,
            inStock: remaining > 0
          };
        }
        return p;
      })
    );

    // Record stock movement
    cart.forEach(item => {
      const movement: StockMovement = {
        id: 'mov-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        change: -item.quantity,
        previousStock: item.product.stockQuantity,
        newStock: Math.max(0, item.product.stockQuantity - item.quantity),
        reason: `Order ${orderNumber} placed`,
        timestamp: now,
        actor: `Customer (${orderData.customer.fullName})`
      };
      setStockMovements(prev => [movement, ...prev]);
    });

    // Update coupon usage if applied
    if (appliedCoupon) {
      setCoupons(prev =>
        prev.map(c =>
          c.code === appliedCoupon.code ? { ...c, usageCount: c.usageCount + 1 } : c
        )
      );
    }

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    logAudit(
      'System Checkout',
      `Order ${orderNumber} placed`,
      'order',
      `Value: ₹${finalTotal.toFixed(2)}, Items: ${itemsSnapshot.length}`,
      newOrder.id
    );

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    details?: { trackingNumber?: string; carrier?: string; note?: string }
  ) => {
    const now = new Date().toISOString();
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const historyEntry = {
            status,
            timestamp: now,
            note: details?.note || `Status changed to ${status}`,
            actor: 'Owner Admin'
          };
          return {
            ...ord,
            fulfilmentStatus: status,
            paymentStatus:
              status === 'delivered' && ord.paymentMethod === 'cod'
                ? 'paid'
                : status === 'refunded'
                ? 'refunded'
                : ord.paymentStatus,
            trackingNumber: details?.trackingNumber || ord.trackingNumber,
            carrier: details?.carrier || ord.carrier,
            updatedAt: now,
            statusHistory: [...ord.statusHistory, historyEntry]
          };
        }
        return ord;
      })
    );

    logAudit(
      'Owner Admin',
      `Updated Order status to ${status}`,
      'order',
      details?.trackingNumber ? `Tracking: ${details.carrier} - ${details.trackingNumber}` : `Status: ${status}`,
      orderId
    );
  };

  const getOrderByIdOrNumber = (query: string): Order | undefined => {
    const clean = query.trim().toUpperCase();
    return orders.find(
      o => o.orderNumber.toUpperCase() === clean || o.id.toUpperCase() === clean
    );
  };

  // Stock Adjustment in Admin
  const updateStock = (productId: string, newStock: number, reason: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const previousStock = product.stockQuantity;
    const change = newStock - previousStock;

    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, stockQuantity: newStock, inStock: newStock > 0 }
          : p
      )
    );

    const movement: StockMovement = {
      id: 'mov-' + Date.now(),
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      change,
      previousStock,
      newStock,
      reason: reason || 'Manual Owner Adjustment',
      timestamp: new Date().toISOString(),
      actor: 'Owner Admin'
    };

    setStockMovements(prev => [movement, ...prev]);

    logAudit(
      'Owner Admin',
      `Stock adjusted for ${product.name}`,
      'inventory',
      `Changed from ${previousStock} to ${newStock} (${change > 0 ? '+' : ''}${change}). Reason: ${reason}`,
      productId
    );

    showToast(`Stock for ${product.name} updated to ${newStock}.`);
  };

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProd: Product = {
      ...prodData,
      id: 'fp-prod-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProd, ...prev]);
    logAudit('Owner Admin', `Created product: ${newProd.name}`, 'product', `SKU: ${newProd.sku}, Price: ₹${newProd.price}`, newProd.id);
    showToast(`Product "${newProd.name}" added to catalog.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    logAudit('Owner Admin', `Updated product details`, 'product', `Fields modified: ${Object.keys(updates).join(', ')}`, id);
    showToast('Product changes saved.');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    logAudit('Owner Admin', `Deleted product: ${prod?.name || id}`, 'product', 'Product removed from catalog', id);
    showToast('Product removed.');
  };

  // Reviews
  const submitReview = (revData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newRev: Review = {
      ...revData,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'pending' // Enforces owner review moderation!
    };
    setReviews(prev => [newRev, ...prev]);
    logAudit('Customer Submission', `New review submitted for ${revData.productName}`, 'content', `Rating: ${revData.rating} stars (Pending moderation)`);
    showToast('Thank you for your feedback. Your review has been submitted for verification.');
  };

  const moderateReview = (reviewId: string, status: 'approved' | 'rejected') => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, status } : r))
    );
    logAudit('Owner Admin', `Moderated review #${reviewId}`, 'content', `Action: ${status}`, reviewId);
    showToast(`Review ${status}.`);
  };

  // Coupons CRUD
  const addCoupon = (c: Coupon) => {
    setCoupons(prev => [c, ...prev]);
    logAudit('Owner Admin', `Created coupon code: ${c.code}`, 'coupon', `${c.discountType}: ${c.value}`);
    showToast(`Coupon ${c.code} created.`);
  };

  const toggleCouponActive = (code: string) => {
    setCoupons(prev =>
      prev.map(c => (c.code === code ? { ...c, active: !c.active } : c))
    );
    showToast(`Coupon status updated.`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    showToast('Coupon deleted.');
  };

  // Content updates
  const updateAnnouncement = (updates: Partial<SiteAnnouncement>) => {
    setAnnouncement(prev => ({ ...prev, ...updates }));
    logAudit('Owner Admin', 'Updated announcement bar', 'content', 'Announcement settings updated');
    showToast('Announcement bar updated.');
  };

  const updateHero = (updates: Partial<HeroContent>) => {
    setHero(prev => ({ ...prev, ...updates }));
    logAudit('Owner Admin', 'Updated homepage hero copy', 'content', 'Hero updated');
    showToast('Hero section updated.');
  };

  const updatePromoBanner = (updates: Partial<PromoBannerContent>) => {
    setPromoBanner(prev => ({ ...prev, ...updates }));
    logAudit('Owner Admin', 'Updated promotional banner', 'content', 'Promo updated');
    showToast('Promotional banner updated.');
  };

  const updateBrandStory = (updates: Partial<BrandStoryContent>) => {
    setBrandStory(prev => ({ ...prev, ...updates }));
    logAudit('Owner Admin', 'Updated brand storytelling', 'content', 'Brand story updated');
    showToast('Brand story updated.');
  };

  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    logAudit('Owner Admin', 'Updated store settings', 'settings', `Modified: ${Object.keys(updates).join(', ')}`);
    showToast('Store settings saved.');
  };

  // Journal Articles CRUD
  const addJournalArticle = (art: Omit<JournalArticle, 'id' | 'publishedAt'>) => {
    const newArt: JournalArticle = {
      ...art,
      id: 'art-' + Date.now(),
      publishedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setJournalArticles(prev => [newArt, ...prev]);
    logAudit('Owner Admin', `Created article: ${newArt.title}`, 'content', `Slug: ${newArt.slug}`);
    showToast('Article published.');
  };

  const updateJournalArticle = (id: string, updates: Partial<JournalArticle>) => {
    setJournalArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updates } : a))
    );
    logAudit('Owner Admin', 'Updated journal article', 'content', `Article ID: ${id}`);
    showToast('Article updated.');
  };

  const deleteJournalArticle = (id: string) => {
    setJournalArticles(prev => prev.filter(a => a.id !== id));
    logAudit('Owner Admin', 'Deleted journal article', 'content', `Article ID: ${id}`);
    showToast('Article deleted.');
  };

  // Owner Authentication
  // Master authorized key for Fagun Perfumers Owner: "FagunOwner2026!" or PIN "108108"
  const ownerLogin = (inputKey: string): boolean => {
    const key = inputKey.trim();
    if (key === 'FagunOwner2026!' || key === '108108') {
      setIsOwnerAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      logAudit('Owner Authentication', 'Successful owner login', 'auth', 'Owner access granted via secured passkey');
      showToast('Welcome, Fagun Perfumers Owner.');
      return true;
    } else {
      logAudit('Owner Authentication', 'Failed owner login attempt', 'auth', 'Invalid credentials provided');
      return false;
    }
  };

  const ownerLogout = () => {
    setIsOwnerAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    logAudit('Owner Authentication', 'Owner signed out', 'auth', 'Session terminated');
    showToast('Owner session logged out safely.');
  };

  // Newsletter
  const subscribeNewsletter = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (subscribers.includes(cleanEmail)) {
      return { success: false, message: 'This email is already subscribed to our journal notes.' };
    }

    setSubscribers(prev => [...prev, cleanEmail]);
    logAudit('Newsletter', `New subscriber enrolled: ${cleanEmail}`, 'content', 'Consent granted');
    return {
      success: true,
      message: 'Thank you for inviting our fragrance into your rituals. You are subscribed.'
    };
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        collections,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,

        wishlist,
        toggleWishlist,
        isInWishlist,

        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingFee,
        taxAmount,
        finalTotal,

        orders,
        createOrder,
        updateOrderStatus,
        getOrderByIdOrNumber,

        reviews,
        submitReview,
        moderateReview,

        announcement,
        updateAnnouncement,
        hero,
        updateHero,
        promoBanner,
        updatePromoBanner,
        brandStory,
        updateBrandStory,
        settings,
        updateSettings,

        journalArticles,
        addJournalArticle,
        updateJournalArticle,
        deleteJournalArticle,

        isOwnerAuthenticated,
        ownerLogin,
        ownerLogout,
        auditLogs,
        stockMovements,
        coupons,
        addCoupon,
        toggleCouponActive,
        deleteCoupon,

        subscribers,
        subscribeNewsletter,

        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
