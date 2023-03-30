import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => (
  <>
    <header className="p-2">header</header>

    <nav className="flex justify-between p-2">
      <p>home</p>
      <button>다크모드</button>
    </nav>

    <main className="max-w-screen-lg p-2 m-auto">{children}</main>
    <footer>footer</footer>
  </>
);

export default Layout;
