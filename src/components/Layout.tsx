import { Outlet } from 'react-router'
import { useEffect, useState } from 'react';

import { getClientToken } from '@/services/external/opensky/opensky.service';
import useAppDispatch from '@/hooks/useAppDispatch';

import Header from './header/Header'
import { loadAirports } from '@/store/airports/airports.slice';

export const Layout = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      await dispatch(loadAirports());
      getClientToken();
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
    initialize();
  }, [dispatch]);

  return (
    <div
      className="xs:p-3 relative p-7"
    >
      {
        isLoading ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        ) : (
          <>
            <Header /> 
            <Outlet />
          </>
        )
      }
    </div>
  )
}