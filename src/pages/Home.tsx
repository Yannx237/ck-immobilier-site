import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { BentoGrid } from '../components/BentoGrid';
import { PropertyCard } from '../components/PropertyCard';
import { sampleProperties } from '../data/properties';
import { ShieldCheck, Eye, Key, ChevronRight, PhoneCall, ArrowUpRight, Sparkles, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';
import heroBuildingImg from '../assets/hero_ck.jpg';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  useScrollReveal();

  const servicesList = [
    {
      num: t('services.service1_num'),
      title: t('services.service1_title'),
      subtitle: t('services.service1_sub'),
      description: t('services.service1_desc'),
      icon: Eye,
      tag: t('services.service1_tag'),
    },
    {
      num: t('services.service2_num'),
      title: t('services.service2_title'),
      subtitle: t('services.service2_sub'),
      description: t('services.service2_desc'),
      icon: Award,
      tag: t('services.service2_tag'),
    },
    {
      num: t('services.service3_num'),
      title: t('services.service3_title'),
      subtitle: t('services.service3_sub'),
      description: t('services.service3_desc'),
      icon: Key,
      tag: t('services.service3_tag'),
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section with Official Generated Building Image */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBuildingImg}
            alt="Immeuble CK Immobilier Prestige"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-[#121414]/75 backdrop-brightness-75 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/50 to-[#121414]/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 mt-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-[#1e2020]/90 border border-[#f2ca50]/40 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(242,202,80,0.2)]">
            <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
            <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl lg:text-7xl font-bold text-[#e2e2e2] leading-tight drop-shadow-2xl">
            {t('hero.title1')}<br />
            <span className="gold-gradient-text">{t('hero.title2')}</span>
          </h1>

          <p className="font-['Manrope'] text-lg sm:text-xl text-[#d0c5af] max-w-2xl font-light">
            {t('hero.sub')}
          </p>

          {/* SearchBar Component */}
          <div className="w-full mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Section Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#4d4635]/30 pb-6 gap-4">
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#e2e2e2] mb-2">
              {t('hero.ourPatrimony')} <span className="text-[#f2ca50] italic font-light">{t('hero.exclusivePatrimony')}</span>
            </h2>
            <p className="font-['Manrope'] text-base text-[#d0c5af] max-w-xl">
              {t('hero.selectionDesc')}
            </p>
          </div>

          <Link
            to="/catalogue"
            className="font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#f2ca50] hover:text-[#ffe088] transition-colors flex items-center gap-2 pb-1"
          >
            <span>{t('hero.seeAllProperties')}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <BentoGrid />
      </section>

      {/* High-Agency Luxury Services Showcase Section */}
      <section className="relative bg-[#0e1010] border-y border-[#4d4635]/40 py-24 overflow-hidden">
        {/* Subtle background glow accent */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Editorial Header Column */}
            <div className="reveal-on-scroll lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#1e2020] border border-[#f2ca50]/40 px-3.5 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span className="font-['Hanken_Grotesk'] text-[10px] font-bold tracking-[0.25em] text-[#f2ca50]">
                    {t('services.badge')}
                  </span>
                </div>

                <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e2e2e2] leading-tight">
                  {t('services.title1')} <span className="gold-gradient-text">{t('services.title2')}</span>
                </h2>

                <p className="font-['Manrope'] text-sm sm:text-base text-[#d0c5af] leading-relaxed font-light">
                  {t('services.desc')}
                </p>
              </div>

              {/* Stats Highlight Box */}
              <div className="p-6 rounded-xl bg-[#161818] border border-[#4d4635]/50 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-['Playfair_Display'] text-4xl font-bold text-[#f2ca50]">100%</span>
                  <span className="font-['Hanken_Grotesk'] text-xs text-[#e2e2e2] font-bold tracking-wider">
                    {t('services.stat')}
                  </span>
                </div>
                <p className="font-['Manrope'] text-xs text-[#99907c]">
                  {t('services.statDesc')}
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#f2ca50] hover:text-[#ffe088] transition-colors border-b border-[#f2ca50]/50 pb-1"
              >
                <span>{t('services.ctaSenior')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Editorial Service Cards List */}
            <div className="lg:col-span-8 space-y-6">
              {servicesList.map((service, i) => {
                const IconComponent = service.icon;
                const delayClass = i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : '';
                return (
                  <div
                    key={service.num}
                    className={`reveal-on-scroll ${delayClass} group relative bg-[#141616] hover:bg-[#181a1a] rounded-2xl border border-[#4d4635]/30 hover:border-[#f2ca50]/60 p-6 sm:p-8 transition-all duration-500 shadow-xl overflow-hidden`}
                  >
                    {/* Top Right Index Number */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#f2ca50]/30 group-hover:text-[#f2ca50] transition-colors">
                        {service.num}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <span className="bg-[#1e2020] text-[#f2ca50] border border-[#f2ca50]/30 text-[9px] font-['Hanken_Grotesk'] font-bold px-2.5 py-1 rounded-full tracking-widest">
                          {service.tag}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-[#1e2020] border border-[#4d4635]/50 flex items-center justify-center text-[#f2ca50] group-hover:scale-110 group-hover:bg-[#f2ca50] group-hover:text-[#121414] transition-all">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-['Hanken_Grotesk'] text-[10px] font-bold tracking-[0.2em] text-[#d0c5af]">
                        {service.subtitle}
                      </span>
                      <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#e2e2e2] group-hover:text-[#f2ca50] transition-colors">
                        {service.title}
                      </h3>
                      <p className="font-['Manrope'] text-sm text-[#d0c5af] leading-relaxed pt-1">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#4d4635]/20 flex items-center justify-between text-xs font-['Hanken_Grotesk'] font-bold text-[#f2ca50]">
                      <span className="tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        {t('services.learnMore')} <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll flex justify-between items-center mb-12 border-b border-[#4d4635]/30 pb-6">
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#e2e2e2]">
              {t('home.latestOpportunities')}
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#f2ca50] hover:underline"
          >
            {t('home.browseCatalog')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleProperties.slice(0, 3).map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} index={idx} />
          ))}
        </div>
      </section>

      {/* CTA Private Consultation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll glass-panel rounded-2xl p-10 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 border border-[#f2ca50]/30 shadow-[0_0_30px_rgba(242,202,80,0.15)]">
          <div className="max-w-2xl space-y-3">
            <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
              {t('home.ctaBadge')}
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#e2e2e2]">
              {t('home.ctaTitle')}
            </h2>
            <p className="font-['Manrope'] text-base text-[#d0c5af]">
              {t('home.ctaSub')}
            </p>
          </div>

          <Link
            to="/contact"
            className="flex items-center gap-3 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-sm tracking-widest px-8 py-4 rounded shadow-[0_0_20px_rgba(242,202,80,0.4)] transition-all shrink-0"
          >
            <PhoneCall className="w-5 h-5" />
            <span>{t('home.ctaButton')}</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
