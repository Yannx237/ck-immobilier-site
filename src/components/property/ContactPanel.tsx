import { useTranslation } from 'react-i18next';
import { CalendarCheck, Phone, ShieldCheck } from 'lucide-react';
import founderPhoto from '../../assets/branding/colbert_kouatcho.webp';
import { PRIMARY_PHONE, SITE, whatsappUrl } from '../../config/site';
import type { Property } from '../../data/properties';
import { propertyMessage } from '../../lib/property';
import { ButtonAnchor } from '../ui/Button';
import { WhatsAppIcon } from '../ui/icons';
import { Price } from './Price';

export const AgentRow = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3">
      <img src={founderPhoto} alt="" className="size-12 rounded-lg object-cover object-top" />
      <div>
        <p className="font-medium text-ink">{SITE.founder}</p>
        <p className="text-sm text-muted">{t('property.agentRole')}</p>
      </div>
    </div>
  );
};

/** Bloc de contact de la fiche bien : prix, interlocuteur et actions. */
export const ContactPanel = ({ property }: { property: Property }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-line">
      <p className="text-sm text-muted">{t(`property.priceLabel_${property.listingType}`)}</p>
      <Price property={property} size="xl" />

      <div className="my-5 border-t border-line pt-5">
        <AgentRow />
        <p className="mt-3 text-sm text-muted">{t('property.responseTime')}</p>
      </div>

      <div className="flex flex-col gap-3">
        <ButtonAnchor
          href={whatsappUrl(propertyMessage(property, t, 'whatsappMessage'))}
          variant="whatsapp"
          size="lg"
          fullWidth
          icon={<WhatsAppIcon className="size-5" />}
        >
          {t('common.whatsapp')}
        </ButtonAnchor>
        <ButtonAnchor
          href={`tel:${PRIMARY_PHONE.tel}`}
          variant="secondary"
          size="lg"
          fullWidth
          icon={<Phone className="size-4" strokeWidth={1.75} />}
        >
          {t('common.callNumber', { phone: PRIMARY_PHONE.display })}
        </ButtonAnchor>
        <a
          href={whatsappUrl(propertyMessage(property, t, 'visitMessage'))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-1 text-[15px] font-medium text-cobalt hover:underline"
        >
          <CalendarCheck className="size-4" strokeWidth={1.75} />
          {t('property.askVisit')}
        </a>
      </div>

      <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-sm text-muted">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-cobalt" strokeWidth={1.75} />
        {t(`property.guarantee_${property.listingType}`)}
      </p>
    </div>
  );
};
