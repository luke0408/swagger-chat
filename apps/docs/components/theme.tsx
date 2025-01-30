import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme: theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      disabled={!mounted}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
