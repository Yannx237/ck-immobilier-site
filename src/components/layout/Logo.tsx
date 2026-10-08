import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/branding/logo-ck.webp';
import { SITE } from '../../config/site';
import { cn } from '../../lib/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}

export const Logo = ({ tone = 'dark', className, onClick }: LogoProps) => {
  const { t } = useTranslation();
  return (
    <Link to="/" onClick={onClick} aria-label={t('nav.home')} className={cn('flex items-center gap-2.5', className)}>
      <img src={logo} alt="" width={70} height={40} className="h-10 w-auto" />
      <span className={cn('text-[17px] font-semibold tracking-tight', tone === 'dark' ? 'text-ink' : 'text-white')}>
        {SITE.shortName}
      </span>
    </Link>
  );
};
