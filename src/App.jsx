import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ArrowUp from './components/layout/ArrowUp';
import AIAssistantBtn from './components/layout/AIAssistantBtn';
import './App.css'; // Global font settings
import Preloader from './components/common/Preloader';
import ScrollToTop from './components/layout/ScrollToTop';
import DynamicBackground from './components/common/DynamicBackground';
import LoginModal from './components/common/LoginModal';

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
import NovaDetails from './pages/Shop/NovaDetails';
import PulseDetails from './pages/Shop/PulseDetails';
import ReviewDetail from './pages/Shop/ReviewDetail';

// Auth Pages
import AuthPage from './pages/Auth/AuthPage';

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <Router>
      <div className="App">
        {/* Global auth modal — renders on top of every screen */}
        <LoginModal />
        {/* <DynamicBackground /> */}
        {loading && <Preloader onFinish={() => setLoading(false)} />}

        {/* We hide the Navbar on the auth page for a true full screen experience */}
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={
            <>
              <Navbar />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works/qlink" element={<HowQlinkWorks />} />
                <Route path="/how-it-works/emergency" element={<EmergencyScenario />} />
                <Route path="/shop/bracelet" element={<TheBracelet />} />
                {/* <Route path="/shop/:productId" element={<NovaDetails />} /> */}
                <Route path="/shop/:productId" element={<TheBracelet />} />
                <Route path="/shop/compare" element={<Compare />} />
                <Route path="/shop/reviews" element={<Reviews />} />
                <Route path="/shop/reviews/:id" element={<ReviewDetail />} />
                <Route path="/for-caregivers" element={<ForCaregivers />} />
                <Route path="/about/our-story" element={<OurStory />} />
                <Route path="/about/privacy" element={<PrivacySecurity />} />
                <Route path="/support/help-center" element={<HelpCenter />} />
                <Route path="/support/faqs" element={<Faqs />} />
                <Route path="/support/contact" element={<Contact />} />
                <Route path="/support/download" element={<AppDownload />} />
              </Routes>
              <AIAssistantBtn />
              <ArrowUp />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>

  );
}


export default App;
