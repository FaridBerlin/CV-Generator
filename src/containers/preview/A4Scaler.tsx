import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useFitScale } from '../../hooks/useFitScale';

export const A4_WIDTH = 794; // 210mm @ 96dpi
export const A4_HEIGHT = 1123; // 297mm @ 96dpi

/**
 * Renders children in a fixed-width A4 sheet (px units, unaffected by browser
 * font size or viewport breakpoints) and scales it down to fit the column.
 * Content taller than one page grows in whole-page steps; dashed guides mark
 * each page break.
 */
function A4Scaler({ children }: { children: ReactNode }) {
  const { ref, scale } = useFitScale<HTMLDivElement>(A4_WIDTH);
  const pageRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);

  useLayoutEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const update = () => {
      // scrollHeight is unaffected by the CSS transform.
      setPages(Math.max(1, Math.ceil((el.scrollHeight - 1) / A4_HEIGHT)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const height = pages * A4_HEIGHT;

  return (
    <div ref={ref} className="w-full">
      <div style={{ width: A4_WIDTH * scale, height: height * scale }} className="mx-auto">
        <div
          ref={pageRef}
          id="cv-page"
          className="cv-page"
          style={{
            width: A4_WIDTH,
            minHeight: height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
          {Array.from({ length: pages - 1 }, (_, i) => (
            <div key={i} className="cv-page-break" style={{ top: (i + 1) * A4_HEIGHT }}>
              <span>Page {i + 2}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default A4Scaler;
