import Header from './Header';
import Nav from './Nav';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Header />

    <Nav />

    <main className="max-w-screen-lg min-h-screen px-2 py-4 m-auto">{children}</main>

    <footer className="relative bottom-0 w-full h-40 mt-10 bg-gray-200 dark:bg-neutral-800">
      <div className="max-w-screen-lg p-5 m-auto text-xs sm:text-sm">
        <p className="whitespace-pre-line">
          KIMPOO에서 제공하는 정보는 투자에 대한 조언이 아닙니다.{'\n'}투자에 대한 책임은 전적으로
          본인에게 있습니다.
        </p>
        <div className="mt-5">
          문의
          <a className="ml-2 font-bold" target="_blank" rel="noreferrer" href="http://t.me/kimpuu">
            http://t.me/kimpuu
          </a>
        </div>
      </div>
    </footer>
  </>
);

export default Layout;
