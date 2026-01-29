import { cn } from '@/utils/cn';
import { Link } from 'react-router';

type HeaderMenuItemProps = {
  title: string;
  link: string;
  isActive?: boolean;
};

const HeaderMenuItem = ({ title, link, isActive }: HeaderMenuItemProps) => {
  return (
    <li>
      <Link
        to={link}
        className={cn(
          isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
        )}
      >
        {title}
      </Link>
     </li>
  );
};

export default HeaderMenuItem;
