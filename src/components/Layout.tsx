import { Outlet } from 'react-router'
import Header from './header/Header'

export const Layout = () => {
  return (
    <div
      className="xs:p-3 relative p-7"
    >
      <Header /> 
      <Outlet />
    </div>
  )
}