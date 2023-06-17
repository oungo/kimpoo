import { Roboto_Flex } from 'next/font/google';
import { NavigationEvents } from '@/components/NavigationEvents';
import Layout from '@/components/layout';
import Provider from 'app/provider';
import '@/styles/globals.css';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${roboto.variable} font-roboto`}>
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
        <NavigationEvents />
      </body>
    </html>
  );
}
