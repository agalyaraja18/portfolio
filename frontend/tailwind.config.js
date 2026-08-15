import tailwindForms from '@tailwindcss/forms';
import tailwindContainerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container": "#b3004e",
        "tertiary-container": "#665200",
        "surface-variant": "#1e1e30",
        "on-error": "#1a0000",
        "on-surface-variant": "#a098b0",
        "on-secondary": "#001a1a",
        "surface-container": "#141422",
        "on-secondary-container": "#c0fff4",
        "surface-container-lowest": "#0a0a12",
        "on-tertiary": "#1a1000",
        "background": "#0a0a12",
        "on-error-container": "#ffa0a0",
        "tertiary": "#ffe04a",
        "inverse-surface": "#e8e0f0",
        "surface-bright": "#1a1a2e",
        "secondary-fixed-dim": "#00e6b8",
        "on-secondary-fixed": "#001a1a",
        "on-primary-fixed": "#3d0020",
        "error-container": "#3d0f0f",
        "surface-tint": "#D4AF37",
        "surface-container-low": "#111118",
        "on-tertiary-fixed": "#1a1000",
        "inverse-on-surface": "#0a0a12",
        "error": "#ff4444",
        "secondary-container": "#004d3d",
        "primary-fixed": "#ffe0ec",
        "on-tertiary-fixed-variant": "#665200",
        "surface-container-high": "#1e1e30",
        "primary": "#D4AF37",
        "on-primary-container": "#ffe0ec",
        "surface-container-highest": "#28283e",
        "on-secondary-fixed-variant": "#004d4d",
        "on-tertiary-container": "#fff0c0",
        "tertiary-fixed": "#fff0c0",
        "surface": "#0f0f1a",
        "surface-dim": "#0f0f1a",
        "secondary": "#F5F2EB",
        "primary-fixed-dim": "#ff80aa",
        "on-background": "#e8e0f0",
        "outline": "#5a5068",
        "on-surface": "#e8e0f0",
        "inverse-primary": "#8c0038",
        "outline-variant": "#302840",
        "on-primary-fixed-variant": "#8c0038",
        "secondary-fixed": "#c0fff4",
        "on-primary": "#1a0010",
        "tertiary-fixed-dim": "#ffe04a"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      fontFamily: {
        "headline": ["Sora"],
        "display": ["Sora"],
        "body": ["Inter"],
        "label": ["Space Grotesk"]
      }
    },
  },
  plugins: [
    tailwindForms,
    tailwindContainerQueries,
  ],
}
