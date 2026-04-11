import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ArrowUp from './components/layout/ArrowUp';
import AIAssistantBtn from './components/layout/AIAssistantBtn';
import './App.css';
import Preloader from './components/common/Preloader';
import ScrollToTop from './components/layout/ScrollToTop';
import LoginModal from './components/common/LoginModal';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import HowQlinkWorks from './pages/HowItWorks/HowQlinkWorks';
import EmergencyScenario from './pages/HowItWorks/EmergencyScenario';
import TheBracelet from './pages/Shop/TheBracelet';
import Compare from './pages/Shop/Compare';
import Reviews from './pages/Shop/Reviews';
import ForCaregivers from './pages/ForCaregivers';
import OurStory from './pages/About/OurStory';
import PrivacySecurity from './pages/About/PrivacySecurity';
import HelpCenter from './pages/Support/HelpCenter';
import Faqs from './pages/Support/Faqs';
import Contact from './pages/Support/Contact';
import AppDownload from './pages/Support/AppDownload';
import ReviewDetail from './pages/Shop/ReviewDetail';
import PrivacydataNova from './pages/Shop/PrivacydataNova';
import PrivacydataPulse from './pages/Shop/PrivacydataPulse';
import InTheBoxNova from './pages/Shop/InTheBoxNova';
import InTheBoxPulse from './pages/Shop/InTheBoxPulse';
import CartScreen from './pages/CartScreen';
import Checkout from './pages/Checkout';
import CompletePurchase from './pages/CompletePurchase';

// Auth
import AuthPage from './pages/Auth/AuthPage';

// Protected routes: redirect to home if not logged in (no modal here — avoids popup on refresh).
// In-app navigation to these routes uses openModalWithRoute / guarded links so the login modal still appears when the user chooses a page.
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const MainLayout = () => (
  <>
    <Navbar />
    <ScrollToTop />
    <Outlet />
    <LoginModal />
    <AIAssistantBtn />
    <ArrowUp />
    <Footer />
  </>
);

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const setLazyLoading = (img) => {
      if (img && img.tagName === 'IMG' && !img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    };

    const processImgs = (root = document) => {
      root.querySelectorAll && root.querySelectorAll('img:not([loading])').forEach(setLazyLoading);
    };

    processImgs(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          processImgs(node);
          if (node.tagName === 'IMG') setLazyLoading(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <div className="App">
        {loading && <Preloader onFinish={() => setLoading(false)} />}

        <Routes>

          <Route path="/auth" element={<AuthPage />} />

          {/* Public Home */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/complete-purchase" element={<CompletePurchase />} />
              <Route path="/how-it-works/qlink" element={<HowQlinkWorks />} />
              <Route path="/how-it-works/emergency" element={<EmergencyScenario />} />
              <Route path="/shop/bracelet" element={<TheBracelet />} />
              <Route path="/shop/:productId" element={<TheBracelet />} />
              <Route path="/shop/compare" element={<Compare />} />
              <Route path="/shop/reviews" element={<Reviews />} />
              <Route path="/shop/reviews/:id" element={<ReviewDetail />} />
              <Route path="/shop/nova/privacy" element={<PrivacydataNova />} />
              <Route path="/shop/pulse/privacy" element={<PrivacydataPulse />} />
              <Route path="/shop/nova/inbox" element={<InTheBoxNova />} />
              <Route path="/shop/pulse/inbox" element={<InTheBoxPulse />} />
              <Route path="/for-caregivers" element={<ForCaregivers />} />
              <Route path="/about/our-story" element={<OurStory />} />
              <Route path="/about/privacy" element={<PrivacySecurity />} />
              <Route path="/support/help-center" element={<HelpCenter />} />
              <Route path="/support/faqs" element={<Faqs />} />
              <Route path="/support/contact" element={<Contact />} />
              <Route path="/support/download" element={<AppDownload />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;