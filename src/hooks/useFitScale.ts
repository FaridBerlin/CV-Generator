import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Measures the width of the returned ref's element and returns the scale
 * (<= 1) needed to fit a page of `pageWidth` px inside it.
 */
export function useFitScale<T extends HTMLElement>(pageWidth: number) {
  const ref = useRef<T>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      // Hidden (display: none) containers report 0; keep the previous scale.
      if (width > 0) setScale(Math.min(1, width / pageWidth));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pageWidth]);

  return { ref, scale };
}
