import React, { useState } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#1e2020] border border-[#f2ca50]/40 px-4 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-[0.2em] text-[#f2ca50]">
            {t('contact.badge')}
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#e2e2e2]">
          {t('contact.title')}
        </h1>
        <p className="font-['Manrope'] text-base text-[#d0c5af]">
          {t('contact.sub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Form Column */}
        <div className="lg:col-span-2 glass-panel p-8 sm:p-12 rounded-2xl border border-[#f2ca50]/30 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e2e2e2]">
                {t('contact.successTitle')}
              </h3>
              <p className="font-['Manrope'] text-sm text-[#d0c5af] max-w-md mx-auto">
                {t('contact.successDesc')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#e2e2e2] border-b border-[#4d4635]/30 pb-4">
                {t('contact.formTitle')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                    {t('contact.fullName')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                    {t('contact.phoneWhatsapp')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t('contact.phonePlaceholder')}
                    className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                    {t('contact.emailAddress')}
                  </label>
                  <input
                    type="email"
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                    {t('contact.selectMotif')}
                  </label>
                  <select
                    required
                    className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="">{t('contact.selectPrompt')}</option>
                    <option value="acquisition">{t('contact.optAcquisition')}</option>
                    <option value="mandat">{t('contact.optMandat')}</option>
                    <option value="patrimoine">{t('contact.optPatrimoine')}</option>
                    <option value="autre">{t('contact.optAutre')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] tracking-wider">
                  {t('contact.message')}
                </label>
                <textarea
                  rows={4}
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-4 py-3 text-sm text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-xs tracking-widest px-8 py-4 rounded shadow-[0_0_15px_rgba(242,202,80,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t('contact.submitRequest')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Office Contact Info */}
        <div className="space-y-8">
          
          <div className="bg-[#1a1c1c] p-8 rounded-2xl border border-[#4d4635]/40 space-y-6">
            <h3 className="font-['Playfair_Display'] font-semibold text-xl text-[#f2ca50]">
              {t('contact.officesTitle')}
            </h3>

            <div className="space-y-4 text-sm text-[#d0c5af] font-['Manrope']">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#e2e2e2] block">{t('contact.yaoundeHq')}</strong>
                  Carrefour Golf, Yaoundé
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#e2e2e2] block">{t('contact.doualaAgency')}</strong>
                  Carrefour Bassong, Logpom (BP 15387 Douala)
                </div>
              </div>

              <div className="border-t border-[#4d4635]/30 pt-4 flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#f2ca50] shrink-0" />
                <span>+237 678 38 68 75 / +237 656 24 20 81</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#f2ca50] shrink-0" />
                <span>contact@ck-immobilier.cm</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#f2ca50] shrink-0" />
                <span>{t('contact.hours')}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
