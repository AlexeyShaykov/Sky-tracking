import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

import useAppDispatch from '@/hooks/useAppDispatch';

import { loadAirports } from '@/store/airports/airports.slice';
import useTheme from '@/providers/theme/useTheme';

import Header from './header/Header';

export const Layout = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const {
    theme,
  } = useTheme();

  useEffect(() => {
    async function initialize() {
      await dispatch(loadAirports());
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
    initialize();
  }, [dispatch]);

  return (
    <div className="xs:p-3 relative p-7">
      {isLoading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
      <Toaster position="top-right" theme={theme} />
    </div>
  );
};
