import Footer from './Footer';
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

    <Footer />
  </>
);

export default Layout;
