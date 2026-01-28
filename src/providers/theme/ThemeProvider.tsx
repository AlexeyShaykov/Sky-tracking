import { useEffect, useState, type PropsWithChildren } from 'react';
import { ThemeContext, type Theme } from './theme.context';

const ThemeProvider = ({
  children
}: PropsWithChildren) => {
  const [ theme, setTheme ] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme ?? 'dark';
  });

  const toggleTheme = () => {
    setTheme((__prevValue: Theme) => {
      return __prevValue === 'light' ? 'dark' : 'light';
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;