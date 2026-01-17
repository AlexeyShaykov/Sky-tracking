import { Outlet } from 'react-router'

export const Layout = () => {
  return (
    <div
      className="relative p-7"
    >
      <Outlet />
    </div>
  )
}