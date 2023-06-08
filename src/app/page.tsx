import Script from 'next/script';
import DomesticExchangeSelectGroup from '@/components/select/DomesticExchangeSelectGroup';
import OverseasExchangeSelectGroup from '@/components/select/OverseasExchangeSelectGroup';
import SearchInput from '@/components/shared/SearchInput';
import TableTicker from '@/components/ticker/TableTicker';
import type { Metadata } from 'next';
import type { NextPageWithLayout } from 'pages/_app';

export const metadata: Metadata = {
  title: {
    default: '김프 김치프리미엄(kimchi premium) - KIMPUU',
    template: '김프 김치프리미엄(kimchi premium) - KIMPUU',
  },
  description: '김치프리미엄(김프) 및 암호화폐 시세를 실시간 제공합니다.',
  referrer: 'origin-when-cross-origin',
  keywords: [
    '김프',
    '김치프리미엄',
    '암호화폐',
    '코인',
    '암호화폐 시세',
    '비트코인',
    '이더리움',
    'btc',
    'kimchi premium',
  ],
  authors: [{ name: 'oungo' }],
  metadataBase: new URL('https://kimpuu.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KIMPUU - 김치프리미엄 및 암호화폐 시세 확인',
    description: '김치프리미엄 및 암호화폐 시세를 실시간 제공합니다.',
    url: 'https://kimpuu.com',
    siteName: 'KIMPUU - 김치프리미엄 및 암호화폐 시세 확인',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#fff',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#171717',
    },
  ],
  manifest: 'https://kimpuu/manifest.json',
};

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Script src="https://s3.tradingview.com/tv.js" />

      <article className="max-w-screen-lg min-h-screen px-2 py-4 m-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="relative flex items-center justify-between gap-10 mb-4 text-center sm:mb-0">
            <DomesticExchangeSelectGroup />
            <i className="absolute text-xs -translate-x-1/2 fa-solid fa-right-left left-1/2" />
            <OverseasExchangeSelectGroup />
          </div>

          <div className="text-right">
            <SearchInput />
          </div>
        </div>

        <TableTicker />
      </article>
    </>
  );
};

export default Page;
