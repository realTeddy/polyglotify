export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0b0f19',
        'bg-surface': '#131825',
        'bg-card': '#1a2035',
        'bg-hover': '#222940',
        'accent-known': '#34d399',
        'accent-learning': '#f97316',
        'accent-ui': '#06b6d4',
        'accent-purple': '#a78bfa',
        'text-primary': '#e2e8f0',
        'text-secondary': '#94a3b8',
        'text-muted': '#475569',
        'border-subtle': '#1e293b',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        code: ['"Fira Code"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
