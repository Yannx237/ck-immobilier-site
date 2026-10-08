import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone } from 'lucide-react';
import { SITE } from '../../config/site';
import { Container } from '../ui/Layout';
import { Logo } from './Logo';

const LEGAL_LINKS = [
  { key: 'legal', to: '/mentions-legales' },
  { key: 'privacy', to: '/confidentialite' },
  { key: 'ethics', to: '/charte-ethique' },
] as const;

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-ink text-white/80">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-3 text-sm text-white/60">{t('footer.tagline')}</p>
          </div>

          <ul className="flex flex-col gap-3 text-[15px] sm:flex-row sm:flex-wrap sm:gap-x-8">
            {SITE.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="size-4" strokeWidth={1.75} />
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="size-4" strokeWidth={1.75} />
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.key}>
                <Link to={link.to} className="hover:text-white">
                  {t(`footer.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {SITE.name}. {t('footer.rights')}
          </p>
        </div>
      </Container>
    </footer>
  );
};
