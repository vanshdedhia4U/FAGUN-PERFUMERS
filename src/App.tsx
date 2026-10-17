import React, { useState, useEffect } from 'react';
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

export function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    return new URLSearchParams(window.location.search);
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (pathWithQuery: string) => {
    const [path, query] = pathWithQuery.split('?');
    window.history.pushState({}, '', pathWithQuery);
    setCurrentRoute(path || '/');
    setSearchParams(new URLSearchParams(query || ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching
  const isAdmin = currentRoute.startsWith('/admin');

  // Match /products/:slug
  const productMatch = currentRoute.match(/^\/products\/([^/]+)/);
  const productSlug = productMatch ? productMatch[1] : null;

  // Match /collections/:slug
  const collectionMatch = currentRoute.match(/^\/collections\/([^/]+)/);
  const collectionSlug = collectionMatch ? collectionMatch[1] : null;

  // Match /journal/:slug
  const journalMatch = currentRoute.match(/^\/journal\/([^/]+)/);
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
