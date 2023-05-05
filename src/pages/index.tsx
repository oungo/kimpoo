import { dehydrate, QueryClient } from 'react-query';
import { shallow } from 'zustand/shallow';
import { fetchQuotation } from '@/api/fetchQuotation';
import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import DomesticExchangeSelectGroup from '@/components/select/DomesticExchangeSelectGroup';
import OverseasExchangeSelectGroup from '@/components/select/OverseasExchangeSelectGroup';
import SearchInput from '@/components/shared/SearchInput';
import TableTicker from '@/components/ticker/TableTicker';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import type { PageProps } from './_app';
import type { GetServerSideProps } from 'next';

const Index = () => {
  const { searchWord, setSearchWord } = useTickerStore(
    (state) => ({ searchWord: state.searchWord, setSearchWord: state.setSearchWord }),
    shallow
  );

  return (
    <>
      <div className="flex items-center justify-center gap-2 text-center sm:w-1/2 sm:m-auto">
        <DomesticExchangeSelectGroup />
        <i className="text-xs fa-solid fa-right-left" />
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: [queryKeys.UPBIT_MARKET, 'UPBIT_KRW'],
    queryFn: () => fetchUpbitMarket('KRW'),
  });
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.QUOTATION],
    queryFn: fetchQuotation,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
