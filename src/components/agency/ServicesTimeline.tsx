import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, KeyRound, BedDouble } from 'lucide-react';
import salePortrait from '../../assets/branding/services-vente.webp';
import rentalPortrait from '../../assets/branding/services-location.webp';
import hospitalityPortrait from '../../assets/branding/services-auberge.webp';
import { TextLink } from '../ui/TextLink';
import { cn } from '../../lib/cn';

const PORTRAITS = [salePortrait, rentalPortrait, hospitalityPortrait];
const ICONS = [Building2, KeyRound, BedDouble];
const DESTINATIONS = ['/catalogue?type=SALE', '/catalogue?type=RENT', '/catalogue?type=NIGHT'];

export const ServicesTimeline = () => {
  const { t } = useTranslation();
  const services = t('agency.services', { returnObjects: true }) as { title: string; text: string }[];
  const root = useRef<HTMLOListElement>(null);
  const progress = useRef<SVGPathElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations: Animation[] = [];
    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - rect.top) / rect.height));
      if (progress.current) progress.current.style.strokeDashoffset = String(preference.matches ? 0 : 100 * (1 - fraction));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (preference.matches) return;
        const portrait = entry.target.querySelector('.service-portrait');
        const copy = entry.target.querySelector('.service-copy');
        const reverse = entry.target.classList.contains('service-reverse');
        if (portrait) animations.push(portrait.animate([
          { transform: `translateX(${reverse ? 24 : -24}px) scale(0.96)`, opacity: 0.35 },
          { transform: 'translateX(0) scale(1)', opacity: 1 },
        ], { duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }));
        if (copy) animations.push(copy.animate([
          { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(12px)' },
          { clipPath: 'inset(0 0 0% 0)', transform: 'translateY(0)' },
        ], { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }));
      });
    }, { threshold: 0.2 });
    element.querySelectorAll('.service-step').forEach((row) => observer.observe(row));
    const onPreference = () => { animations.forEach((animation) => animation.cancel()); schedule(); };
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', onPreference);
    schedule();
    return () => {
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', onPreference);
    };
  }, []);

  return (
    <div className="relative mt-12">
      <div aria-hidden="true" className="service-track pointer-events-none absolute inset-y-0">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" fill="none">
          <path d="M50 0 V100" stroke="var(--color-line)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path ref={progress} d="M50 0 V100" stroke="var(--color-cobalt)" strokeWidth="2" vectorEffect="non-scaling-stroke" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
        </svg>
      </div>
      <ol ref={root} className="services-timeline relative list-none">
      {services.map((service, i) => {
        const Icon = ICONS[i];
        return (
          <li key={service.title} className={cn('service-step relative grid items-center', i % 2 === 1 && 'service-reverse')}>
            <div className="service-portrait relative mx-auto flex w-full max-w-[380px] items-end justify-center self-end">
              <div aria-hidden="true" className="absolute inset-x-4 bottom-0 aspect-square rounded-full bg-mist" />
              <img src={PORTRAITS[i]} alt="" loading="lazy" width="1086" height="1448" className="relative z-10 h-[340px] w-full object-contain object-bottom sm:h-[400px] lg:h-[440px]" />
            </div>
            <span aria-hidden="true" className="service-node absolute z-10 flex size-12 items-center justify-center rounded-full border border-cobalt/20 bg-white text-cobalt">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <div className="service-copy py-6 md:py-10">
              <h3 className="max-w-[20ch] text-2xl leading-tight font-semibold tracking-tight text-ink sm:text-3xl">{service.title}</h3>
              <p className="mt-4 max-w-[43ch] text-base leading-relaxed text-muted sm:text-lg">{service.text}</p>
              <TextLink to={DESTINATIONS[i]} className="mt-6">{t(`agency.serviceCta${i}`)}</TextLink>
            </div>
          </li>
        );
      })}
      </ol>
    </div>
  );
};
