import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, CheckSquare, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onSearch?: (filters: { mode: string; location: string; budget: string; directCk: boolean }) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [mode, setMode] = useState<'ACHETER' | 'LOUER'>('ACHETER');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [directCk, setDirectCk] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ mode, location, budget, directCk });
    } else {
      // Navigate to /catalogue with search params
      const params = new URLSearchParams();
      if (mode) params.set('mode', mode);
      if (location.trim()) params.set('search', location.trim());
      if (budget) params.set('budget', budget);
      if (directCk) params.set('directCk', 'true');
      
      navigate(`/catalogue?${params.toString()}`);
    }
  };

  return (
    <div className="glass-panel w-full max-w-4xl mx-auto p-5 sm:p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden">
      {/* Top golden highlight line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f2ca50] to-transparent opacity-80"></div>

      {/* Tabs Acheter / Louer */}
      <div className="flex border-b border-[#4d4635]/40 mb-6">
        <button
          type="button"
          onClick={() => {
            setMode('ACHETER');
            setBudget('');
          }}
          className={`flex-1 py-3 font-['Hanken_Grotesk'] text-xs tracking-widest font-bold transition-all ${
            mode === 'ACHETER'
              ? 'text-[#f2ca50] border-b-2 border-[#f2ca50]'
              : 'text-[#d0c5af] hover:text-[#f2ca50]'
          }`}
        >
          {t('search.buy')}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('LOUER');
            setBudget('');
          }}
          className={`flex-1 py-3 font-['Hanken_Grotesk'] text-xs tracking-widest font-bold transition-all ${
            mode === 'LOUER'
              ? 'text-[#f2ca50] border-b-2 border-[#f2ca50]'
              : 'text-[#d0c5af] hover:text-[#f2ca50]'
          }`}
        >
          {t('search.rent')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
        
        {/* Localisation */}
        <div className="w-full md:w-1/3 relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f2ca50] w-5 h-5 pointer-events-none" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Localisation, Quartier, Ville..."
            className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-10 py-3 text-[#e2e2e2] placeholder-[#99907c] focus:border-[#f2ca50] focus:outline-none transition-colors text-sm font-['Manrope']"
          />
        </div>

        {/* Dynamic Budget dropdown depending on ACHETER vs LOUER */}
        <div className="w-full md:w-1/3 relative">
          <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f2ca50] w-5 h-5 pointer-events-none" />
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-[#1a1c1c] border border-[#4d4635] rounded px-10 py-3 text-[#e2e2e2] focus:border-[#f2ca50] focus:outline-none transition-colors text-sm font-['Manrope'] appearance-none cursor-pointer"
          >
            <option value="">{t('search.budgetFCFA')}</option>
            {mode === 'ACHETER' ? (
              <>
                <option value="50m">50 000 000 FCFA</option>
                <option value="150m">150 000 000 FCFA</option>
                <option value="300m+">300 000 000 FCFA +</option>
              </>
            ) : (
              <>
                <option value="250k">250 000 FCFA / mois</option>
                <option value="500k">500 000 FCFA / mois</option>
                <option value="1m+">1 000 000 FCFA / mois +</option>
              </>
            )}
          </select>
        </div>

        {/* Direct CK + Submit */}
        <div className="w-full md:w-1/3 flex gap-3">
          <button
            type="button"
            onClick={() => setDirectCk(!directCk)}
            className="flex items-center gap-2 cursor-pointer border border-[#f2ca50]/30 rounded px-4 py-3 bg-[#1a1c1c]/70 hover:bg-[#1a1c1c] transition-colors w-full justify-center text-xs font-['Hanken_Grotesk'] font-bold text-[#f2ca50] tracking-wider"
          >
            {directCk ? (
              <CheckSquare className="w-4 h-4 text-[#f2ca50]" />
            ) : (
              <Square className="w-4 h-4 text-[#99907c]" />
            )}
            <span>DIRECT CK</span>
          </button>

          <button
            type="submit"
            aria-label="Rechercher"
            className="bg-[#f2ca50] text-[#3c2f00] font-bold p-3.5 rounded hover:bg-[#ffe088] transition-all shadow-[0_0_15px_rgba(242,202,80,0.3)] hover:shadow-[0_0_20px_rgba(242,202,80,0.6)] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

      </form>
    </div>
  );
};
