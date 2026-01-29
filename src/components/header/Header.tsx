import { Link, useLocation } from 'react-router';
import { match } from 'path-to-regexp';

import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { HeaderMenuData } from './header.data';
import HeaderMenuItem from './HeaderMenuItem';
import { Heart } from '../animate-ui/icons/heart';

const Header = () => {
  const location = useLocation();

  return (
    <div  className="absolute top-7 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-1/2 rounded-xl bg-card p-mini-element shadow-lg">
      <div className="flex items-center gap-4 ">
        <img
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <nav>
          <ul>
            {HeaderMenuData.map((item) => (
              <HeaderMenuItem
                {...item}
                isActive={!!match(item.link)(location.pathname)}
              />
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-4 ">
        <Link to="/favorites">
          <Heart
            size={24}
            animateOnHover
            className="text-red-500 mr-4"
          />
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
