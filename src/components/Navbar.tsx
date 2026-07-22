import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Globe, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoImg from '../assets/bonlogo.png';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = i18n.language.substring(0, 2).toLowerCase();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.portfolio'), path: '/catalogue' },
    { label: t('nav.team'), path: '/equipe' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#121414]/90 backdrop-blur-md border-b border-[#99907c]/25 shadow-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo (logo already includes CK) */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
            <div className="relative h-12 sm:h-14 w-auto flex items-center">
              <img
                src={logoImg}
                alt="Logo Immobilier"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(242,202,80,0.4)] group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-['Playfair_Display'] font-bold text-lg sm:text-xl tracking-wider text-[#e2e2e2] group-hover:text-[#f2ca50] transition-colors leading-none">
                IMMOBILIER
              </span>
              <span className="font-['Hanken_Grotesk'] text-[8px] sm:text-[9px] tracking-[0.25em] text-[#d0c5af] font-bold mt-1">
                {t('nav.prestigePatrimony')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-['Hanken_Grotesk'] text-xs tracking-[0.15em] font-bold transition-all duration-300 py-1 ${
                    isActive
                      ? 'text-[#f2ca50] border-b-2 border-[#f2ca50]'
                      : 'text-[#d0c5af] hover:text-[#f2ca50] hover:drop-shadow-[0_0_8px_rgba(242,202,80,0.5)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Language Selector & CTA & Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Language Selector */}
            <div className="flex items-center bg-[#1a1c1c] border border-[#4d4635]/50 rounded px-2 py-1 text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] gap-1">
              <Globe className="w-3.5 h-3.5 text-[#f2ca50]" />
              <button
                onClick={() => changeLanguage('fr')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currentLang === 'fr' ? 'bg-[#f2ca50] text-[#121414]' : 'hover:text-[#f2ca50]'
                }`}
              >
                FR
              </button>
              <span className="text-[#4d4635]">|</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currentLang === 'en' ? 'bg-[#f2ca50] text-[#121414]' : 'hover:text-[#f2ca50]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Desktop Espace Client CTA */}
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#121414] bg-[#f2ca50] hover:bg-[#ffe088] px-4 py-2.5 rounded transition-all duration-300 shadow-[0_0_15px_rgba(242,202,80,0.35)]"
            >
              <User className="w-4 h-4" />
              <span>{t('nav.clientPortal')}</span>
            </Link>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e2e2e2] hover:text-[#f2ca50] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#f2ca50]" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#121414]/95 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col justify-between border-b border-[#4d4635]">
          <div className="space-y-6">
            <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-[0.25em] block border-b border-[#4d4635]/40 pb-2">
              NAVIGATION PRESTIGE
            </span>
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-['Playfair_Display'] text-2xl font-bold transition-colors ${
                      isActive ? 'text-[#f2ca50]' : 'text-[#e2e2e2] hover:text-[#f2ca50]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#4d4635]/40">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#121414] bg-[#f2ca50] py-3.5 rounded shadow-[0_0_15px_rgba(242,202,80,0.35)]"
            >
              <User className="w-4 h-4" />
              <span>{t('nav.clientPortal')}</span>
            </Link>
            <p className="text-center font-['Manrope'] text-xs text-[#99907c]">
              Douala (Bonapriso) • Yaoundé (Carrefour Golf)
            </p>
          </div>
        </div>
      )}
    </>
  );
};
