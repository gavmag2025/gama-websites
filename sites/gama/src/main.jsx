import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './motion.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Built pages arrive prerendered and hydrate; the dev server starts empty and renders fresh.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
