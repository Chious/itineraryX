import { defineConfig } from "vite";
import dns from "dns";
import react from "@vitejs/plugin-react";
import path from 'path';

// localhost part
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
