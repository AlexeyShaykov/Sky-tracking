import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { domAnimation, LazyMotion } from 'framer-motion';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import ThemeProvider from './providers/theme/ThemeProvider';
import RoutesProvider from './providers/RoutesProviders';

import './index.css';
import { store } from './store';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  // ! non-null assertion
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LazyMotion features={domAnimation}>
          <Provider store={store}>
            <RoutesProvider />
          </Provider>
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
