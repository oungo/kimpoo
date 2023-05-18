import { dehydrate, QueryClient } from 'react-query';
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
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';

const Index: NextPageWithLayout = () => {
  const { searchWord, setSearchWord } = useTickerStore(
    (state) => ({ searchWord: state.searchWord, setSearchWord: state.setSearchWord }),
    shallow
  );

  return (
    <article className="max-w-screen-lg min-h-screen px-2 py-4 m-auto">
      <div className="flex items-center justify-center gap-10 text-center sm:w-1/2 sm:m-auto">
        <DomesticExchangeSelectGroup />
        <i className="absolute text-xs fa-solid fa-right-left" />
        <OverseasExchangeSelectGroup />
      </div>

      <div className="mt-4 text-right">
        <SearchInput
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onClear={() => setSearchWord('')}
        />
      </div>

      <TableTicker />
    </article>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
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
  };
};

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Index;
