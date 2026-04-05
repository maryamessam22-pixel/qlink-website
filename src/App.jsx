import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

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

// Protected Route
const ProtectedRoute = () => {
  const { isAuthenticated, setPendingRoute, setShowLoginModal } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    if (!isAuthenticated) {
      setPendingRoute(location.pathname);
      setShowLoginModal(true);
    }
  }, [isAuthenticated, location, setPendingRoute, setShowLoginModal]);

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

  return (
    <Router>
      <div className="App">
        {loading && <Preloader onFinish={() => setLoading(false)} />}

        <Routes>

          <Route path="/auth" element={<AuthPage />} />

          {/* Public Home */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/complete-purchase" element={<CompletePurchase />} />
            
            <Route element={<ProtectedRoute />}>
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

        </Routes>
      </div>
    </Router>
  );
}

export default App;