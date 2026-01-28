import useTheme from '@/providers/theme/useTheme';

import { Sun } from '../animate-ui/icons/sun';
import { Moon } from '../animate-ui/icons/moon';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div
      className="absolute top-7 left-1/2 -translate-x-1/2 z-50"
    >
      <button
        className="p-2 rounded-full bg-card hover:bg-neutral-700 transition-colors flex items-center justify-center"
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
