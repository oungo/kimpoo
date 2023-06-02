import { dehydrate, QueryClient } from '@tanstack/react-query';
import Script from 'next/script';
import { shallow } from 'zustand/shallow';
import { fetchQuotation } from '@/api/fetchQuotation';
import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import Layout from '@/components/layout';
import DomesticExchangeSelectGroup from '@/components/select/DomesticExchangeSelectGroup';
import OverseasExchangeSelectGroup from '@/components/select/OverseasExchangeSelectGroup';
import SearchInput from '@/components/shared/SearchInput';
import TableTicker from '@/components/ticker/TableTicker';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import type { NextPageWithLayout, PageProps } from './_app';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';

const Index: NextPageWithLayout = () => {
  const { searchWord, setSearchWord } = useTickerStore(
    (state) => ({ searchWord: state.searchWord, setSearchWord: state.setSearchWord }),
    shallow
  );

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
            <SearchInput
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onClear={() => setSearchWord('')}
            />
          </div>
        </div>

        <TableTicker />
      </article>
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: [queryKeys.UPBIT_MARKET, 'UPBIT_KRW'],
      queryFn: () => fetchUpbitMarket('KRW'),
    });
    await queryClient.prefetchQuery({
      queryKey: [queryKeys.QUOTATION],
      queryFn: fetchQuotation,
    });
  } catch (error) {
    return { redirect: { destination: '/500', permanent: false } };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Index;
