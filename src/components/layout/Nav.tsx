import Link from 'next/link';
import { useEffect, useState } from 'react';

const Nav = () => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
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

  return (
    <nav className="h-20 p-2 border-b dark:border-neutral-700">
      <div className="flex items-center justify-between h-full max-w-screen-lg m-auto">
        <Link className="text-2xl font-extrabold text-pink-500 sm:text-4xl" href="/">
          KIMPOO
        </Link>
        <button
          aria-label="다크모드 변경"
          className={`${
            effect && 'animate-rotate'
          } text-2xl  w-10 h-10 justify-center flex items-center rounded-full hover:bg-gray-200 hover:dark:bg-neutral-700 p-2`}
          onAnimationEnd={() => setEffect(false)}
          onClick={handleClickButton}
        >
          {theme === 'light' ? <i className="fa-solid fa-sun" /> : <i className="fa-solid fa-moon" />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
