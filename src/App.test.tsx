import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from './App';

describe('App', () => {
  test('renders the CV Generator form and preview', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'CV Generator' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /autofill/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download pdf/i })).toBeInTheDocument();
  });
});
