import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguagePicker } from '@/components/LanguagePicker';

const mockLanguages = [
  { slug: 'python', name: 'Python', featureCount: 4 },
  { slug: 'javascript', name: 'JavaScript', featureCount: 4 },
  { slug: 'rust', name: 'Rust', featureCount: 4 },
];

describe('LanguagePicker', () => {
  it('renders two select dropdowns', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    expect(screen.getByLabelText(/i know/i)).toBeDefined();
    expect(screen.getByLabelText(/i want to learn/i)).toBeDefined();
  });

  it('populates options from languages prop', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    const knownSelect = screen.getByLabelText(/i know/i) as HTMLSelectElement;
    expect(knownSelect.options.length).toBe(4); // 3 + placeholder
  });

  it('disables start button when languages not selected', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    const button = screen.getByRole('button', { name: /start learning/i });
    expect(button).toBeDisabled();
  });

  it('disables same language in learning dropdown', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    const knownSelect = screen.getByLabelText(/i know/i);
    fireEvent.change(knownSelect, { target: { value: 'python' } });
    const learningSelect = screen.getByLabelText(/i want to learn/i) as HTMLSelectElement;
    const pythonOption = Array.from(learningSelect.options).find((o) => o.value === 'python');
    expect(pythonOption?.disabled).toBe(true);
  });

  it('enables start button when both languages selected', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    fireEvent.change(screen.getByLabelText(/i know/i), { target: { value: 'python' } });
    fireEvent.change(screen.getByLabelText(/i want to learn/i), { target: { value: 'rust' } });
    const button = screen.getByRole('button', { name: /start learning/i });
    expect(button).not.toBeDisabled();
  });

  it('builds correct URL on submit', () => {
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, href: '' } as any;

    render(<LanguagePicker languages={mockLanguages} />);
    fireEvent.change(screen.getByLabelText(/i know/i), { target: { value: 'python' } });
    fireEvent.change(screen.getByLabelText(/i want to learn/i), { target: { value: 'rust' } });
    fireEvent.click(screen.getByRole('button', { name: /start learning/i }));
    expect(window.location.href).toBe('/learn/python/rust/variables');

    window.location = originalLocation;
  });
});
