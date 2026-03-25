interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export function AiChatButton({ isOpen, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-ui)',
        color: 'var(--bg-base)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 50,
        transition: 'opacity 0.15s',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '1.1rem',
        fontWeight: 700,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
    >
      {isOpen ? (
        /* Close (X) icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '1.25rem', height: '1.25rem' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        /* Chat icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '1.25rem', height: '1.25rem' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.09-3.27A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      )}
    </button>
  );
}
