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
    {children}
    <Footer />
  </>
);

export default Layout;
