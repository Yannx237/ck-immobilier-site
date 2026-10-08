import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { MobileContactBar } from './components/layout/MobileContactBar';
import { Agency } from './pages/Agency';
import { Catalog } from './pages/Catalog';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { LegalPage } from './pages/LegalPage';
import { NotFound } from './pages/NotFound';
import { PropertyDetails } from './pages/PropertyDetails';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Shell = () => {
  const { t } = useTranslation();
  // La fiche bien affiche sa propre barre de contact, avec le prix et un message pré-rempli.
  const onPropertyPage = useMatch('/property/:id');

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-soft"
      >
        {t('common.skipToContent')}
      </a>
      <Header />
      <main id="contenu" className="flex-1 max-md:pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/equipe" element={<Agency />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalPage page="notice" />} />
          <Route path="/confidentialite" element={<LegalPage page="privacy" />} />
          <Route path="/charte-ethique" element={<LegalPage page="ethics" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {!onPropertyPage && <MobileContactBar />}
    </div>
  );
};

export const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Shell />
    <Analytics />
  </BrowserRouter>
);

export default App;
