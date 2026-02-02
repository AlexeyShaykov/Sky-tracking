import useTheme from '@/providers/theme/useTheme';

import { Sun } from '../animate-ui/icons/sun';
import { Moon } from '../animate-ui/icons/moon';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div
      className=""
    >
      <button
        className="p-2 rounded-full 
        bg-card hover:bg-neutral-700 
        transition-colors flex items-center justify-center sm:p-1"
        onClick={toggleTheme}
      >
        {
          theme === 'dark' ? (
            <Moon 
              animateOnHover
            />
          ) : (
            <Sun 
              animateOnHover
            />
          )
        }
      </button>
    </div>
  )
};

export default ThemeToggle;
