import { useEffect } from 'react';

/**
 * Reusable hook that observes all elements with class '.reveal-on-scroll'
 * and adds '.is-visible' when they scroll into view.
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Unobserve once revealed
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before element reaches bottom
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const targets = document.querySelectorAll('.reveal-on-scroll');

    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, []);
};
