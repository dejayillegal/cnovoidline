import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['client/src/**/*.{test,spec}.{ts,tsx}'],
  },
});
