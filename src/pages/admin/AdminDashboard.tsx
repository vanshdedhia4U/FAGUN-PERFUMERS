import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus, Coupon, JournalArticle } from '../../types';
import { ProductVisual } from '../../components/ProductVisual';
import {
  Shield,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  FileText,
  Settings,
  History,
  Star,
  LogOut,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Truck,
  Download,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Lock,
  Eye,
  RefreshCw,
  Sliders,
  DollarSign
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const {
    isOwnerAuthenticated,
    ownerLogin,
    ownerLogout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    orders,
    updateOrderStatus,
    reviews,
    moderateReview,
    coupons,
    addCoupon,
    toggleCouponActive,
    deleteCoupon,
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
    deleteJournalArticle,
    auditLogs,
    stockMovements,
    showToast
  } = useStore();

  // Authentication State
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Active Admin View
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'orders'
    | 'products'
    | 'inventory'
    | 'customers'
    | 'coupons'
    | 'content'
    | 'reviews'
    | 'settings'
    | 'audit'
  >('overview');

  // Orders View State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingCarrierInput, setTrackingCarrierInput] = useState('DTDC Express');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [statusNoteInput, setStatusNoteInput] = useState('');

  // Product Edit/Add Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    variant: '',
    category: 'incense-sticks',
    price: 350,
    originalPrice: 420,
    sku: '',
    stockQuantity: 50,
    fragranceFamily: 'Woody',
    packSize: 'Pack of 50 Sticks',
    unitsPerPack: 50,
    burnTime: 'Approx. 50 minutes',
    description: '',
    image: 'sandalwood',
    inStock: true,
    featured: false,
    bestseller: false,
    occasions: ['Daily Pooja', 'Morning Rituals'],
    ingredients: ['Natural tree gums', 'Pure botanical oils', 'Bamboo core'],
    fragranceNotes: {
      top: 'Sweet Sandalwood, Camphor',
      heart: 'Cedarwood, Mysore Sandalwood',
      base: 'Frankincense, Amber Resin'
    },
    usageInstructions: 'Light tip, let flame burn for 5 seconds, gently blow out.',
    safetyInstructions: 'Keep away from flammable objects. Ensure room ventilation.'
  });

  // Stock Adjustment Modal
  const [stockAdjustProduct, setStockAdjustProduct] = useState<Product | null>(null);
  const [newStockQty, setNewStockQty] = useState<number>(0);
  const [stockReason, setStockReason] = useState<string>('Received new handcrafted batch');

  // Coupon Creation Form
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    code: '',
    discountType: 'percentage',
    value: 10,
    minCartValue: 500,
    maxDiscount: 200,
    active: true,
    expiresAt: '2026-12-31',
    maxUsage: 100
  });

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAttempts >= 5) {
      setAuthError('Too many failed attempts. Security rate-limit active. Please wait 1 minute.');
      return;
    }

    const success = ownerLogin(passkeyInput);
    if (!success) {
      setLoginAttempts(prev => prev + 1);
      setAuthError('Invalid owner credentials. Access denied.');
    } else {
      setAuthError(null);
      setPasskeyInput('');
    }
  };

  // ==========================================
  // METRICS CALCULATIONS (Authoritative)
  // ==========================================
  const validPaidOrders = orders.filter(
    o => o.paymentStatus === 'paid' && o.fulfilmentStatus !== 'cancelled' && o.fulfilmentStatus !== 'refunded'
  );
  const totalNetRevenue = validPaidOrders.reduce((sum, o) => sum + o.total, 0);
  const grossSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingFulfilmentCount = orders.filter(
    o => o.fulfilmentStatus === 'confirmed' || o.fulfilmentStatus === 'processing' || o.fulfilmentStatus === 'packed'
  ).length;
  const deliveredCount = orders.filter(o => o.fulfilmentStatus === 'delivered').length;
  const lowStockProducts = products.filter(p => p.stockQuantity <= 15);
  const averageOrderValue = validPaidOrders.length > 0 ? totalNetRevenue / validPaidOrders.length : 0;

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (orderStatusFilter !== 'all' && o.fulfilmentStatus !== orderStatusFilter) {
        return false;
      }
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.customer.fullName.toLowerCase().includes(q) ||
          o.customer.email.toLowerCase().includes(q) ||
          o.customer.mobile.includes(q) ||
          o.items.some(i => i.name.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // Unique customers list
  const customersList = useMemo(() => {
    const map = new Map<string, { customer: Order['customer']; ordersCount: number; totalSpent: number; lastOrder: string }>();
    orders.forEach(o => {
      const email = o.customer.email.toLowerCase();
      if (!map.has(email)) {
        map.set(email, {
          customer: o.customer,
          ordersCount: 1,
          totalSpent: o.total,
          lastOrder: o.createdAt
        });
      } else {
        const prev = map.get(email)!;
        map.set(email, {
          ...prev,
          ordersCount: prev.ordersCount + 1,
          totalSpent: prev.totalSpent + o.total,
          lastOrder: new Date(o.createdAt) > new Date(prev.lastOrder) ? o.createdAt : prev.lastOrder
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  // Export orders to CSV
  const handleExportCSV = () => {
    const headers = [
      'Order Number',
      'Date',
      'Customer Name',
      'Email',
      'Mobile',
      'City',
      'State',
      'PIN',
      'Items Count',
      'Subtotal',
      'Discount',
      'Shipping',
      'Tax',
      'Total (INR)',
      'Payment Method',
      'Payment Status',
      'Fulfillment Status',
      'Tracking Number'
    ];

    const rows = filteredOrders.map(o => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customer.fullName}"`,
      o.customer.email,
      o.customer.mobile,
      `"${o.customer.city}"`,
      `"${o.customer.state}"`,
      o.customer.pincode,
      o.items.reduce((s, i) => s + i.quantity, 0),
      o.subtotal,
      o.discount,
      o.shipping,
      o.tax.toFixed(2),
      o.total.toFixed(2),
      o.paymentMethod,
      o.paymentStatus,
      o.fulfilmentStatus,
      o.trackingNumber || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Fagun_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders exported to CSV.');
  };

  // If not authenticated as owner, render secure sign-in wall
  if (!isOwnerAuthenticated) {
    return (
      <div className="min-h-screen bg-[#25221F] text-[#F8F4EC] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#2D2A26] p-8 rounded-sm border border-[#B08D57]/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full border border-[#B08D57]/50 flex items-center justify-center text-[#B08D57] mx-auto bg-black/20">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B08D57] font-semibold block">
              Fagun Perfumers Guild
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Owner Administration
            </h1>
            <p className="text-xs text-[#F8F4EC]/65 font-light">
              Restricted portal for store owner and operations. Enter your provisioned master key to access database records.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#F8F4EC]/80 font-semibold mb-1">
                Owner Passkey or PIN
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B08D57]" />
                <input
                  type="password"
                  required
                  autoFocus
                  value={passkeyInput}
                  onChange={e => setPasskeyInput(e.target.value)}
                  placeholder="Master Passkey or PIN..."
                  className="w-full pl-9 pr-3 py-2.5 bg-[#1F1C1A] border border-[#B08D57]/30 rounded-xs text-xs text-white focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            </div>

            {authError && (
              <div className="p-2.5 bg-red-950/80 border border-red-700/60 text-red-300 text-xs rounded-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#54202B] hover:bg-[#3E161F] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md transition-colors"
            >
              Verify & Enter Portal
            </button>
          </form>

          {/* Secure Provisioning Guide for Owner */}
          <div className="pt-4 border-t border-white/10 text-[11px] text-[#F8F4EC]/60 space-y-1.5 font-light">
            <p className="text-[#B08D57] font-medium">Provisioned Owner Credentials:</p>
            <p>• Master Key: <code className="text-white font-mono bg-black/30 px-1 py-0.5 rounded">FagunOwner2026!</code></p>
            <p>• Fast PIN: <code className="text-white font-mono bg-black/30 px-1 py-0.5 rounded">108108</code></p>
            <p className="text-[10px] text-white/40 pt-1">All authentication attempts are audited and IP monitored.</p>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-[#F8F4EC]/60 hover:text-white transition-colors underline"
            >
              ← Return to Public Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#25221F] flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-[#25221F] text-[#F8F4EC] px-4 sm:px-6 py-3 border-b border-[#B08D57]/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl tracking-wider text-white">
              Fagun Perfumers
            </span>
            <span className="text-[9px] uppercase tracking-widest bg-[#54202B] text-[#B08D57] px-2 py-0.5 rounded-xs font-semibold border border-[#B08D57]/40">
              Owner Mode
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onNavigate('/')}
              className="text-[#F8F4EC]/75 hover:text-white flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Live Store</span>
            </button>
            <button
              onClick={ownerLogout}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#25221F]/15 scrollbar-none text-xs font-medium uppercase tracking-wider">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'inventory', label: 'Inventory', icon: Sliders },
            { id: 'customers', label: `Customers (${customersList.length})`, icon: Users },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'content', label: 'Content CMS', icon: FileText },
            { id: 'reviews', label: `Reviews (${reviews.filter(r => r.status === 'pending').length} pending)`, icon: Star },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'audit', label: 'Audit Log', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 sm:px-4 rounded-xs whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors border ${
                  active
                    ? 'bg-[#54202B] text-white border-[#54202B] shadow-xs'
                    : 'bg-white text-[#25221F]/80 border-[#25221F]/10 hover:border-[#B08D57]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW METRICS & RECENT ORDERS                  */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xs border border-[#25221F]/8 shadow-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                  Net Paid Revenue
                </span>
                <div className="text-2xl font-bold text-[#54202B] tabular-nums">
                  ₹{totalNetRevenue.toFixed(2)}
                </div>
                <p className="text-[11px] text-[#25221F]/60 mt-1">
                  From {validPaidOrders.length} confirmed paid orders
                </p>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#25221F]/8 shadow-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                  Orders Awaiting Dispatch
                </span>
                <div className="text-2xl font-bold text-[#25221F] tabular-nums">
                  {pendingFulfilmentCount}
                </div>
                <p className="text-[11px] text-[#25221F]/60 mt-1">
                  Confirmed, processing & packed
                </p>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#25221F]/8 shadow-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                  Average Order Value (AOV)
                </span>
                <div className="text-2xl font-bold text-[#25221F] tabular-nums">
                  ₹{averageOrderValue.toFixed(2)}
                </div>
                <p className="text-[11px] text-[#25221F]/60 mt-1">
                  Across paid customer carts
                </p>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#25221F]/8 shadow-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                  Inventory Alerts
                </span>
                <div className="text-2xl font-bold text-amber-700 tabular-nums">
                  {lowStockProducts.length}
                </div>
                <p className="text-[11px] text-[#25221F]/60 mt-1">
                  Products with stock ≤ 15 units
                </p>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Orders Table (8 cols) */}
              <div className="lg:col-span-8 bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#25221F]/10">
                  <h3 className="font-serif text-lg text-[#25221F] font-semibold">
                    Recent Customer Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#54202B] hover:underline font-medium"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#25221F]/10 text-[10px] uppercase text-[#25221F]/60">
                        <th className="py-2">Order</th>
                        <th className="py-2">Customer</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Payment</th>
                        <th className="py-2 text-right">Total</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#25221F]/5">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-[#FAF7F0]">
                          <td className="py-3 font-mono font-bold text-[#25221F]">
                            {o.orderNumber}
                          </td>
                          <td className="py-3">
                            <span className="font-medium text-[#25221F] block">{o.customer.fullName}</span>
                            <span className="text-[10px] text-[#25221F]/50">{o.customer.city}</span>
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold uppercase tracking-wider bg-[#FAF7F0] text-[#54202B] border border-[#B08D57]/30">
                              {o.fulfilmentStatus.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 uppercase text-[10px]">
                            <span className={o.paymentStatus === 'paid' ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
                              {o.paymentStatus} ({o.paymentMethod})
                            </span>
                          </td>
                          <td className="py-3 text-right font-semibold tabular-nums">
                            ₹{o.total.toFixed(2)}
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedOrder(o);
                                setActiveTab('orders');
                              }}
                              className="text-[#54202B] hover:underline font-semibold"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bestselling Products & Stock Warnings (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
                  <h3 className="font-serif text-lg text-[#25221F] font-semibold pb-2 border-b border-[#25221F]/10">
                    Bestselling Fragrances
                  </h3>
                  <div className="space-y-3">
                    {products
                      .filter(p => p.bestseller)
                      .slice(0, 4)
                      .map(p => (
                        <div key={p.id} className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-medium text-[#25221F] block">{p.name}</span>
                            <span className="text-[10px] text-[#25221F]/50">{p.variant}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold tabular-nums">₹{p.price}</span>
                            <span className="text-[10px] text-[#B08D57] block">{p.stockQuantity} in stock</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {lowStockProducts.length > 0 && (
                  <div className="bg-amber-50 p-5 rounded-sm border border-amber-300 space-y-2">
                    <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Low Stock Fragrances</span>
                    </div>
                    <ul className="text-xs text-amber-900 space-y-1">
                      {lowStockProducts.map(p => (
                        <li key={p.id} className="flex justify-between">
                          <span>{p.name}</span>
                          <strong>{p.stockQuantity} remaining</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ORDERS MANAGEMENT MODULE                          */}
        {/* ======================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25221F]/40" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    placeholder="Search by Order #, customer name, email, or mobile..."
                    className="w-full pl-9 pr-3 py-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={orderStatusFilter}
                    onChange={e => setOrderStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs focus:outline-none"
                  >
                    <option value="all">All Fulfillment Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="refunded">Refunded</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 bg-[#25221F] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#54202B] transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#25221F]/10 text-[10px] uppercase text-[#25221F]/60">
                      <th className="py-2.5">Order No</th>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Customer & Destination</th>
                      <th className="py-2.5">Items</th>
                      <th className="py-2.5">Payment</th>
                      <th className="py-2.5">Fulfillment</th>
                      <th className="py-2.5 text-right">Payable</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#25221F]/5">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-[#25221F]/60">
                          No orders found matching the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(ord => (
                        <tr key={ord.id} className="hover:bg-[#FAF7F0]">
                          <td className="py-3 font-mono font-bold text-[#25221F]">
                            {ord.orderNumber}
                          </td>
                          <td className="py-3 text-[11px] text-[#25221F]/60 tabular-nums">
                            {new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="py-3">
                            <span className="font-semibold text-[#25221F] block">{ord.customer.fullName}</span>
                            <span className="text-[10px] text-[#25221F]/60">
                              {ord.customer.city}, {ord.customer.state} ({ord.customer.pincode})
                            </span>
                          </td>
                          <td className="py-3 tabular-nums">
                            {ord.items.reduce((s, i) => s + i.quantity, 0)} units
                          </td>
                          <td className="py-3 text-[10px]">
                            <span
                              className={`px-2 py-0.5 rounded-xs uppercase font-semibold ${
                                ord.paymentStatus === 'paid'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {ord.paymentStatus}
                            </span>
                            <span className="block text-[#25221F]/50 mt-0.5">
                              {ord.paymentMethod === 'cod' ? 'COD' : 'Online'}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="px-2.5 py-0.5 rounded-xs text-[10px] uppercase font-bold tracking-wider bg-[#54202B] text-white">
                              {ord.fulfilmentStatus.replace('_', ' ')}
                            </span>
                            {ord.trackingNumber && (
                              <span className="block text-[10px] text-[#B08D57] font-mono mt-0.5">
                                AWB: {ord.trackingNumber}
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-right font-semibold tabular-nums text-sm">
                            ₹{ord.total.toFixed(2)}
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-3 py-1 bg-[#FAF7F0] hover:bg-[#54202B] hover:text-white text-[#25221F] rounded-xs border border-[#25221F]/15 font-semibold text-[11px] transition-colors"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Order Detail & Status Update Drawer / Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div
                  className="fixed inset-0 bg-[#25221F]/70 backdrop-blur-xs"
                  onClick={() => setSelectedOrder(null)}
                />
                <div className="relative min-h-screen flex items-center justify-center p-4">
                  <div className="relative w-full max-w-2xl bg-[#F8F4EC] p-6 sm:p-8 rounded-sm shadow-2xl border border-[#B08D57]/40 space-y-6">
                    <div className="flex items-start justify-between pb-4 border-b border-[#25221F]/10">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-semibold">
                          Order Administration
                        </span>
                        <h3 className="font-mono text-2xl font-bold text-[#25221F]">
                          {selectedOrder.orderNumber}
                        </h3>
                        <p className="text-xs text-[#25221F]/60">
                          Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-[#25221F]/50 hover:text-[#54202B] p-1 font-bold text-lg"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Customer and Delivery Info */}
                    <div className="grid grid-cols-2 gap-4 text-xs bg-white p-4 rounded-xs border border-[#25221F]/8">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block mb-1">
                          Delivery Customer
                        </span>
                        <p className="font-semibold text-[#25221F]">{selectedOrder.customer.fullName}</p>
                        <p className="text-[#25221F]/70">{selectedOrder.customer.address}</p>
                        <p className="text-[#25221F]/70">
                          {selectedOrder.customer.city}, {selectedOrder.customer.state} — {selectedOrder.customer.pincode}
                        </p>
                        <p className="text-[#25221F]/70">Phone: {selectedOrder.customer.mobile}</p>
                        <p className="text-[#25221F]/70">Email: {selectedOrder.customer.email}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block mb-1">
                          Payment Details
                        </span>
                        <p className="font-semibold text-[#25221F] capitalize">
                          {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </p>
                        <p className="text-[#25221F]/70">Status: <strong className="uppercase">{selectedOrder.paymentStatus}</strong></p>
                        <p className="text-[#25221F]/70 font-mono text-[11px]">Ref: {selectedOrder.paymentReference}</p>
                        {selectedOrder.notes && (
                          <p className="text-amber-800 text-[11px] mt-2 bg-amber-50 p-1.5 rounded-xs">
                            Note: {selectedOrder.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Purchased Items List */}
                    <div className="bg-white p-4 rounded-xs border border-[#25221F]/8">
                      <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block mb-2">
                        Purchased Fragrances
                      </span>
                      <div className="space-y-2 text-xs">
                        {selectedOrder.items.map(it => (
                          <div key={it.productId} className="flex justify-between py-1 border-b border-[#25221F]/5">
                            <div>
                              <strong className="text-[#25221F]">{it.name}</strong> ({it.variant})
                              <span className="text-[10px] text-[#25221F]/60 block">SKU: {it.sku} · {it.packSize}</span>
                            </div>
                            <div className="text-right">
                              <span className="tabular-nums">{it.quantity} × ₹{it.unitPrice}</span>
                              <strong className="block text-[#54202B] tabular-nums">₹{it.totalPrice}</strong>
                            </div>
                          </div>
                        ))}
                        <div className="pt-2 flex justify-between font-bold text-sm">
                          <span>Total Order Value:</span>
                          <span className="text-[#54202B] tabular-nums">₹{selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Update Status & Dispatch Tracking Controls */}
                    <div className="bg-white p-4 rounded-xs border border-[#25221F]/8 space-y-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block">
                        Update Fulfillment Status
                      </span>

                      <div className="flex flex-wrap gap-2 text-xs">
                        {[
                          'confirmed',
                          'processing',
                          'packed',
                          'shipped',
                          'delivered',
                          'cancelled',
                          'refunded'
                        ].map(st => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              updateOrderStatus(selectedOrder.id, st as OrderStatus, {
                                trackingNumber: trackingNumberInput || selectedOrder.trackingNumber,
                                carrier: trackingCarrierInput || selectedOrder.carrier,
                                note: statusNoteInput || undefined
                              });
                              setSelectedOrder({ ...selectedOrder, fulfilmentStatus: st as OrderStatus });
                            }}
                            className={`px-3 py-1.5 rounded-xs uppercase tracking-wider font-semibold border ${
                              selectedOrder.fulfilmentStatus === st
                                ? 'bg-[#54202B] text-white border-[#54202B]'
                                : 'bg-[#FAF7F0] text-[#25221F] border-[#25221F]/15 hover:border-[#B08D57]'
                            }`}
                          >
                            Mark {st}
                          </button>
                        ))}
                      </div>

                      {/* Shipment Tracking details */}
                      <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                        <div>
                          <label className="block text-[10px] uppercase text-[#25221F]/70 font-semibold mb-1">
                            Courier Carrier
                          </label>
                          <input
                            type="text"
                            value={trackingCarrierInput}
                            onChange={e => setTrackingCarrierInput(e.target.value)}
                            className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase text-[#25221F]/70 font-semibold mb-1">
                            Air Waybill / Tracking No (AWB)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. DTDC-8823901"
                            value={trackingNumberInput}
                            onChange={e => setTrackingNumberInput(e.target.value)}
                            className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-[#25221F]/70 font-semibold mb-1">
                          Status Update Note / Customer Memo
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dispatched via express van, parcel sealed with gold foil stamp."
                          value={statusNoteInput}
                          onChange={e => setStatusNoteInput(e.target.value)}
                          className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PRODUCTS CATALOG MANAGEMENT                       */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-[#25221F]">Fragrance Catalog</h3>
                <p className="text-xs text-[#25221F]/60">
                  Manage active agarbatti, dhoop sticks, prices, stock quantities, and descriptions.
                </p>
              </div>

              <button
                onClick={() => {
                  setProductForm({
                    name: '',
                    variant: '',
                    category: 'incense-sticks',
                    price: 350,
                    originalPrice: 420,
                    sku: 'FP-AGB-' + Math.floor(10 + Math.random() * 90),
                    stockQuantity: 40,
                    fragranceFamily: 'Woody',
                    packSize: 'Pack of 50 Sticks',
                    unitsPerPack: 50,
                    burnTime: 'Approx. 50 minutes',
                    description: '',
                    image: 'sandalwood',
                    inStock: true,
                    featured: false,
                    bestseller: false,
                    occasions: ['Daily Pooja', 'Morning Rituals'],
                    ingredients: ['Natural tree resins', 'Botanical wood powder', 'Bamboo core'],
                    fragranceNotes: { top: 'Fresh', heart: 'Spiritual Floral', base: 'Warm Wood' },
                    usageInstructions: 'Light tip, blow out after 5 seconds.',
                    safetyInstructions: 'Keep in ventilated holder away from drafts.'
                  });
                  setIsAddingProduct(true);
                }}
                className="px-4 py-2.5 bg-[#54202B] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#3E161F] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Fragrance</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-sm border border-[#25221F]/10 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#25221F]/10 text-[10px] uppercase text-[#25221F]/60">
                    <th className="p-3">Product</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock Units</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#25221F]/5">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-[#FAF7F0]">
                      <td className="p-3 flex items-center gap-3">
                        <div className="w-10 aspect-[4/5] overflow-hidden rounded-xs shrink-0 border border-[#25221F]/10">
                          <ProductVisual imageKey={p.image} name={p.name} aspectRatio="4:5" />
                        </div>
                        <div>
                          <strong className="text-sm font-serif text-[#25221F] block">{p.name}</strong>
                          <span className="text-[10px] text-[#25221F]/60">{p.variant}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-[#25221F]/70">{p.sku}</td>
                      <td className="p-3 uppercase text-[10px] font-medium text-[#B08D57]">
                        {p.category.replace('-', ' ')}
                      </td>
                      <td className="p-3 font-semibold tabular-nums">
                        ₹{p.price}
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-[10px] text-gray-400 line-through ml-1.5">
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-semibold tabular-nums ${
                            p.stockQuantity <= 15 ? 'text-red-700' : 'text-[#25221F]'
                          }`}
                        >
                          {p.stockQuantity} units
                        </span>
                        {p.stockQuantity <= 15 && (
                          <span className="block text-[9px] uppercase tracking-wider text-red-600 font-bold">
                            Low Stock
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                          className={`px-2 py-0.5 rounded-xs text-[10px] uppercase font-bold tracking-wider ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.inStock ? 'Active' : 'Unpublished'}
                        </button>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setStockAdjustProduct(p);
                            setNewStockQty(p.stockQuantity);
                          }}
                          className="px-2.5 py-1 bg-[#FAF7F0] hover:bg-[#54202B] hover:text-white rounded-xs border border-[#25221F]/15 text-[10px] font-semibold uppercase tracking-wider transition-colors"
                        >
                          Stock
                        </button>
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm(p);
                          }}
                          className="p-1 hover:text-[#54202B]"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete product "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1 hover:text-red-600"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add / Edit Product Modal */}
            {(isAddingProduct || editingProduct) && (
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div
                  className="fixed inset-0 bg-[#25221F]/70 backdrop-blur-xs"
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                />
                <div className="relative min-h-screen flex items-center justify-center p-4">
                  <div className="relative w-full max-w-2xl bg-[#F8F4EC] p-6 sm:p-8 rounded-sm shadow-2xl border border-[#B08D57]/40 space-y-4">
                    <h3 className="font-serif text-2xl text-[#25221F]">
                      {editingProduct ? `Edit ${editingProduct.name}` : 'Create New Sacred Fragrance'}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          value={productForm.name}
                          onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs"
                        />
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          Variant Subtitle *
                        </label>
                        <input
                          type="text"
                          value={productForm.variant}
                          onChange={e => setProductForm({ ...productForm, variant: e.target.value })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs"
                        />
                      </div>

                      <div>
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          Category
                        </label>
                        <select
                          value={productForm.category}
                          onChange={e => setProductForm({ ...productForm, category: e.target.value as any })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs"
                        >
                          <option value="incense-sticks">Incense Sticks</option>
                          <option value="dhoop-sticks">Dhoop Sticks</option>
                          <option value="premium-fragrances">Premium Fragrances</option>
                          <option value="gift-sets">Festive Gift Sets</option>
                        </select>
                      </div>

                      <div>
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          Fragrance Family
                        </label>
                        <select
                          value={productForm.fragranceFamily}
                          onChange={e => setProductForm({ ...productForm, fragranceFamily: e.target.value as any })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs"
                        >
                          <option value="Woody">Woody</option>
                          <option value="Floral">Floral</option>
                          <option value="Resinous">Resinous</option>
                          <option value="Herbal">Herbal</option>
                          <option value="Musk">Musk</option>
                        </select>
                      </div>

                      <div>
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          Selling Price (₹) *
                        </label>
                        <input
                          type="number"
                          value={productForm.price}
                          onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs tabular-nums"
                        />
                      </div>

                      <div>
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          Original Price (₹ Optional)
                        </label>
                        <input
                          type="number"
                          value={productForm.originalPrice || ''}
                          onChange={e => setProductForm({ ...productForm, originalPrice: Number(e.target.value) || undefined })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs tabular-nums"
                        />
                      </div>

                      <div>
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          Stock Quantity (Units)
                        </label>
                        <input
                          type="number"
                          value={productForm.stockQuantity}
                          onChange={e => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs tabular-nums"
                        />
                      </div>

                      <div>
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          SKU Identifier
                        </label>
                        <input
                          type="text"
                          value={productForm.sku}
                          onChange={e => setProductForm({ ...productForm, sku: e.target.value })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs font-mono"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={productForm.description}
                          onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                          className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs"
                        />
                      </div>

                      <div className="col-span-2 flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.bestseller}
                            onChange={e => setProductForm({ ...productForm, bestseller: e.target.checked })}
                            className="rounded text-[#54202B]"
                          />
                          <span>Mark as Bestseller</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.featured}
                            onChange={e => setProductForm({ ...productForm, featured: e.target.checked })}
                            className="rounded text-[#54202B]"
                          />
                          <span>Feature on Homepage</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#25221F]/10">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProduct(false);
                          setEditingProduct(null);
                        }}
                        className="px-4 py-2 text-xs text-[#25221F]/70 hover:text-[#54202B]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingProduct) {
                            updateProduct(editingProduct.id, productForm);
                            setEditingProduct(null);
                          } else {
                            const slug = (productForm.name || 'fragrance')
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)+/g, '');

                            addProduct({
                              slug,
                              name: productForm.name || 'New Fragrance',
                              variant: productForm.variant || 'Natural Sticks',
                              category: productForm.category as any,
                              price: productForm.price || 350,
                              originalPrice: productForm.originalPrice,
                              rating: 5.0,
                              reviewCount: 0,
                              inStock: (productForm.stockQuantity || 0) > 0,
                              stockQuantity: productForm.stockQuantity || 30,
                              sku: productForm.sku || 'FP-SKU-' + Date.now(),
                              description: productForm.description || 'Artisanal incense formulation.',
                              fragranceFamily: productForm.fragranceFamily as any,
                              fragranceNotes: productForm.fragranceNotes || { top: 'Fresh', heart: 'Sacred', base: 'Wood' },
                              packSize: productForm.packSize || 'Pack of 50 Sticks',
                              unitsPerPack: productForm.unitsPerPack || 50,
                              burnTime: productForm.burnTime || 'Approx. 50 minutes',
                              ingredients: productForm.ingredients || ['Natural barks', 'Essential oils'],
                              usageInstructions: productForm.usageInstructions || 'Light tip and blow out.',
                              safetyInstructions: productForm.safetyInstructions || 'Keep in ventilated area.',
                              image: productForm.image || 'sandalwood',
                              featured: productForm.featured,
                              bestseller: productForm.bestseller,
                              occasions: productForm.occasions || ['Daily Pooja']
                            });
                            setIsAddingProduct(false);
                          }
                        }}
                        className="px-6 py-2 bg-[#54202B] text-white text-xs uppercase tracking-wider font-semibold rounded-xs shadow-sm hover:bg-[#3E161F]"
                      >
                        Save Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: INVENTORY ADJUSTMENTS & AUDIT TRAIL               */}
        {/* ======================================================== */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
              <h3 className="font-serif text-xl text-[#25221F] font-semibold">
                Live Inventory Levels & Stock Adjustments
              </h3>
              <p className="text-xs text-[#25221F]/60">
                Update batch quantities with mandatory audit logging to prevent overselling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {products.map(p => (
                  <div
                    key={p.id}
                    className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/8 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-[#B08D57] font-semibold uppercase">
                        <span>{p.sku}</span>
                        <span>{p.category.replace('-', ' ')}</span>
                      </div>
                      <h4 className="font-serif text-base text-[#25221F] font-medium leading-snug mt-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#25221F]/60">{p.variant}</p>
                    </div>

                    <div className="pt-2 border-t border-[#25221F]/8 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-[#25221F]/60 uppercase block">Available</span>
                        <span
                          className={`text-lg font-bold tabular-nums ${
                            p.stockQuantity <= 15 ? 'text-red-700' : 'text-[#25221F]'
                          }`}
                        >
                          {p.stockQuantity} units
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setStockAdjustProduct(p);
                          setNewStockQty(p.stockQuantity);
                        }}
                        className="px-3 py-1.5 bg-[#54202B] text-white text-[10px] uppercase font-bold tracking-wider rounded-xs hover:bg-[#3E161F]"
                      >
                        Adjust
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Movement History Table */}
            <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
              <h4 className="font-serif text-lg text-[#25221F] font-semibold pb-2 border-b border-[#25221F]/10">
                Stock Movement Audit Trail ({stockMovements.length})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#25221F]/10 text-[10px] uppercase text-[#25221F]/60">
                      <th className="py-2">Timestamp</th>
                      <th className="py-2">Product & SKU</th>
                      <th className="py-2">Change</th>
                      <th className="py-2">New Balance</th>
                      <th className="py-2">Reason / Order</th>
                      <th className="py-2">Recorded By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#25221F]/5">
                    {stockMovements.map(m => (
                      <tr key={m.id} className="hover:bg-[#FAF7F0]">
                        <td className="py-2.5 text-[11px] text-[#25221F]/60 tabular-nums">
                          {new Date(m.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2.5 font-medium text-[#25221F]">
                          {m.productName} <span className="font-mono text-[10px] text-[#25221F]/50">({m.sku})</span>
                        </td>
                        <td className="py-2.5 font-bold tabular-nums">
                          <span className={m.change > 0 ? 'text-emerald-700' : 'text-red-700'}>
                            {m.change > 0 ? `+${m.change}` : m.change}
                          </span>
                        </td>
                        <td className="py-2.5 font-bold tabular-nums">{m.newStock}</td>
                        <td className="py-2.5 text-[#25221F]/80">{m.reason}</td>
                        <td className="py-2.5 text-[#25221F]/60">{m.actor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stock Adjustment Modal */}
            {stockAdjustProduct && (
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="fixed inset-0 bg-[#25221F]/70" onClick={() => setStockAdjustProduct(null)} />
                <div className="relative min-h-screen flex items-center justify-center p-4">
                  <div className="relative w-full max-w-md bg-[#F8F4EC] p-6 rounded-sm border border-[#B08D57]/40 space-y-4 shadow-xl">
                    <h3 className="font-serif text-xl text-[#25221F]">
                      Adjust Stock: {stockAdjustProduct.name}
                    </h3>
                    <p className="text-xs text-[#25221F]/70 font-light">
                      Current balance: <strong>{stockAdjustProduct.stockQuantity} units</strong>
                    </p>

                    <div>
                      <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                        New Stock Level (Units)
                      </label>
                      <input
                        type="number"
                        value={newStockQty}
                        onChange={e => setNewStockQty(Number(e.target.value))}
                        className="w-full p-2.5 bg-white border border-[#25221F]/15 rounded-xs text-sm font-semibold tabular-nums"
                      />
                    </div>

                    <div>
                      <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                        Reason for Inventory Adjustment *
                      </label>
                      <select
                        value={stockReason}
                        onChange={e => setStockReason(e.target.value)}
                        className="w-full p-2 bg-white border border-[#25221F]/15 rounded-xs text-xs"
                      >
                        <option value="Received fresh handcrafted batch from guild">Received fresh handcrafted batch from guild</option>
                        <option value="Physical audit inventory correction">Physical audit inventory correction</option>
                        <option value="Packaging transit damage write-off">Packaging transit damage write-off</option>
                        <option value="Reserved for VIP temple gifting">Reserved for VIP temple gifting</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-[#25221F]/10">
                      <button
                        onClick={() => setStockAdjustProduct(null)}
                        className="px-4 py-2 text-xs text-[#25221F]/70"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          updateStock(stockAdjustProduct.id, newStockQty, stockReason);
                          setStockAdjustProduct(null);
                        }}
                        className="px-5 py-2 bg-[#54202B] text-white text-xs uppercase font-semibold rounded-xs hover:bg-[#3E161F]"
                      >
                        Confirm Adjustment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CUSTOMERS DIRECTORY                               */}
        {/* ======================================================== */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
              <h3 className="font-serif text-xl text-[#25221F] font-semibold">
                Customer Profiles & Purchase History ({customersList.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#25221F]/10 text-[10px] uppercase text-[#25221F]/60">
                      <th className="py-2.5">Devotee Name</th>
                      <th className="py-2.5">Email</th>
                      <th className="py-2.5">Mobile</th>
                      <th className="py-2.5">City & State</th>
                      <th className="py-2.5">Total Orders</th>
                      <th className="py-2.5 text-right">Lifetime Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#25221F]/5">
                    {customersList.map((c, i) => (
                      <tr key={i} className="hover:bg-[#FAF7F0]">
                        <td className="py-3 font-semibold text-[#25221F]">
                          {c.customer.fullName}
                        </td>
                        <td className="py-3 text-[#25221F]/70">{c.customer.email}</td>
                        <td className="py-3 text-[#25221F]/70">{c.customer.mobile}</td>
                        <td className="py-3 text-[#25221F]/70">
                          {c.customer.city}, {c.customer.state}
                        </td>
                        <td className="py-3 tabular-nums font-semibold">
                          {c.ordersCount} order{c.ordersCount > 1 ? 's' : ''}
                        </td>
                        <td className="py-3 text-right font-bold text-[#54202B] tabular-nums">
                          ₹{c.totalSpent.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: DISCOUNTS & COUPONS CONFIGURATION                 */}
        {/* ======================================================== */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Active Coupons (7 cols) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
                <h3 className="font-serif text-xl text-[#25221F] font-semibold pb-2 border-b border-[#25221F]/10">
                  Configured Promotional Coupons ({coupons.length})
                </h3>

                <div className="space-y-3">
                  {coupons.map(c => (
                    <div
                      key={c.code}
                      className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/8 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#54202B] text-base">
                            {c.code}
                          </span>
                          <span className="text-[10px] uppercase font-semibold text-[#B08D57] bg-white px-2 py-0.5 border border-[#B08D57]/30">
                            {c.discountType === 'percentage' ? `${c.value}% Off` : `₹${c.value} Flat Off`}
                          </span>
                        </div>
                        <p className="text-xs text-[#25221F]/60 mt-1">
                          Min cart: ₹{c.minCartValue} · Used {c.usageCount} time{c.usageCount === 1 ? '' : 's'} · Expires {c.expiresAt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCouponActive(c.code)}
                          className={`px-3 py-1 text-xs uppercase font-semibold rounded-xs border ${
                            c.active
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-gray-100 text-gray-600 border-gray-300'
                          }`}
                        >
                          {c.active ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => deleteCoupon(c.code)}
                          className="p-1.5 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Coupon Form (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
                <h3 className="font-serif text-xl text-[#25221F] font-semibold pb-2 border-b border-[#25221F]/10">
                  Create New Coupon
                </h3>

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    if (!newCoupon.code) return;
                    addCoupon({
                      code: newCoupon.code.toUpperCase().trim(),
                      discountType: newCoupon.discountType as any,
                      value: Number(newCoupon.value) || 10,
                      minCartValue: Number(newCoupon.minCartValue) || 500,
                      maxDiscount: Number(newCoupon.maxDiscount) || undefined,
                      active: true,
                      expiresAt: newCoupon.expiresAt || '2026-12-31',
                      usageCount: 0,
                      maxUsage: Number(newCoupon.maxUsage) || 100
                    });
                    setNewCoupon({
                      code: '',
                      discountType: 'percentage',
                      value: 10,
                      minCartValue: 500,
                      expiresAt: '2026-12-31'
                    });
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                      Coupon Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DIWALI20"
                      value={newCoupon.code}
                      onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                      className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs uppercase font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                        Discount Type
                      </label>
                      <select
                        value={newCoupon.discountType}
                        onChange={e => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                        className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed INR (₹)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                        Discount Value *
                      </label>
                      <input
                        type="number"
                        required
                        value={newCoupon.value}
                        onChange={e => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                        className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                        Min Cart Value (₹)
                      </label>
                      <input
                        type="number"
                        value={newCoupon.minCartValue}
                        onChange={e => setNewCoupon({ ...newCoupon, minCartValue: Number(e.target.value) })}
                        className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs tabular-nums"
                      />
                    </div>

                    <div>
                      <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        value={newCoupon.expiresAt}
                        onChange={e => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                        className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#54202B] text-white uppercase tracking-wider font-semibold rounded-xs hover:bg-[#3E161F] transition-colors mt-2"
                  >
                    Activate Coupon
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: WEBSITE CONTENT MANAGEMENT (CMS)                  */}
        {/* ======================================================== */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* Announcement Bar CMS */}
            <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#25221F]/10">
                <h3 className="font-serif text-lg text-[#25221F] font-semibold">
                  Announcement Bar Configuration
                </h3>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcement.enabled}
                    onChange={e => updateAnnouncement({ enabled: e.target.checked })}
                    className="rounded text-[#54202B]"
                  />
                  <span>Show Announcement Bar</span>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                    Announcement Message
                  </label>
                  <input
                    type="text"
                    value={announcement.text}
                    onChange={e => updateAnnouncement({ text: e.target.value })}
                    className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                      Link Text (Optional)
                    </label>
                    <input
                      type="text"
                      value={announcement.linkText || ''}
                      onChange={e => updateAnnouncement({ linkText: e.target.value })}
                      className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                      Link URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={announcement.linkUrl || ''}
                      onChange={e => updateAnnouncement({ linkUrl: e.target.value })}
                      className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Copy CMS */}
            <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
              <h3 className="font-serif text-lg text-[#25221F] font-semibold pb-2 border-b border-[#25221F]/10">
                Homepage Hero Section Copy
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                    Uppercase Eyebrow
                  </label>
                  <input
                    type="text"
                    value={hero.eyebrow}
                    onChange={e => updateHero({ eyebrow: e.target.value })}
                    className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                    Large Main Headline
                  </label>
                  <input
                    type="text"
                    value={hero.headline}
                    onChange={e => updateHero({ headline: e.target.value })}
                    className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs font-serif text-base"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                    Supporting Copy
                  </label>
                  <textarea
                    rows={3}
                    value={hero.supportingCopy}
                    onChange={e => updateHero({ supportingCopy: e.target.value })}
                    className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                  />
                </div>
              </div>
            </div>

            {/* Promotional Banner CMS */}
            <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#25221F]/10">
                <h3 className="font-serif text-lg text-[#25221F] font-semibold">
                  Promotional Banner
                </h3>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider cursor-pointer">
                  <input
                    type="checkbox"
                    checked={promoBanner.enabled}
                    onChange={e => updatePromoBanner({ enabled: e.target.checked })}
                    className="rounded text-[#54202B]"
                  />
                  <span>Show Promotional Banner</span>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={promoBanner.title}
                    onChange={e => updatePromoBanner({ title: e.target.value })}
                    className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                    Banner Subtitle
                  </label>
                  <input
                    type="text"
                    value={promoBanner.subtitle}
                    onChange={e => updatePromoBanner({ subtitle: e.target.value })}
                    className="w-full p-2 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: CUSTOMER REVIEWS MODERATION                       */}
        {/* ======================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
              <h3 className="font-serif text-xl text-[#25221F] font-semibold">
                Customer Reflections Moderation Queue ({reviews.length})
              </h3>
              <p className="text-xs text-[#25221F]/60">
                Ensure all published feedback comes from authentic devotee purchasers and contains no defamatory remarks.
              </p>

              <div className="space-y-3">
                {reviews.map(rev => (
                  <div
                    key={rev.id}
                    className="p-4 bg-[#FAF7F0] rounded-xs border border-[#25221F]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-[#B08D57]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rev.rating ? 'fill-[#B08D57] text-[#B08D57]' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-[#25221F]">{rev.reviewerName}</span>
                        <span className="text-[#25221F]/40">· {rev.date}</span>
                        <span
                          className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-xs ${
                            rev.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : rev.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {rev.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-[#25221F]">
                        “{rev.title}”
                      </h4>
                      <p className="text-[#25221F]/70 font-light">{rev.comment}</p>
                      <p className="text-[10px] text-[#B08D57]">Target Product: {rev.productName}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => moderateReview(rev.id, 'approved')}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase font-semibold rounded-xs flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}
                      {rev.status !== 'rejected' && (
                        <button
                          onClick={() => moderateReview(rev.id, 'rejected')}
                          className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs uppercase font-semibold rounded-xs flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: STORE SETTINGS, SHIPPING & TAXES                  */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#25221F]/10 shadow-xs space-y-6">
            <h3 className="font-serif text-xl text-[#25221F] font-semibold pb-2 border-b border-[#25221F]/10">
              Store Shipping, Taxes & Business Contacts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                  Complimentary Shipping Threshold (₹)
                </label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={e => updateSettings({ freeShippingThreshold: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs tabular-nums"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                  Standard Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  value={settings.standardShippingFee}
                  onChange={e => updateSettings({ standardShippingFee: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs tabular-nums"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                  Applicable GST Percentage (%)
                </label>
                <input
                  type="number"
                  value={settings.taxPercentage}
                  onChange={e => updateSettings({ taxPercentage: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs tabular-nums"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                  Cash on Delivery (COD) Availability
                </label>
                <select
                  value={settings.codEnabled ? 'yes' : 'no'}
                  onChange={e => updateSettings({ codEnabled: e.target.value === 'yes' })}
                  className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                >
                  <option value="yes">Enabled (Customers can pay upon delivery)</option>
                  <option value="no">Disabled (Prepaid online payments only)</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={e => updateSettings({ supportEmail: e.target.value })}
                  className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                  Support Phone / Hotline
                </label>
                <input
                  type="text"
                  value={settings.supportPhone}
                  onChange={e => updateSettings({ supportPhone: e.target.value })}
                  className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block uppercase text-[10px] font-bold text-[#25221F]/70 mb-1">
                  Registered Business Address
                </label>
                <input
                  type="text"
                  value={settings.businessAddress}
                  onChange={e => updateSettings({ businessAddress: e.target.value })}
                  className="w-full p-2.5 bg-[#F8F4EC] border border-[#25221F]/15 rounded-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 10: AUDIT LOG & SECURITY ACTIVITY                    */}
        {/* ======================================================== */}
        {activeTab === 'audit' && (
          <div className="bg-white p-6 rounded-sm border border-[#25221F]/10 shadow-xs space-y-4">
            <h3 className="font-serif text-xl text-[#25221F] font-semibold pb-2 border-b border-[#25221F]/10">
              System & Administrative Audit Trail ({auditLogs.length})
            </h3>
            <p className="text-xs text-[#25221F]/60">
              Immutable chronological record of administrative actions, stock movements, and owner authentications.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#25221F]/10 text-[10px] uppercase text-[#25221F]/60">
                    <th className="py-2.5">Timestamp</th>
                    <th className="py-2.5">Actor</th>
                    <th className="py-2.5">Action</th>
                    <th className="py-2.5">Entity</th>
                    <th className="py-2.5">Audit Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#25221F]/5 font-mono text-[11px]">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-[#FAF7F0]">
                      <td className="py-2.5 text-[#25221F]/60 tabular-nums">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2.5 font-bold text-[#54202B]">{log.actor}</td>
                      <td className="py-2.5 font-sans font-medium text-[#25221F]">{log.action}</td>
                      <td className="py-2.5 uppercase text-[10px] text-[#B08D57]">{log.entityType}</td>
                      <td className="py-2.5 font-sans text-[#25221F]/80">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
