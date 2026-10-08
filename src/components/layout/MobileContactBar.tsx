import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone } from 'lucide-react';
import { PRIMARY_PHONE, whatsappUrl } from '../../config/site';
import { ButtonAnchor } from '../ui/Button';
import { WhatsAppIcon } from '../ui/icons';

interface MobileContactBarProps {
  message?: string;
  /** Contenu affiché au-dessus des boutons, par exemple le prix du bien consulté. */
  summary?: ReactNode;
}

/** Barre d'appel et de WhatsApp fixée en bas de l'écran sur mobile. */
export const MobileContactBar = ({ message, summary }: MobileContactBarProps) => {
  const { t } = useTranslation();
  return (
    <aside
      aria-label={t('mobileBar.label')}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      {summary && <div className="mb-2">{summary}</div>}
      <div className="grid grid-cols-2 gap-3">
        <ButtonAnchor
          href={`tel:${PRIMARY_PHONE.tel}`}
          variant="secondary"
          icon={<Phone className="size-4" strokeWidth={1.75} />}
        >
          {t('common.call')}
        </ButtonAnchor>
        <ButtonAnchor href={whatsappUrl(message)} variant="whatsapp" icon={<WhatsAppIcon className="size-4" />}>
          {t('common.whatsappShort')}
        </ButtonAnchor>
      </div>
    </aside>
  );
};
