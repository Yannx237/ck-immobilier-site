import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frTranslation },
      en: { translation: enTranslation },
    },
    supportedLngs: ['fr', 'en'],
    nonExplicitSupportedLngs: true,
    fallbackLng: 'fr',
    // Le français reste la langue par défaut : on ne bascule en anglais
    // que si le visiteur l'a choisi (mémorisé) ou si son navigateur est en anglais.
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
    interpolation: { escapeValue: false },
  });

const syncHtmlLang = (lng: string) => document.documentElement.setAttribute('lang', lng.slice(0, 2));
syncHtmlLang(i18n.resolvedLanguage ?? 'fr');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
