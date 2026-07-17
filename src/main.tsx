import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupMockFetch } from './lib/mockFetch.ts';

// Setup Mock Fetch only on static hosts (Vercel, GitHub Pages, etc.) or when explicitly configured
const isStaticHost = typeof window !== "undefined" && (
  window.location.hostname.includes("vercel.app") ||
  window.location.hostname.includes("github.io") ||
  window.location.hostname.includes("netlify.app") ||
  window.location.hostname.includes("pages.dev")
);

if ((import.meta as any).env?.VITE_USE_MOCK_FETCH === "true" || isStaticHost) {
  console.log("Mock mode enabled: intercepting API requests via LocalStorage");
  setupMockFetch();
} else {
  console.log("Full-stack mode active: connecting to live server endpoints");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

