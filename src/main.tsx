import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Home } from './screens/home';
import { Layout } from './components/Layout';

import ThemeProvider from './providers/theme/ThemeProvider';

import './index.css';

createRoot(document.getElementById('root')!).render(
  // ! non-null assertion
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Home />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
