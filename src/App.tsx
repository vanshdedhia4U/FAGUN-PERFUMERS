import React, { useState, useEffect, useCallback } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { JournalPage } from './pages/JournalPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { PolicyPages } from './pages/PolicyPages';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const KNOWN_ROUTES = [
  '/shop',
  '/products',
  '/collections',
  '/checkout',
  '/order-confirmation',
  '/track-order',
  '/our-story',
  '/journal',
  '/wishlist',
  '/account',
  '/contact',
  '/faq',
  '/shipping-policy',
  '/returns-policy',
  '/privacy-policy',
  '/terms',
  '/admin'
];

/**
 * Extracts normalized route & search params regardless of whether the app is hosted
 * on root (e.g. localhost, Cloud Run) or a subfolder on GitHub Pages (e.g. username.github.io/repo-name/)
 */
function parseLocation(): { path: string; search: URLSearchParams } {
  // 1. Check if hash routing is present (e.g. #/shop or #/products/sandalwood)
  if (window.location.hash) {
    const raw = window.location.hash.replace(/^#\/?/, '/');
    const [hPath, hQuery] = raw.split('?');
    return {
      path: hPath.startsWith('/') ? hPath : '/' + hPath,
      search: new URLSearchParams(hQuery || '')
    };
  }

  // 2. Otherwise inspect pathname
  let pathname = window.location.pathname || '/';

  // If path directly starts with one of our known route prefixes, use it directly
  if (pathname === '/' || KNOWN_ROUTES.some(prefix => pathname.startsWith(prefix))) {
    return {
      path: pathname,
      search: new URLSearchParams(window.location.search)
    };
  }

  // If deployed under a GitHub Pages repository subpath like /<repo-name>/...
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length >= 1) {
    // If the first segment is not a known route, it is the repo name
    if (!KNOWN_ROUTES.some(prefix => ('/' + segments[0]).startsWith(prefix))) {
      const remainingPath = '/' + segments.slice(1).join('/');
      return {
        path: remainingPath === '' ? '/' : remainingPath,
        search: new URLSearchParams(window.location.search)
      };
    }
  }

  return {
    path: pathname,
    search: new URLSearchParams(window.location.search)
  };
}

export function AppContent() {
  const [routeState, setRouteState] = useState(parseLocation);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const currentRoute = routeState.path;
  const searchParams = routeState.search;

  useEffect(() => {
    const handleLocationChange = () => {
      setRouteState(parseLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = useCallback((pathWithQuery: string) => {
    const clean = pathWithQuery.startsWith('/') ? pathWithQuery : '/' + pathWithQuery;

    // Detect if we are on a GitHub Pages subpath (e.g. /<repo-name>/)
    const isSubfolder =
      window.location.pathname.length > 1 &&
      !KNOWN_ROUTES.some(prefix => window.location.pathname.startsWith(prefix));

    if (window.location.hash || isSubfolder) {
      // Use hash navigation on GitHub Pages so static server never returns 404 on refresh
      window.location.hash = clean;
    } else {
      window.history.pushState({}, '', clean);
      setRouteState(parseLocation());
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Route matching
  const isAdmin = currentRoute.startsWith('/admin');

  // Match /products/:slug
  const productMatch = currentRoute.match(/^\/products\/([^/?]+)/);
  const productSlug = productMatch ? productMatch[1] : null;

  // Match /collections/:slug
  const collectionMatch = currentRoute.match(/^\/collections\/([^/?]+)/);
  const collectionSlug = collectionMatch ? collectionMatch[1] : null;

  // Match /journal/:slug
  const journalMatch = currentRoute.match(/^\/journal\/([^/?]+)/);
  const journalSlug = journalMatch ? journalMatch[1] : null;

  const renderCurrentPage = () => {
    if (isAdmin) {
      return <AdminDashboard onNavigate={navigate} />;
    }

    if (productSlug) {
      return <ProductDetailPage slug={productSlug} onNavigate={navigate} />;
    }

    if (collectionSlug) {
      return (
        <ShopPage
          initialCategory={collectionSlug}
          onNavigate={navigate}
        />
      );
    }

    if (journalSlug) {
      return <JournalPage initialSlug={journalSlug} onNavigate={navigate} />;
    }

    if (currentRoute === '/shop') {
      const filter = searchParams.get('filter') || undefined;
      const occasion = searchParams.get('occasion') || undefined;
      return (
        <ShopPage
          initialFilter={filter}
          initialOccasion={occasion}
          onNavigate={navigate}
        />
      );
    }

    if (currentRoute === '/checkout') {
      return <CheckoutPage onNavigate={navigate} />;
    }

    if (currentRoute === '/order-confirmation') {
      const orderNumber = searchParams.get('orderNumber') || '';
      return (
        <OrderConfirmationPage
          orderNumber={orderNumber}
          onNavigate={navigate}
        />
      );
    }

    if (currentRoute === '/track-order') {
      const orderNumber = searchParams.get('orderNumber') || undefined;
      return <TrackOrderPage initialOrderNumber={orderNumber} onNavigate={navigate} />;
    }

    if (currentRoute === '/our-story') {
      return <OurStoryPage onNavigate={navigate} />;
    }

    if (currentRoute === '/journal') {
      return <JournalPage onNavigate={navigate} />;
    }

    if (currentRoute === '/wishlist') {
      return <WishlistPage onNavigate={navigate} />;
    }

    if (currentRoute === '/account') {
      return <AccountPage onNavigate={navigate} />;
    }

    if (currentRoute === '/contact') {
      return <PolicyPages pageType="contact" onNavigate={navigate} />;
    }

    if (currentRoute === '/faq') {
      return <PolicyPages pageType="faq" onNavigate={navigate} />;
    }

    if (currentRoute === '/shipping-policy') {
      return <PolicyPages pageType="shipping" onNavigate={navigate} />;
    }

    if (currentRoute === '/returns-policy') {
      return <PolicyPages pageType="returns" onNavigate={navigate} />;
    }

    if (currentRoute === '/privacy-policy') {
      return <PolicyPages pageType="privacy" onNavigate={navigate} />;
    }

    if (currentRoute === '/terms') {
      return <PolicyPages pageType="terms" onNavigate={navigate} />;
    }

    // Default to Home
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#25221F]">
      {!isAdmin && (
        <Navbar
          currentRoute={currentRoute}
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      <div className="flex-1">
        {renderCurrentPage()}
      </div>

      {!isAdmin && (
        <Footer onNavigate={navigate} />
      )}

      {/* Global Modals & Drawers */}
      <CartDrawer onNavigate={navigate} />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
