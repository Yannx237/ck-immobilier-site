import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { PropertyDetails } from './pages/PropertyDetails';
import { Contact } from './pages/Contact';
import { Team } from './pages/Team';
import { LegalNotice } from './pages/LegalNotice';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { EthicsCharter } from './pages/EthicsCharter';

// Helper component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#121414] text-[#e2e2e2] flex flex-col font-['Manrope',sans-serif] selection:bg-[#d4af37] selection:text-[#121414]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalog />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/confidentialite" element={<PrivacyPolicy />} />
            <Route path="/charte-ethique" element={<EthicsCharter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
