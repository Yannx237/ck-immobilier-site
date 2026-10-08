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

const markerPinClass = (active: boolean) => cn(
  'flex size-10 items-center justify-center rounded-[14px] border-2 border-white shadow-lg transition duration-200',
  active ? 'scale-110 bg-ink text-white ring-4 ring-cobalt/20' : 'bg-cobalt text-white hover:scale-110',
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
          el.className = 'property-map-marker';
          const link = document.createElement('button');
          link.type = 'button';
          link.className = 'property-map-marker__button';
          link.setAttribute('aria-label', `${property.title}, ${property.district}, ${property.city}, ${formatShortAmount(property.price)} FCFA`);
          link.title = `${property.district} · ${property.city} — ${formatShortAmount(property.price)} FCFA`;
          link.addEventListener('click', () => navigate(`/property/${property.id}`));

          const label = document.createElement('span');
          label.className = 'property-map-marker__label';
          const price = document.createElement('strong');
          price.className = 'property-map-marker__price';
          price.textContent = `${formatShortAmount(property.price)}${t(`price.${property.listingType}`)}`;
          const area = document.createElement('span');
          area.className = 'property-map-marker__area';
          area.textContent = `${property.district} · ${property.city}`;
          label.append(price, area);

          const pin = document.createElement('span');
          pin.className = `property-map-marker__pin ${markerPinClass(false)}`;
          pin.setAttribute('aria-hidden', 'true');
          const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          icon.setAttribute('viewBox', '0 0 24 24');
          icon.setAttribute('width', '19');
          icon.setAttribute('height', '19');
          icon.setAttribute('fill', 'none');
          icon.setAttribute('stroke', 'currentColor');
          icon.setAttribute('stroke-width', '1.8');
          icon.setAttribute('stroke-linecap', 'round');
          icon.setAttribute('stroke-linejoin', 'round');
          const roof = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          roof.setAttribute('d', 'm3 10 9-7 9 7');
          const house = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          house.setAttribute('d', 'M5 9v12h14V9M9 21v-7h6v7');
          icon.append(roof, house);
          pin.append(icon);
          link.append(label, pin);
          el.append(link);

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
      const pin = el.querySelector('.property-map-marker__pin');
      if (pin) pin.className = `property-map-marker__pin ${markerPinClass(id === activeId)}`;
      el.style.zIndex = id === activeId ? '10' : '';
    });
  }, [activeId, ready, properties]);

  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-mist', className)}>
      {/* Mapbox impose position: relative à ce conteneur : sa taille doit venir de h-full, pas de inset-0. */}
      <div ref={containerRef} className="size-full" />
      <p className="property-map-note absolute bottom-3 left-3 z-10 max-w-[calc(100%-72px)] rounded-md bg-white/95 px-2.5 py-1.5 text-xs text-ink shadow-sm">
        {t('map.approximateLocation')}
      </p>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
          <MapPin className={cn('size-6 text-cobalt/40', !failed && 'animate-pulse')} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
};
