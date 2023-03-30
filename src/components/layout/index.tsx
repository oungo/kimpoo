import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => (
  <main className="max-w-screen-lg p-2 m-auto">{children}</main>
);

export default Layout;
