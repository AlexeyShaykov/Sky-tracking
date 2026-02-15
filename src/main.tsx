import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { domAnimation, LazyMotion } from 'framer-motion';

import { Home } from './screens/home';
import { Layout } from './components/Layout';
import { CenterLayout } from './components/CenterLayout';

import ThemeProvider from './providers/theme/ThemeProvider';
import Favorites from './screens/favorites/Favorites';

import './index.css';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  // ! non-null assertion
  <StrictMode>
    <ThemeProvider>
      <LazyMotion features={domAnimation}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route element={<CenterLayout />}>
                  <Route
                    path="/favorites"
                    element={<Favorites />}
                  />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </LazyMotion>
    </ThemeProvider>
  </StrictMode>
);
