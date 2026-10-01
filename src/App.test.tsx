import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import App from './App';

describe('App', () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the CV Generator form and preview', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'CV Generator' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /autofill/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download pdf/i })).toBeInTheDocument();
  });

  test('switches the editor and CV to German and autofills German content', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Deutsch' }));
    expect(screen.getByRole('heading', { name: 'Lebenslauf-Generator' })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('de');

    await user.click(screen.getByRole('button', { name: /beispieldaten/i }));
    const preview = document.getElementById('preview') as HTMLElement;
    expect(preview).toHaveTextContent('Berufserfahrung');
    expect(preview).toHaveTextContent('Weiterbildung');
    expect(preview).toHaveTextContent('Fähigkeiten');
    expect(preview).toHaveTextContent('Fullstack-Webentwickler');
    expect(localStorage.getItem('cv-lang')).toBe('de');

    await user.click(screen.getByRole('button', { name: 'English' }));
    expect(preview).toHaveTextContent('Professional Experience');
  });
});
