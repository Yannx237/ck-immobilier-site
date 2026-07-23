import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Maximize2, Bed, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const BentoGrid: React.FC = () => {
  const { t } = useTranslation();
  useScrollReveal();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[750px]">
      
      {/* Large Featured Property (Palais des Ambassadeurs) */}
      <div className="reveal-on-scroll md:col-span-2 md:row-span-2 relative group overflow-hidden bg-[#1a1c1c] rounded-xl border border-[#4d4635]/40 hover:border-[#f2ca50]/70 transition-all duration-500 shadow-2xl min-h-[460px] sm:min-h-[520px] flex flex-col justify-end">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlIgSpulC6OctBSdrYtKCA1csxGvPXIz0EPOc9yfUhv_gRLyoGT2lwPA_IjptCbiu2hrr1EOV_rtuKGGbn-Wg4nMCkPKGg3fAsXr5caFVYGASIy8F-N86v1d_ZldRON8__vK1tmZ53--kfuQjzpGWS1i3crWijZngnQl3YzgreTGwMdu77l7-juAk-vPypFzhQBOZIC_WyHTx0SPt7mzvEvHOZG2MJm1coj0D21yIM41f0PqfGbMfUrXfdnwqJdgb2-gqHD29WyEmi"
          alt="Palais des Ambassadeurs"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/50 to-transparent"></div>

        {/* Badge Prestige */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 bg-[#0c0f0f]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#f2ca50]/40 rounded-full shadow-lg z-10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-[10px] sm:text-xs font-bold text-[#f2ca50] tracking-widest">
            DIRECT CK - PRESTIGE
          </span>
        </div>

        {/* Content bottom overlay */}
        <div className="relative z-10 w-full p-5 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <p className="font-['Hanken_Grotesk'] text-[10px] sm:text-xs text-[#f2ca50] font-bold tracking-widest mb-1">
              {t('bento.tag1')}
            </p>
            <h3 className="font-['Playfair_Display'] font-bold text-xl sm:text-2xl md:text-3xl text-[#e2e2e2] mb-2 sm:mb-3">
              {t('bento.title1')}
            </h3>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-[#d0c5af] font-['Manrope']">
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#f2ca50]" /> 450 m²
              </span>
              <span className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#f2ca50]" /> 5 {t('property.bedrooms')}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2.5 sm:gap-3 w-full md:w-auto pt-2 md:pt-0">
            <span className="font-['Playfair_Display'] font-bold text-xl sm:text-2xl text-[#f2ca50]">
              350 000 000 FCFA
            </span>
            <Link
              to="/property/1"
              className="inline-flex items-center justify-center gap-2 bg-[#f2ca50] text-[#3c2f00] font-['Hanken_Grotesk'] font-bold text-xs tracking-wider px-5 py-2.5 rounded hover:bg-[#ffe088] transition-all shadow-[0_0_15px_rgba(242,202,80,0.3)] w-full md:w-auto"
            >
              <span>{t('bento.discover')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Small Feature 1 (Appartement Bonanjo) */}
      <div className="reveal-on-scroll delay-100 relative group overflow-hidden bg-[#1a1c1c] rounded-xl border border-[#4d4635]/40 hover:border-[#f2ca50]/70 transition-all duration-500 shadow-xl min-h-[280px] flex flex-col justify-end">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiatGuxCHIORekehsiuQ1RaoqaC5leNF0LWx3ZTSpU5dwSyX4zF90dy8PkXZ3VfOdC5jd4lRpSLTLGt9C3V0xFr1mF4uXvQD-4sfvMMSweIRYdCQG80M_VwoZiBTSn4mBLkOWVnFI1pEH5scWvjc90uuf9PZftb3VfyJfy5UlDackEbBlUSWWNp1H_DzF3mshAxNraszAdegX9wB4rUZsDELbG62UNuxjG96z2dE3WbFIwCJgh5xL2Aw1wYWtCDeYYm_zlBwwvytmx"
          alt="Appartement de Prestige Bonanjo"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/40 to-transparent"></div>

        <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#0c0f0f]/80 backdrop-blur px-3 py-1 border border-[#f2ca50]/30 rounded-full z-10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-widest">
            DIRECT CK
          </span>
        </div>

        <div className="relative z-10 w-full p-5 sm:p-6">
          <p className="font-['Hanken_Grotesk'] text-[10px] text-[#d0c5af] font-bold tracking-widest mb-1">
            DOUALA, BONANJO
          </p>
          <h3 className="font-['Playfair_Display'] font-semibold text-base sm:text-lg text-[#e2e2e2] mb-1.5">
            {t('bento.tag2')}
          </h3>
          <p className="font-['Playfair_Display'] font-bold text-base sm:text-lg text-[#f2ca50]">
            450 000 FCFA {t('bento.perMonth')}
          </p>
        </div>
      </div>

      {/* Small Feature 2 (Villa Bonapriso) */}
      <div className="reveal-on-scroll delay-200 relative group overflow-hidden bg-[#1a1c1c] rounded-xl border border-[#4d4635]/40 hover:border-[#f2ca50]/70 transition-all duration-500 shadow-xl min-h-[280px] flex flex-col justify-end">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzLihmQWOaM5YRkeJyMyxZUnBfy-6PgUrX1WGIC9_2oqIIntZHLfqXGbP_Pa1AVtUB9MZ8-hNB09o9hpp0Bnbfzz9TQs5dSGbA0MgrSlEZim000ofDRufJCrlgm4CD1_7W_7trtPx4GFCQIGd4t2AXrfAdp_uf5cJxZsZgHvZx7-pGmNVxPiB0TKy4TL3ROgHWlXKDVOwECyYbfT1RusGumumDM66bHZxsIJku2jun-5o3t4lH4kIbELLMMRV2KZP7TNFQjqSDz_Do"
          alt="Villa Bonapriso Douala"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/40 to-transparent"></div>

        <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#0c0f0f]/80 backdrop-blur px-3 py-1 border border-[#f2ca50]/30 rounded-full z-10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#f2ca50]" />
          <span className="font-['Hanken_Grotesk'] text-[10px] font-bold text-[#f2ca50] tracking-widest">
            DIRECT CK
          </span>
        </div>

        <div className="relative z-10 w-full p-5 sm:p-6">
          <p className="font-['Hanken_Grotesk'] text-[10px] text-[#d0c5af] font-bold tracking-widest mb-1">
            DOUALA, BONAPRISO
          </p>
          <h3 className="font-['Playfair_Display'] font-semibold text-base sm:text-lg text-[#e2e2e2] mb-1.5">
            {t('bento.tag3')}
          </h3>
          <p className="font-['Playfair_Display'] font-bold text-base sm:text-lg text-[#f2ca50]">
            185 000 000 FCFA
          </p>
        </div>
      </div>

    </div>
  );
};
