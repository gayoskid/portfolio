import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // The CSP only allows files from this site, so nothing may be inlined as a data: URI.
    assetsInlineLimit: 0,
  },
});
