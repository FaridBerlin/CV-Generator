import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import App from './App';

// Stand-in for the real encrypted sample so the secret answer is never in tests.
vi.mock('./i18n/sampleData.enc.json', async () => {
  const { encryptJson } = await import('./i18n/sampleCrypto');
  const base = { education: [], experience: [], projects: [], languages: [], interests: [] };
  const person = {
    lastName: 'Muster',
    title: '',
    bio: '',
    email: '',
    phone: '',
    address: '',
    github: '',
    profileImage: null,
  };
  const content = (firstName: string, title: string) => ({
    ...base,
    personalInfo: { ...person, firstName, title },
    skills: ['TypeScript'],
  });
  return {
    default: await encryptJson(
      { en: content('Eve', 'Developer'), de: content('Eva', 'Fullstack-Webentwickler') },
      'test opening',
      1000
    ),
  };
});

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

  test('switches the editor and CV to German', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Deutsch' }));
    expect(screen.getByRole('heading', { name: 'Lebenslauf-Generator' })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('de');
    expect(localStorage.getItem('cv-lang')).toBe('de');

    const preview = document.getElementById('preview') as HTMLElement;
    expect(preview).toHaveTextContent('Berufserfahrung');
    expect(preview).toHaveTextContent('Weiterbildung');

    await user.click(screen.getByRole('button', { name: 'English' }));
    expect(preview).toHaveTextContent('Professional Experience');
  });

  test('autofill stays empty on a wrong answer and fills in the chosen language on the right one', async () => {
    const user = userEvent.setup();
    render(<App />);
    const preview = document.getElementById('preview') as HTMLElement;

    await user.click(screen.getByRole('button', { name: 'Deutsch' }));
    await user.click(screen.getByRole('button', { name: /beispieldaten/i }));
    const input = screen.getByLabelText(/lieblingseröffnung/i);

    await user.type(input, 'sicilian{enter}');
    expect(await screen.findByRole('alert')).toHaveTextContent('nicht die richtige');
    expect(preview).not.toHaveTextContent('Eva');

    await user.clear(input);
    await user.type(input, 'Test Opening{enter}');
    await waitFor(() => expect(preview).toHaveTextContent('Eva Muster'));
    expect(preview).toHaveTextContent('Fullstack-Webentwickler');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
