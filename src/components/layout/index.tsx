import { useQuotationQuery } from '@/hooks/useQuotationQuery';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const [effect, setEffect] = useState(false);
  const handleClickButton = () => {
    setEffect(true);

    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  const { data: quotation } = useQuotationQuery();

  return (
    <>
      <header className="p-2 border-b dark:border-neutral-700">
        <div className="w-full max-w-screen-lg m-auto text-xs">
          <span>
            환율 <b>{quotation?.basePrice}</b>
          </span>
        </div>
      </header>

      <nav className="h-20 p-2 border-b dark:border-neutral-700">
        <div className="flex items-center justify-between h-full max-w-screen-lg m-auto">
          <Link className="text-2xl font-extrabold sm:text-4xl" href="/">
            KIMPOO
          </Link>
          <button
            className={`${effect && 'animate-wiggle'} text-2xl`}
            onAnimationEnd={() => setEffect(false)}
            onClick={handleClickButton}
          >
            {theme === 'light' ? <>&#127765;</> : <>&#127769;</>}
          </button>
        </div>
      </nav>

      <main className="max-w-screen-lg min-h-screen px-2 py-4 m-auto">{children}</main>

      <footer className="relative bottom-0 w-full h-40 mt-10 bg-gray-200 dark:bg-neutral-800">
        <div className="max-w-screen-lg p-5 m-auto text-xs sm:text-sm">
          KIMPOO에서 제공하는 정보는 투자에 대한 조언이 아닙니다.
          <br />
          투자에 대한 책임은 전적으로 본인에게 있습니다.
        </div>
      </footer>
    </>
  );
};

export default Layout;
