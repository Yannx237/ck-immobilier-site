import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { cn } from '../../lib/cn';

interface PropertyGalleryProps {
  title: string;
  images: string[];
}

const GalleryViewer = ({
  title,
  images,
  index,
  onChange,
  onClose,
}: PropertyGalleryProps & { index: number; onChange: (i: number) => void; onClose: () => void }) => {
  const { t } = useTranslation();
  const go = useCallback(
    (step: number) => onChange((index + step + images.length) % images.length),
    [index, images.length, onChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [go, onClose]);

  const navButton = 'flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20';

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 flex flex-col bg-ink/95">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="text-sm tabular-nums">{t('specs.photoCount', { index: index + 1, count: images.length })}</span>
        <button type="button" onClick={onClose} aria-label={t('property.closeGallery')} className={navButton}>
          <X className="size-5" strokeWidth={1.75} />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
        <img
          src={images[index]}
          alt={t('property.photoAlt', { title, index: index + 1 })}
          className="max-h-full max-w-full rounded-lg object-contain"
        />
        {images.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={t('property.previousPhoto')} className={cn(navButton, 'absolute left-4')}>
              <ChevronLeft className="size-5" strokeWidth={1.75} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t('property.nextPhoto')} className={cn(navButton, 'absolute right-4')}>
              <ChevronRight className="size-5" strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/** Grille photo de la fiche bien : une grande image et deux vignettes, ouvrant une visionneuse plein écran. */
export const PropertyGallery = ({ title, images }: PropertyGalleryProps) => {
  const { t } = useTranslation();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [main, ...rest] = images;
  const side = rest.slice(0, 2);

  const tile = (src: string, index: number, className?: string) => (
    <button
      key={src}
      type="button"
      onClick={() => setViewerIndex(index)}
      className={cn('group relative overflow-hidden rounded-xl bg-mist', className)}
    >
      <img
        src={src}
        alt={t('property.photoAlt', { title, index: index + 1 })}
        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        loading={index === 0 ? 'eager' : 'lazy'}
      />
    </button>
  );

  return (
    <>
      <div className={cn('grid gap-3 md:h-[480px]', side.length > 0 && 'md:grid-cols-3 md:grid-rows-2')}>
        {tile(main, 0, cn('aspect-[4/3] md:aspect-auto md:h-full', side.length > 0 && 'md:col-span-2 md:row-span-2'))}
        {side.map((src, i) => tile(src, i + 1, 'hidden min-h-0 md:block md:h-full'))}
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => setViewerIndex(0)}
            className="flex items-center gap-2 justify-self-start rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink hover:bg-mist md:hidden"
          >
            <Images className="size-4" strokeWidth={1.75} />
            {t('property.seePhotos', { count: images.length })}
          </button>
        )}
      </div>
      {images.length > 3 && (
        <button
          type="button"
          onClick={() => setViewerIndex(0)}
          className="mt-3 hidden items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink hover:bg-mist md:inline-flex"
        >
          <Images className="size-4" strokeWidth={1.75} />
          {t('property.seePhotos', { count: images.length })}
        </button>
      )}
      {viewerIndex !== null && (
        <GalleryViewer
          title={title}
          images={images}
          index={viewerIndex}
          onChange={setViewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
};
