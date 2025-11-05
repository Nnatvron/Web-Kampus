import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
  },
},
  });
};
