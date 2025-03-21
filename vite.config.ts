import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/mama-strength-nurture/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/**/*'],
      manifest: {
        name: 'MamaStrong',
        short_name: 'MamaStrong',
        description: 'Strength, resources & connection for your entire motherhood journey',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icons/android-icon-36x36.png',
            sizes: '36x36',
            type: 'image/png'
          },
          {
            src: 'icons/android-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'icons/android-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'icons/android-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'icons/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'icons/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/apple-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icons/ms-icon-310x310.png',
            sizes: '310x310',
            type: 'image/png'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
