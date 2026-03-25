import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MarkComplete } from '@/components/MarkComplete';

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
  get length() { return storage.size; },
  key: (i: number) => Array.from(storage.keys())[i] ?? null,
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

beforeEach(() => storage.clear());

describe('MarkComplete', () => {
  it('renders uncompleted state by default', () => {
    render(<MarkComplete knownLang="python" learningLang="rust" featureSlug="variables" />);
    expect(screen.getByRole('button', { name: /mark as complete/i })).toBeDefined();
  });

  it('marks feature complete on click', () => {
    render(<MarkComplete knownLang="python" learningLang="rust" featureSlug="variables" />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/completed/i)).toBeDefined();
  });
});
