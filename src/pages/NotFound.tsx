import { useTranslation } from 'react-i18next';
import { ButtonLink } from '../components/ui/Button';
import { Container } from '../components/ui/Layout';
import { TextLink } from '../components/ui/TextLink';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Container className="py-24">
      <title>{t('notFound.metaTitle')}</title>
      <meta name="robots" content="noindex" />
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-[50ch] text-lg text-muted">{t('notFound.text')}</p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <ButtonLink to="/catalogue">{t('notFound.cta')}</ButtonLink>
        <TextLink to="/">{t('notFound.home')}</TextLink>
      </div>
    </Container>
  );
};
