import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import founderPhoto from '../assets/branding/colbert_kouatcho.jpg';
import visitPhoto from '../assets/branding/visite-immobiliere.png';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyMap } from '../components/property/PropertyMap';
import { SearchPanel } from '../components/search/SearchPanel';
import { Container, Section, SectionHeader } from '../components/ui/Layout';
import { TextLink } from '../components/ui/TextLink';
import { SITE, whatsappUrl } from '../config/site';
import { CITIES, properties } from '../data/properties';
import { countByCity } from '../lib/catalog';

export const Home = () => {
  const { t } = useTranslation();
  const featured = properties.find((p) => p.listingType === 'SALE') ?? properties[0];
  const others = properties.filter((p) => p.id !== featured.id).slice(0, 4);
  const zoneCounts = countByCity(properties);
  const steps = t('home.visitSteps', { returnObjects: true }) as { title: string; text: string }[];

  return (
    <>
      <title>{t('home.metaTitle')}</title>

      {/* Accroche + recherche */}
      <Container className="grid gap-10 pt-10 pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-14">
        <div className="lg:col-span-5">
          <h1 className="text-[34px] leading-[1.1] font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">{t('home.heroText')}</p>
          <div className="mt-8">
            <SearchPanel />
          </div>
        </div>
        <figure className="relative lg:col-span-7">
          <img
            src={featured.images[0]}
            alt={featured.title}
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft lg:aspect-[5/4]"
            fetchPriority="high"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-medium text-ink shadow-sm">
            {t('home.heroCaption')}
          </figcaption>
        </figure>
      </Container>

      {/* Annonces */}
      <Section className="border-t border-line">
        <SectionHeader
          title={t('home.listingsTitle')}
          description={t('home.listingsText')}
          action={<TextLink to="/catalogue">{t('home.allListings')}</TextLink>}
        />
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <PropertyCard property={featured} variant="featured" className="sm:col-span-2 lg:row-span-2" />
          {others.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Section>

      {/* Déroulé d'une visite */}
      <Section tone="mist" containerClassName="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <img
          src={visitPhoto}
          alt={t('home.visitPhotoAlt')}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl object-cover object-center shadow-soft"
        />
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">{t('home.visitTitle')}</h2>
          <ol className="mt-8 space-y-7 border-l-2 border-cobalt/20 pl-6">
            {steps.map((step) => (
              <li key={step.title} className="relative">
                <span className="absolute top-1.5 -left-[31px] size-3 rounded-full bg-cobalt ring-4 ring-mist" />
                <p className="font-medium text-ink">{step.title}</p>
                <p className="mt-1 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <TextLink to={whatsappUrl()}>{t('home.askQuestion')}</TextLink>
          </div>
        </div>
      </Section>

      {/* Zones couvertes */}
      <Section containerClassName="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">{t('home.mapTitle')}</h2>
          <p className="mt-3 text-muted">{t('home.mapText')}</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {CITIES.map((city) => (
              <li key={city}>
                <Link
                  to={`/catalogue?city=${encodeURIComponent(city)}`}
                  className="flex items-center justify-between py-3.5 text-ink hover:text-cobalt"
                >
                  <span className="font-medium">{city}</span>
                  <span className="text-sm text-muted">{t('home.zoneCount', { count: zoneCounts[city] ?? 0 })}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <PropertyMap properties={properties} className="h-[360px] lg:col-span-8 lg:h-[440px]" />
      </Section>

      {/* L'agence */}
      <Section className="border-t border-line" containerClassName="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
        <figure>
          <img
            src={founderPhoto}
            alt={SITE.founder}
            loading="lazy"
            className="size-40 rounded-2xl object-cover object-top sm:size-56"
          />
          <figcaption className="mt-3">
            <span className="block font-medium text-ink">{SITE.founder}</span>
            <span className="text-sm text-muted">{t('property.agentRole')}</span>
          </figcaption>
        </figure>
        <div className="max-w-2xl">
          <p className="text-xl leading-relaxed text-ink sm:text-2xl">{t('home.founderText')}</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <TextLink to="/equipe">{t('home.meetTeam')}</TextLink>
            <TextLink to="/charte-ethique">{t('home.readCharter')}</TextLink>
          </div>
        </div>
      </Section>
    </>
  );
};
