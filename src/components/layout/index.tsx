import Footer from './footer';
import Header from './header';
import Nav from './nav';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <Nav />
    {children}
    <Footer />
  </>
);

export default Layout;
