import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Award, Clock } from 'lucide-react';
import logoImg from '../assets/bonlogo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c0f0f] border-t border-[#4d4635]/40 text-[#e2e2e2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand info with Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Logo Immobilier SARL"
                className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(242,202,80,0.3)]"
              />
              <span className="font-['Playfair_Display'] font-bold text-xl text-[#f2ca50]">
                IMMOBILIER SARL
              </span>
            </div>
            <p className="text-sm text-[#d0c5af] leading-relaxed font-['Manrope']">
              Société immobilière agréée au Cameroun (MINHDU). Expertise et transaction de biens d'exception à Yaoundé et Douala.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#f2ca50] font-['Hanken_Grotesk'] tracking-widest pt-2 font-bold">
              <Award className="w-4 h-4 text-[#f2ca50]" />
              <span>AGRÉMENT MINHDU • DIRECT CK</span>
            </div>
          </div>

          {/* Col 2: Navigation rapide */}
          <div>
            <h4 className="font-['Playfair_Display'] font-semibold text-[#f2ca50] text-lg mb-4">
              Navigation Prestige
            </h4>
            <ul className="space-y-2.5 text-sm font-['Manrope']">
              <li>
                <Link to="/" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                  Accueil & Propriétés Phares
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                  Portfolio & Carte Interactive
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                  Notre Cabinet & Équipe
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors">
                  Conciergerie & Consultation Privée
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Agences & Siège */}
          <div>
            <h4 className="font-['Playfair_Display'] font-semibold text-[#f2ca50] text-lg mb-4">
              Nos Implantation
            </h4>
            <div className="space-y-4 text-xs text-[#d0c5af]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#e2e2e2] block">Yaoundé — Siège Social</strong>
                  Carrefour Golf, Yaoundé
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f2ca50] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#e2e2e2] block">Douala — Agence Logpom</strong>
                  Quartier Logpom, Douala
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Horaires */}
          <div>
            <h4 className="font-['Playfair_Display'] font-semibold text-[#f2ca50] text-lg mb-4">
              Contact d'Exception
            </h4>
            <div className="space-y-3 text-xs text-[#d0c5af]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f2ca50]" />
                <span>+237 690 00 00 00 / +237 670 00 00 00</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f2ca50]" />
                <span>contact@ck-immobilier.cm</span>
              </div>
              <div className="flex items-center gap-2.5 pt-2">
                <Clock className="w-4 h-4 text-[#f2ca50]" />
                <span>Lundi - Samedi : 08h00 - 19h00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with active Links */}
        <div className="pt-8 border-t border-[#4d4635]/30 flex flex-col md:flex-row justify-between items-center text-xs text-[#99907c] gap-4">
          <p>© {new Date().getFullYear()} CK Immobilier SARL. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-[#f2ca50] transition-colors">
              Mentions Légales
            </Link>
            <Link to="/confidentialite" className="hover:text-[#f2ca50] transition-colors">
              Confidentialité
            </Link>
            <Link to="/charte-ethique" className="hover:text-[#f2ca50] transition-colors">
              Charte Éthique & Prestige
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
