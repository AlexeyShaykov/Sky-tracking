import { Outlet } from 'react-router'

import ThemeToggle from './ThemeToggle/ThemeToggle'

export const Layout = () => {
  return (
    <div
      className="relative p-7"
    >
      <Outlet />
      <ThemeToggle />
    </div>
  )
}