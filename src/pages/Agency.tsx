import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import founderPhoto from '../assets/branding/colbert_kouatcho.webp';
import { ButtonAnchor } from '../components/ui/Button';
import { Container, Section } from '../components/ui/Layout';
import { TextLink } from '../components/ui/TextLink';
import { WhatsAppIcon } from '../components/ui/icons';
import { whatsappUrl } from '../config/site';
import { ServicesTimeline } from '../components/agency/ServicesTimeline';

export const Agency = () => {
  const { t } = useTranslation();
  const commitments = t('agency.commitments', { returnObjects: true }) as string[];

  return (
    <>
      <title>{t('agency.metaTitle')}</title>

      <Container className="grid gap-10 pt-10 pb-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pt-14">
        <div className="lg:col-span-7">
          <h1 className="text-[34px] leading-[1.1] font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t('agency.title')}
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">{t('agency.intro')}</p>
        </div>
        <figure className="lg:col-span-5">
          <img
            src={founderPhoto}
            alt={t('agency.founderCaption')}
            className="aspect-[4/5] w-full rounded-2xl object-cover object-top shadow-soft"
          />
          <figcaption className="mt-3">
            <span className="block font-medium text-ink">{t('agency.founderCaption')}</span>
            <span className="text-sm text-muted">{t('agency.founderBio')}</span>
          </figcaption>
        </figure>
      </Container>

      <Section className="border-t border-line">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">{t('agency.servicesTitle')}</h2>
        <ServicesTimeline />
      </Section>

      <Section tone="mist">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">{t('agency.commitmentsTitle')}</h2>
        <ul className="mt-8 grid gap-x-12 gap-y-5 md:grid-cols-2">
          {commitments.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink">
              <Check className="mt-0.5 size-5 shrink-0 text-cobalt" strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
        <TextLink to="/charte-ethique" className="mt-8">
          {t('agency.readCharter')}
        </TextLink>
      </Section>

      <Section containerClassName="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">{t('agency.entrustTitle')}</h2>
          <p className="mt-2 text-muted">{t('agency.entrustText')}</p>
        </div>
        <ButtonAnchor href={whatsappUrl(t('agency.entrustMessage'))} size="lg" icon={<WhatsAppIcon className="size-5" />}>
          {t('agency.entrustCta')}
        </ButtonAnchor>
      </Section>
    </>
  );
};
