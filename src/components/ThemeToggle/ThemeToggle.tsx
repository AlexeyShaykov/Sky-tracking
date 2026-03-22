import useTheme from '@/providers/theme/useTheme';

import { Sun } from '../animate-ui/icons/sun';
import { Moon } from '../animate-ui/icons/moon';
import { Button } from '../animate-ui/components/buttons/button';
import { AnimateIcon } from '../animate-ui/icons/icon';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="">
      <Button
        variant={'secondary'}
        size="icon"
        onClick={toggleTheme}
      >
        <AnimateIcon animateOnHover>
          {theme === 'dark' ? (
            <Moon
              animateOnHover
              size={23}
            />
          ) : (
            <Sun
              animateOnHover
              size={23}
            />
          )}
        </AnimateIcon>
      </Button>
    </div>
  );
};

export default ThemeToggle;
