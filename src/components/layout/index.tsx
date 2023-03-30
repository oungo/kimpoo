import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  useEffect(() => {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleClickButton = () => {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <>
      <header className="p-2 dark:bg-red-400">header</header>

      <nav className="flex justify-between p-2">
        <p>home</p>
        <button onClick={handleClickButton}>다크모드</button>
      </nav>

      <main className="max-w-screen-lg p-2 m-auto">{children}</main>
      <footer>footer</footer>
    </>
  );
};

export default Layout;
