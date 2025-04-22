import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/Movie_DB_Webapp/' : '/',
  plugins: [react()],
});