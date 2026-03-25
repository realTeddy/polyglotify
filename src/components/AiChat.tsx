import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { getAiConfig, hasAiAccess, buildSystemPrompt, getSelectedModel } from '@/lib/ai';
import { AiKeyPrompt } from './AiKeyPrompt';

interface Props {
  isOpen: boolean;
  knownLang: string;
  learningLang: string;
  featureContext?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: any[];
  updatedAt: number;
}

const SESSIONS_KEY = 'polyglotify:ai:chat-sessions';
const ACTIVE_KEY = 'polyglotify:ai:active-chat';

function loadSessions(): ChatSession[] {
  try {
    const stored = localStorage.getItem(SESSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: ChatSession[]) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

function getActiveId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

function setActiveId(id: string | null) {
  if (id) localStorage.setItem(ACTIVE_KEY, id);
  else localStorage.removeItem(ACTIVE_KEY);
}

function getSessionTitle(messages: any[]): string {
  const first = messages.find((m: any) => m.role === 'user');
  if (!first) return 'New chat';
  const text = first.parts
    ?.filter((p: any) => p.type === 'text')
    .map((p: any) => p.text)
    .join('') || '';
  return text.slice(0, 40) + (text.length > 40 ? '...' : '') || 'New chat';
}

const mono: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
};

export function AiChat({ isOpen, knownLang, learningLang, featureContext }: Props) {
  const [hasAccess, setHasAccess] = useState(false);
  const [input, setInput] = useState('');
  const [view, setView] = useState<'chat' | 'history'>('chat');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load sessions and active chat on mount
  const [initialMessages] = useState(() => {
    if (typeof window === 'undefined') return undefined;
    const stored = loadSessions();
    const activeId = getActiveId();
    const active = stored.find((s) => s.id === activeId);
    return active?.messages;
  });

  useEffect(() => {
    setSessions(loadSessions());
    setActiveSessionId(getActiveId());
  }, []);

  const { messages, sendMessage, setMessages, status, error } = useChat({
    api: '/api/chat',
    messages: initialMessages,
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    setHasAccess(hasAiAccess());
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // Persist current chat to sessions
    if (messages.length > 0) {
      const current = loadSessions();
      let id = activeSessionId;
      if (!id) {
        id = crypto.randomUUID();
        setActiveSessionId(id);
        setActiveId(id);
      }
      const existing = current.findIndex((s) => s.id === id);
      const session: ChatSession = {
        id,
        title: getSessionTitle(messages),
        messages,
        updatedAt: Date.now(),
      };
      if (existing >= 0) {
        current[existing] = session;
      } else {
        current.unshift(session);
      }
      saveSessions(current);
      setSessions(current);
    }
  }, [messages]);

  function handleKeySet() {
    setHasAccess(true);
    if (featureContext) {
      setInput(featureContext);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const config = getAiConfig();
    const model = getSelectedModel(config.provider ?? 'anthropic');
    sendMessage({ text }, {
      body: {
        provider: config.provider,
        apiKey: config.apiKey,
        model,
        systemPrompt: buildSystemPrompt(knownLang, learningLang),
      },
    });
    setInput('');
  }

  function startNewChat() {
    setMessages([]);
    setActiveSessionId(null);
    setActiveId(null);
    setView('chat');
  }

  function resumeChat(session: ChatSession) {
    setMessages(session.messages);
    setActiveSessionId(session.id);
    setActiveId(session.id);
    setView('chat');
  }

  function deleteChat(id: string) {
    const updated = loadSessions().filter((s) => s.id !== id);
    saveSessions(updated);
    setSessions(updated);
    if (activeSessionId === id) {
      setMessages([]);
      setActiveSessionId(null);
      setActiveId(null);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '1rem',
        width: '20rem',
        maxWidth: 'calc(100vw - 2rem)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent-ui)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '70vh',
        zIndex: 50,
      }}
      role="dialog"
      aria-label="AI chat panel"
    >
      {/* Header */}
      <div
        style={{
          padding: '0.6rem 1rem',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 style={{ ...mono, fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-ui)', margin: 0 }}>
            <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
              AI Tutor
            </span>
            ai_tutor()
          </h2>
          <p style={{ ...mono, fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem', marginBottom: 0 }}>
            // {knownLang} vs {learningLang}
          </p>
        </div>
        {hasAccess && (
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <button
              onClick={() => setView(view === 'history' ? 'chat' : 'history')}
              aria-label="Chat history"
              title="Chat history"
              style={{
                background: 'none',
                border: 'none',
                color: view === 'history' ? 'var(--accent-ui)' : 'var(--text-muted)',
                cursor: 'pointer',
                ...mono,
                fontSize: '0.65rem',
                padding: '0.2rem 0.4rem',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-ui)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = view === 'history' ? 'var(--accent-ui)' : 'var(--text-muted)')}
            >
              history()
            </button>
            <button
              onClick={startNewChat}
              aria-label="New chat"
              title="New chat"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                ...mono,
                fontSize: '0.65rem',
                padding: '0.2rem 0.4rem',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-ui)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              new()
            </button>
          </div>
        )}
      </div>

      {!hasAccess ? (
        <AiKeyPrompt onKeySet={handleKeySet} />
      ) : view === 'history' ? (
        /* History view */
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            minHeight: 0,
          }}
        >
          {sessions.length === 0 ? (
            <p style={{ ...mono, fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
              // no conversations yet
            </p>
          ) : (
            sessions
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((session) => (
                <div
                  key={session.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.4rem 0.5rem',
                    backgroundColor: session.id === activeSessionId ? 'var(--bg-card)' : 'transparent',
                    border: session.id === activeSessionId ? '1px solid var(--border)' : '1px solid transparent',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                  }}
                  onClick={() => resumeChat(session)}
                  onMouseEnter={(e) => {
                    if (session.id !== activeSessionId) e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                  }}
                  onMouseLeave={(e) => {
                    if (session.id !== activeSessionId) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      ...mono,
                      fontSize: '0.7rem',
                      color: session.id === activeSessionId ? 'var(--accent-ui)' : 'var(--text-primary)',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {session.title}
                    </p>
                    <p style={{ ...mono, fontSize: '0.6rem', color: 'var(--text-muted)', margin: 0 }}>
                      {session.messages.length} msgs &middot; {new Date(session.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteChat(session.id); }}
                    aria-label="Delete chat"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      ...mono,
                      fontSize: '0.6rem',
                      padding: '0.1rem 0.3rem',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    ×
                  </button>
                </div>
              ))
          )}
        </div>
      ) : (
        /* Chat view */
        <>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              minHeight: 0,
            }}
          >
            {messages.length === 0 && (
              <p style={{ ...mono, fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                // ask a question to get started
              </p>
            )}
            {messages.map((msg) => {
              const text = msg.parts
                ?.filter((p: any) => p.type === 'text')
                .map((p: any) => p.text)
                .join('') || '';
              if (!text) return null;
              const isUser = msg.role === 'user';
              return isUser ? (
                <div
                  key={msg.id}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.5rem 0.75rem',
                    maxWidth: '85%',
                    whiteSpace: 'pre-wrap',
                    alignSelf: 'flex-end',
                    backgroundColor: 'var(--accent-ui)',
                    color: 'var(--bg-base)',
                    borderRadius: '2px',
                  }}
                >
                  {text}
                </div>
              ) : (
                <div
                  key={msg.id}
                  className="prose prose-sm prose-invert"
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.5rem 0.75rem',
                    maxWidth: '85%',
                    alignSelf: 'flex-start',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(text) as string) }}
                />
              );
            })}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div
                style={{
                  ...mono,
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  alignSelf: 'flex-start',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              >
                // thinking...
              </div>
            )}
            {error && (
              <p style={{ ...mono, fontSize: '0.7rem', color: '#f87171' }}>
                // error: {error.message}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={onSubmit}
            style={{
              padding: '0.6rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '0.4rem',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ask a question..."
              aria-label="Chat message"
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.4rem 0.6rem',
                borderRadius: '2px',
                backgroundColor: 'var(--bg-base)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                ...mono,
                fontSize: '0.75rem',
                outline: 'none',
                opacity: isLoading ? 0.5 : 1,
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              style={{
                padding: '0.4rem 0.75rem',
                backgroundColor: 'var(--accent-ui)',
                color: 'var(--bg-base)',
                border: 'none',
                borderRadius: '2px',
                ...mono,
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              →
            </button>
          </form>
        </>
      )}
    </div>
  );
}
