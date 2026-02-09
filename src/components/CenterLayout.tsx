import { Outlet } from 'react-router'

export const CenterLayout = () => {
  return (
    <div
      className="mt-24"
    >
      <Outlet />
    </div>
  )
}