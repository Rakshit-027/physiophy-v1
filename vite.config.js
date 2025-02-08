import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Correct plugin for React
import tailwindcss from 'tailwindcss'; // TailwindCSS should be used in a PostCSS config, not here

export default defineConfig({
  plugins: [
    react(), // Correct way to add React plugin
  ],
});
