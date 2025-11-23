import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Important for Shared Hosting (relative paths)
  define: {
    // WARNING: For a static site on Shared Hosting, you must hardcode the key here 
    // or use a .env file. The key will be visible in the browser code.
    // Replace "YOUR_GEMINI_API_KEY_HERE" with your actual key string.
    'process.env.API_KEY': JSON.stringify("YOUR_GEMINI_API_KEY_HERE")
  }
})