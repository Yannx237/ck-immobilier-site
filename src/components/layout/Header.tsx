import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Phone, X } from 'lucide-react';
import { PRIMARY_PHONE, whatsappUrl } from '../../config/site';
import { cn } from '../../lib/cn';
import { ButtonAnchor } from '../ui/Button';
import { Container } from '../ui/Layout';
import { WhatsAppIcon } from '../ui/icons';
import { Logo } from './Logo';

const NAV = [
  { key: 'buy', to: '/catalogue?type=SALE', match: { path: '/catalogue', type: 'SALE' } },
  { key: 'rent', to: '/catalogue?type=RENT', match: { path: '/catalogue', type: 'RENT' } },
  { key: 'nights', to: '/catalogue?type=NIGHT', match: { path: '/catalogue', type: 'NIGHT' } },
  { key: 'agency', to: '/equipe', match: { path: '/equipe' } },
  { key: 'contact', to: '/contact', match: { path: '/contact' } },
] as const;

const LanguageSwitch = ({ className }: { className?: string }) => {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage;
  return (
    <div role="group" aria-label={t('nav.language')} className={cn('items-center text-sm', className ?? 'flex')}>
      {(['fr', 'en'] as const).map((lng, i) => (
        <span key={lng} className="flex items-center">
          {i > 0 && <span className="px-1 text-line">/</span>}
          <button
            type="button"
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={current === lng}
            className={cn('px-1 py-1 uppercase', current === lng ? 'font-semibold text-ink' : 'text-muted hover:text-ink')}
          >
            {lng}
          </button>
        </span>
      ))}
    </div>
  );
};

export const Header = () => {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const [open, setOpen] = useState(false);
  const type = new URLSearchParams(search).get('type');

  const isActive = (match: (typeof NAV)[number]['match']) =>
    pathname === match.path && (!('type' in match) || match.type === type);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Logo onClick={close} />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.to}
                  aria-current={isActive(item.match) ? 'page' : undefined}
                  className={cn(
                    'relative py-6 text-[15px] transition-colors',
                    isActive(item.match)
                      ? 'font-medium text-cobalt after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-cobalt'
                      : 'text-ink/80 hover:text-ink',
                  )}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${PRIMARY_PHONE.tel}`}
            className="hidden items-center gap-2 text-[15px] font-medium text-ink xl:flex"
          >
            <Phone className="size-4" strokeWidth={1.75} />
            {PRIMARY_PHONE.display}
          </a>
          <LanguageSwitch className="hidden sm:flex" />
          {/* Sur mobile, la barre de contact en bas d'écran prend le relais. */}
          <div className="hidden md:block">
            <ButtonAnchor href={whatsappUrl()} size="sm" icon={<WhatsAppIcon className="size-4" />}>
              {t('common.whatsapp')}
            </ButtonAnchor>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="-mr-2 flex size-11 items-center justify-center rounded-lg text-ink hover:bg-mist lg:hidden"
          >
            {open ? <X className="size-6" strokeWidth={1.75} /> : <Menu className="size-6" strokeWidth={1.75} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Principal" className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                onClick={close}
                aria-current={isActive(item.match) ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-3 text-lg',
                  isActive(item.match) ? 'bg-cobalt-tint font-medium text-cobalt' : 'text-ink hover:bg-mist',
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-line pt-4">
              <a href={`tel:${PRIMARY_PHONE.tel}`} className="flex items-center gap-2 font-medium text-ink">
                <Phone className="size-4" strokeWidth={1.75} />
                {PRIMARY_PHONE.display}
              </a>
              <LanguageSwitch />
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
};
