import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Dynamic proxy to handle CORS for Hiboutik API
      // Usage: /hiboutik-proxy/<account_name>/<endpoint>
      '^/hiboutik-proxy/.*': {
        target: 'https://www.hiboutik.com', // Default fallback
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/hiboutik-proxy\/[^/]+/, '/api'),
        router: (req) => {
          // Extract account from the path: /hiboutik-proxy/MY_ACCOUNT/products
          const match = req.url.match(/^\/hiboutik-proxy\/([^/]+)/);
          if (match && match[1]) {
            return `https://${match[1]}.hiboutik.com`;
          }
          return 'https://www.hiboutik.com';
        }
      }
    }
  }
})
