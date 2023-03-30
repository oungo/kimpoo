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
      <header className="p-2 border-b sm:p-0 dark:border-neutral-700">
        <div className="w-full max-w-screen-lg m-auto">
          <h1>header</h1>
        </div>
      </header>

      <nav className="p-2 border-b dark:border-neutral-700">
        <div className="flex justify-between max-w-screen-lg m-auto">
          <p>home</p>
          <button onClick={handleClickButton}>다크모드</button>
        </div>
      </nav>

      <main className="max-w-screen-lg min-h-screen p-2 m-auto sm:p-0">{children}</main>
      <footer className="relative bottom-0 w-full h-40 mt-10 bg-gray-200 dark:bg-neutral-800">
        footer
      </footer>
    </>
  );
};

export default Layout;
