import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui/Layout';

type LegalKey = 'notice' | 'privacy' | 'ethics';

interface LegalSection {
  title: string;
  items: string[];
}

/** Mentions légales, confidentialité et charte éthique partagent la même mise en page ; seul le contenu change. */
export const LegalPage = ({ page }: { page: LegalKey }) => {
  const { t } = useTranslation();
  const sections = t(`legal.${page}.sections`, { returnObjects: true }) as LegalSection[];

  return (
    <Container className="max-w-3xl pt-10 pb-20 lg:pt-14">
      <title>{t(`legal.${page}.metaTitle`)}</title>
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{t(`legal.${page}.title`)}</h1>
      <p className="mt-3 text-lg text-muted">{t(`legal.${page}.intro`)}</p>

      <div className="mt-10 divide-y divide-line border-t border-line">
        {sections.map((section) => (
          <section key={section.title} className="py-6">
            <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
            <ul className="mt-3 space-y-2 leading-relaxed text-ink/85">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{t('legal.updated')}</p>
    </Container>
  );
};
