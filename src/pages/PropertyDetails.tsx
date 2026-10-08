import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, MapPin } from 'lucide-react';
import { MobileContactBar } from '../components/layout/MobileContactBar';
import { ContactPanel } from '../components/property/ContactPanel';
import { Price } from '../components/property/Price';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFacts } from '../components/property/PropertyFacts';
import { PropertyGallery } from '../components/property/PropertyGallery';
import { PropertyMap } from '../components/property/PropertyMap';
import { ButtonLink } from '../components/ui/Button';
import { Container, Section, SectionHeader } from '../components/ui/Layout';
import { Tag } from '../components/ui/Tag';
import { TextLink } from '../components/ui/TextLink';
import { getProperty, properties } from '../data/properties';
import { locationLabel, propertyMessage } from '../lib/property';

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">{children}</h2>
);

export const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const property = getProperty(id);

  if (!property) {
    return (
      <Section>
        <title>{t('notFound.metaTitle')}</title>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">{t('property.notFoundTitle')}</h1>
        <p className="mt-3 text-muted">{t('property.notFoundText')}</p>
        <ButtonLink to="/catalogue" className="mt-6">
          {t('property.notFoundCta')}
        </ButtonLink>
      </Section>
    );
  }

  const sameCity = properties.filter((p) => p.id !== property.id && p.city === property.city);
  const similar = (sameCity.length > 0 ? sameCity : properties.filter((p) => p.id !== property.id)).slice(0, 3);
  const backTo = `/catalogue?type=${property.listingType}`;

  return (
    <>
      <title>{`${property.title}, ${property.city} — CK Immobilier`}</title>
      <meta name="description" content={property.description} />

      <Container className="pt-6 pb-16 max-md:pb-40">
        <TextLink to={backTo} direction="back" className="mb-5">
          {t('property.back')}
        </TextLink>

        <PropertyGallery title={property.title} images={property.images} />

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <header>
              <div className="flex flex-wrap gap-2">
                <Tag>{t(`listing.${property.listingType}`)}</Tag>
                {property.isExclusive && <Tag tone="accent">{t('listing.exclusive')}</Tag>}
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
                {property.title}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-muted">
                <MapPin className="size-4" strokeWidth={1.75} />
                {locationLabel(property)}
              </p>
              <div className="mt-3 lg:hidden">
                <Price property={property} size="lg" />
              </div>
            </header>

            <PropertyFacts property={property} />

            <section>
              <SubHeading>{t('property.description')}</SubHeading>
              <p className="max-w-[65ch] leading-relaxed text-ink/85">{property.description}</p>
            </section>

            <section>
              <SubHeading>{t('property.features')}</SubHeading>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-ink/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-cobalt" strokeWidth={2} />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SubHeading>{t('property.location')}</SubHeading>
              <PropertyMap properties={[property]} zoom={14} className="h-[320px]" />
            </section>
          </div>

          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-[96px]">
              <ContactPanel property={property} />
            </div>
          </aside>
        </div>
      </Container>

      {similar.length > 0 && (
        <Section tone="mist">
          <SectionHeader
            title={sameCity.length > 0 ? t('property.similar', { city: property.city }) : t('property.similarFallback')}
          />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </Section>
      )}

      <MobileContactBar
        message={propertyMessage(property, t, 'whatsappMessage')}
        summary={<Price property={property} size="sm" />}
      />
    </>
  );
};
