import '@testing-library/jest-dom/vitest';

// jsdom has no ResizeObserver (used by the A4 preview scaler).
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
