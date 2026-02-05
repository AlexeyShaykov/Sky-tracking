import useTheme from '@/providers/theme/useTheme';

import { Sun } from '../animate-ui/icons/sun';
import { Moon } from '../animate-ui/icons/moon';
import { Button } from '../animate-ui/components/buttons/button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className=""
    >
      <Button
        type='button'
        variant='secondary'
        size='icon'
        onClick={toggleTheme}
      >
        {
          theme === 'dark' ? (
            <Moon
              animateOnHover
              size={23}
            />
          ) : (
            <Sun
              animateOnHover
              size={23}
            />
          )
        }
      </Button>
    </div>
  )
};

export default ThemeToggle;
