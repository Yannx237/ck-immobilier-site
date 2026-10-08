import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { ButtonAnchor } from '../components/ui/Button';
import { Container, Section } from '../components/ui/Layout';
import { WhatsAppIcon } from '../components/ui/icons';
import { PRIMARY_PHONE, SITE, whatsappUrl } from '../config/site';

const ContactRow = ({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) => (
  <li className="flex gap-4 py-5">
    <span className="mt-0.5 text-cobalt">{icon}</span>
    <div>
      <p className="text-sm text-muted">{label}</p>
      <div className="mt-1 text-ink">{children}</div>
    </div>
  </li>
);

export const Contact = () => {
  const { t } = useTranslation();
  const offices = t('contact.offices', { returnObjects: true }) as { city: string; address: string }[];
  const faq = t('contact.faq', { returnObjects: true }) as { q: string; a: string }[];
  const iconProps = { className: 'size-5', strokeWidth: 1.75 };

  return (
    <>
      <title>{t('contact.metaTitle')}</title>

      <Container className="grid gap-12 pt-10 pb-16 lg:grid-cols-12 lg:gap-16 lg:pt-14">
        <div className="lg:col-span-5">
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{t('contact.title')}</h1>
          <p className="mt-3 max-w-[45ch] text-lg text-muted">{t('contact.intro')}</p>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            <ContactRow icon={<WhatsAppIcon className="size-5" />} label={t('contact.whatsappLabel')}>
              <p className="font-medium">{PRIMARY_PHONE.display}</p>
              <ButtonAnchor href={whatsappUrl()} variant="whatsapp" size="sm" className="mt-3" icon={<WhatsAppIcon className="size-4" />}>
                {t('common.whatsapp')}
              </ButtonAnchor>
            </ContactRow>
            <ContactRow icon={<Phone {...iconProps} />} label={t('contact.phoneLabel')}>
              {SITE.phones.map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`} className="block font-medium hover:text-cobalt">
                  {phone.display}
                </a>
              ))}
              <p className="mt-1 text-sm text-muted">{t('common.hours')}</p>
            </ContactRow>
            <ContactRow icon={<Mail {...iconProps} />} label={t('contact.emailLabel')}>
              <a href={`mailto:${SITE.email}`} className="font-medium hover:text-cobalt">
                {SITE.email}
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin {...iconProps} />} label={t('contact.officesLabel')}>
              {offices.map((office) => (
                <p key={office.city}>
                  <span className="font-medium">{office.city}</span> — {office.address}
                </p>
              ))}
            </ContactRow>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-line sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>

      <Section tone="mist">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">{t('contact.faqTitle')}</h2>
        <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {faq.map((item) => (
            <div key={item.q}>
              <dt className="font-medium text-ink">{item.q}</dt>
              <dd className="mt-2 text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
};
