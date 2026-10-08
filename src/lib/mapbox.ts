// Mapbox GL pèse environ 1 Mo : on ne le télécharge que lorsqu'une carte entre à l'écran,
// pour ne pas retarder l'affichage du site sur les connexions mobiles lentes.
const VERSION = '3.2.0';
const BASE = `https://api.mapbox.com/mapbox-gl-js/v${VERSION}`;

export const MAPBOX_TOKEN: string =
  import.meta.env.VITE_MAPBOX_TOKEN ||
  atob('cGsuZXlKMUlqb2lZMmhsY21sNFlYQndJaXdpWVNJNkltTnRiSHBvY21oa01qQTFibVV6WkhGMmFXd3laVEl4TUhraWZRLl9HOG00b1pzSmlpY21pT19LRFIxS1E=');

// On ne type que la partie de l'API utilisée par le site.
export interface MapboxMarker {
  setLngLat(lngLat: [number, number]): MapboxMarker;
  addTo(map: MapboxMap): MapboxMarker;
  getElement(): HTMLElement;
  remove(): void;
}

export interface MapboxMap {
  addControl(control: unknown, position?: string): void;
  fitBounds(bounds: [[number, number], [number, number]], options?: object): void;
  resize(): void;
  remove(): void;
}

export interface MapboxGL {
  accessToken: string;
  Map: new (options: object) => MapboxMap;
  Marker: new (options: object) => MapboxMarker;
  NavigationControl: new (options?: object) => unknown;
}

declare global {
  interface Window {
    mapboxgl?: MapboxGL;
  }
}

let loading: Promise<MapboxGL> | null = null;

export const loadMapbox = () => {
  loading ??= new Promise<MapboxGL>((resolve, reject) => {
    if (window.mapboxgl) return resolve(window.mapboxgl);

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `${BASE}/mapbox-gl.css`;
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.src = `${BASE}/mapbox-gl.js`;
    script.async = true;
    script.onload = () => {
      if (!window.mapboxgl) return reject(new Error('Mapbox GL indisponible'));
      window.mapboxgl.accessToken = MAPBOX_TOKEN;
      resolve(window.mapboxgl);
    };
    script.onerror = () => {
      loading = null; // autorise une nouvelle tentative à la prochaine carte
      reject(new Error('Échec du chargement de Mapbox GL'));
    };
    document.head.appendChild(script);
  });
  return loading;
};
