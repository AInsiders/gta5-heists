/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        heist: {
          dark: '#0a0a0f',
          panel: '#12121a',
          border: '#2a2a3a',
          success: '#22c55e',
          alarm: '#ef4444',
          risk: '#eab308',
          premium: '#a855f7',
          skill: '#3b82f6',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(168, 85, 247, 0.15)',
        glowSuccess: '0 0 20px rgba(34, 197, 94, 0.2)',
        glowAlarm: '0 0 20px rgba(239, 68, 68, 0.2)',
      },
    },
  },
  plugins: [],
}
