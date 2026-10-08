import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import type { Property } from '../../data/properties';
import { cn } from '../../lib/cn';
import { formatShortAmount } from '../../lib/format';
import { loadMapbox, type MapboxMarker } from '../../lib/mapbox';

interface PropertyMapProps {
  properties: Property[];
  activeId?: string | null;
  /** Active le zoom à la molette ; désactivé par défaut pour ne pas piéger le défilement de la page. */
  scrollZoom?: boolean;
  zoom?: number;
  className?: string;
}

const pillClass = (active: boolean) =>
  cn(
    'cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums shadow-md transition-colors',
    active ? 'bg-cobalt text-white' : 'bg-white text-ink hover:bg-cobalt-tint',
  );

/** Repère `true` dès que l'élément approche de la zone visible. */
const useNearViewport = (ref: React.RefObject<HTMLElement | null>) => {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), {
      rootMargin: '300px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, near]);
  return near;
};

export const PropertyMap = ({ properties, activeId, scrollZoom = false, zoom, className }: PropertyMapProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, MapboxMarker>>(new Map());
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const near = useNearViewport(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    if (!near || !container || properties.length === 0) return;

    let cancelled = false;
    let cleanup = () => {};

    loadMapbox()
      .then((mapboxgl) => {
        if (cancelled) return;
        const map = new mapboxgl.Map({
          container,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [properties[0].coordinates.lng, properties[0].coordinates.lat],
          zoom: zoom ?? 12,
          scrollZoom,
        });
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

        const fitToProperties = () => {
          if (properties.length < 2 || zoom !== undefined) return;
          const lngs = properties.map((p) => p.coordinates.lng);
          const lats = properties.map((p) => p.coordinates.lat);
          map.fitBounds(
            [
              [Math.min(...lngs), Math.min(...lats)],
              [Math.max(...lngs), Math.max(...lats)],
            ],
            { padding: 64, maxZoom: 13, duration: 0 },
          );
        };
        fitToProperties();

        const markers = markersRef.current;
        properties.forEach((property) => {
          // Mapbox gère les classes et la position de l'élément racine : la pastille stylée est un enfant.
          const el = document.createElement('div');
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = pillClass(false);
          pill.textContent = `${formatShortAmount(property.price)}${t(`price.${property.listingType}`)}`;
          pill.setAttribute('aria-label', property.title);
          pill.addEventListener('click', () => navigate(`/property/${property.id}`));
          el.appendChild(pill);

          markers.set(
            property.id,
            new mapboxgl.Marker({ element: el, anchor: 'bottom' })
              .setLngLat([property.coordinates.lng, property.coordinates.lat])
              .addTo(map),
          );
        });

        // La carte peut être créée masquée (vue liste sur mobile) : on la recadre quand elle apparaît.
        const observer = new ResizeObserver(() => {
          map.resize();
          fitToProperties();
        });
        observer.observe(container);
        setReady(true);

        cleanup = () => {
          observer.disconnect();
          markers.forEach((marker) => marker.remove());
          markers.clear();
          map.remove();
        };
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [near, properties, scrollZoom, zoom, navigate, t]);

  // Mise en avant de la pastille du bien survolé dans la liste, sans recréer la carte.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      const pill = el.firstElementChild;
      if (pill) pill.className = pillClass(id === activeId);
      el.style.zIndex = id === activeId ? '10' : '';
    });
  }, [activeId, ready, properties]);

  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-mist', className)}>
      {/* Mapbox impose position: relative à ce conteneur : sa taille doit venir de h-full, pas de inset-0. */}
      <div ref={containerRef} className="size-full" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
          <MapPin className={cn('size-6 text-cobalt/40', !failed && 'animate-pulse')} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
};
