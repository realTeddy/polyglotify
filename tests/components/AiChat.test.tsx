import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AiChat } from '@/components/AiChat';

// Mock the ai SDK's useChat hook
vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({
    messages: [],
    sendMessage: vi.fn(),
    status: 'ready',
    error: undefined,
  }),
}));

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
  get length() { return storage.size; },
  key: (i: number) => Array.from(storage.keys())[i] ?? null,
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

beforeEach(() => storage.clear());

describe('AiChat', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <AiChat isOpen={false} knownLang="python" learningLang="rust" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('opens the chat panel when isOpen is true', () => {
    render(<AiChat isOpen={true} knownLang="python" learningLang="rust" />);
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/AI Tutor/i)).toBeDefined();
  });

  it('shows key prompt when no AI access is configured', () => {
    render(<AiChat isOpen={true} knownLang="python" learningLang="rust" />);
    expect(screen.getByLabelText(/api key/i)).toBeDefined();
  });

  it('shows chat input when BYOK key is set', () => {
    storage.set('polyglotify:ai:byok-key', 'sk-ant-test');
    storage.set('polyglotify:ai:byok-provider', 'anthropic');
    render(<AiChat isOpen={true} knownLang="python" learningLang="rust" />);
    expect(screen.getByLabelText(/chat message/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined();
  });
});
