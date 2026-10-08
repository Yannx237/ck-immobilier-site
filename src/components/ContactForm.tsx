import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircleCheck } from 'lucide-react';
import { PRIMARY_PHONE, SITE, whatsappUrl } from '../config/site';
import { CITIES } from '../data/properties';
import { Button, ButtonAnchor } from './ui/Button';
import { Field, Select, TextArea, TextInput } from './ui/Field';
import { SegmentedControl } from './ui/SegmentedControl';
import { WhatsAppIcon } from './ui/icons';

const PROJECTS = ['buy', 'rent', 'night', 'entrust'] as const;
type Project = (typeof PROJECTS)[number];

interface FormValues {
  name: string;
  phone: string;
  email: string;
  project: Project;
  city: string;
  budget: string;
  message: string;
  consent: boolean;
}

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'consent', string>>;

const INITIAL: FormValues = {
  name: '',
  phone: '',
  email: '',
  project: 'rent',
  city: '',
  budget: '',
  message: '',
  consent: false,
};

const isValidPhone = (value: string) => value.replace(/[^\d]/g, '').length >= 9;
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * Le site n'a pas de serveur : la demande est rédigée puis ouverte dans WhatsApp,
 * le canal que l'agence suit au quotidien.
 */
export const ContactForm = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => ({
    ...(!values.name.trim() && { name: t('contact.errorName') }),
    ...(!isValidPhone(values.phone) && { phone: t('contact.errorPhone') }),
    ...(values.email && !isValidEmail(values.email) && { email: t('contact.errorEmail') }),
    ...(!values.consent && { consent: t('contact.errorConsent') }),
  });

  const buildMessage = () =>
    [
      t('contact.messageIntro'),
      '',
      `${t('contact.project')} : ${t(`contact.projects.${values.project}`)}`,
      values.city ? `${t('contact.city')} : ${values.city}` : null,
      values.budget ? `${t('contact.budget')} : ${values.budget}` : null,
      values.message ? `\n${values.message}` : null,
      '',
      `${values.name} — ${values.phone}${values.email ? ` — ${values.email}` : ''}`,
    ]
      .filter((line) => line !== null)
      .join('\n');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    const firstInvalid = Object.keys(found).find((key) => found[key as keyof Errors]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    const url = whatsappUrl(buildMessage());
    window.open(url, '_blank', 'noopener');
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div className="py-6" role="status">
        <CircleCheck className="size-10 text-cobalt" strokeWidth={1.5} />
        <h2 className="mt-4 text-xl font-semibold text-ink">{t('contact.sentTitle')}</h2>
        <p className="mt-2 text-muted">{t('contact.sentText', { phone: PRIMARY_PHONE.display, email: SITE.email })}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonAnchor href={sentUrl} variant="whatsapp" icon={<WhatsAppIcon className="size-4" />}>
            {t('contact.sentAgain')}
          </ButtonAnchor>
          <Button
            variant="secondary"
            onClick={() => {
              setValues(INITIAL);
              setSentUrl(null);
            }}
          >
            {t('contact.newRequest')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <h2 className="text-xl font-semibold tracking-tight text-ink">{t('contact.formTitle')}</h2>

      <Field id="contact-name" label={t('contact.name')} error={errors.name}>
        <TextInput
          id="contact-name"
          autoComplete="name"
          value={values.name}
          invalid={!!errors.name}
          onChange={(e) => set('name', e.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-phone" label={t('contact.phone')} error={errors.phone}>
          <TextInput
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+237 6XX XX XX XX"
            value={values.phone}
            invalid={!!errors.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </Field>
        <Field
          id="contact-email"
          label={
            <>
              {t('contact.email')} <span className="font-normal text-muted">({t('contact.optional')})</span>
            </>
          }
          error={errors.email}
        >
          <TextInput
            id="contact-email"
            type="email"
            autoComplete="email"
            value={values.email}
            invalid={!!errors.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-ink">{t('contact.project')}</legend>
        <SegmentedControl
          label={t('contact.project')}
          size="sm"
          className="flex-wrap"
          options={PROJECTS.map((value) => ({ value, label: t(`contact.projects.${value}`) }))}
          value={values.project}
          onChange={(project) => set('project', project)}
        />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-city" label={t('contact.city')}>
          <Select id="contact-city" value={values.city} onChange={(e) => set('city', e.target.value)}>
            <option value="">{t('contact.anyCity')}</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="contact-budget" label={t('contact.budget')}>
          <TextInput
            id="contact-budget"
            inputMode="numeric"
            value={values.budget}
            onChange={(e) => set('budget', e.target.value)}
          />
        </Field>
      </div>

      <Field id="contact-message" label={t('contact.message')}>
        <TextArea
          id="contact-message"
          placeholder={t('contact.messagePlaceholder')}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
          <input
            id="contact-consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={!!errors.consent || undefined}
            className="mt-0.5 size-4 shrink-0 accent-cobalt"
          />
          <span>
            {t('contact.consent')}{' '}
            <Link to="/confidentialite" className="text-cobalt hover:underline">
              {t('contact.privacyLink')}
            </Link>
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-sm text-red-600">{errors.consent}</p>}
      </div>

      <div>
        <Button type="submit" variant="whatsapp" size="lg" fullWidth icon={<WhatsAppIcon className="size-5" />}>
          {t('contact.submit')}
        </Button>
        <p className="mt-2 text-center text-sm text-muted">{t('contact.submitHint')}</p>
      </div>
    </form>
  );
};
