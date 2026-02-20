import { Outlet } from 'react-router'
import { useEffect } from 'react';

import useAppDispatch from '@/hooks/useAppDispatch';

import Header from './header/Header'
import { loadAirports } from '@/store/airports/airports.slice';

export const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAirports());
  }, [dispatch]);

  return (
    <div
      className="xs:p-3 relative p-7"
    >
      <Header /> 
      <Outlet />
    </div>
  )
}