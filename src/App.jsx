import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

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

function App() {
  return (
    <Router>
      <div className="App" style={{ fontFamily: 'sans-serif' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works/qlink" element={<HowQlinkWorks />} />
          <Route path="/how-it-works/emergency" element={<EmergencyScenario />} />
          <Route path="/shop/bracelet" element={<TheBracelet />} />
          <Route path="/shop/compare" element={<Compare />} />
          <Route path="/shop/reviews" element={<Reviews />} />
          <Route path="/for-caregivers" element={<ForCaregivers />} />
          <Route path="/about/our-story" element={<OurStory />} />
          <Route path="/about/privacy" element={<PrivacySecurity />} />
          <Route path="/support/help-center" element={<HelpCenter />} />
          <Route path="/support/faqs" element={<Faqs />} />
          <Route path="/support/contact" element={<Contact />} />
          <Route path="/support/download" element={<AppDownload />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
