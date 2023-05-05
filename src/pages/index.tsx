import { useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { shallow } from 'zustand/shallow';
import { fetchQuotation } from '@/api/fetchQuotation';
import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import DomesticExchangeSelectGroup from '@/components/select/DomesticExchangeSelectGroup';
import OverseasExchangeSelectGroup from '@/components/select/OverseasExchangeSelectGroup';
import SearchInput from '@/components/shared/SearchInput';
import TableTicker from '@/components/ticker/TableTicker';
import type { Coin } from '@/components/ticker/types';
import coinsData from '@/public/json/coins.json';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import type { PageProps } from './_app';
import type { GetServerSideProps } from 'next';

interface Props {
  coins: [string, Coin][];
}

const Index = ({ coins }: Props) => {
  const setCoinList = useTickerStore((state) => state.setCoinList);
  const { searchWord, setSearchWord } = useTickerStore(
    (state) => ({ searchWord: state.searchWord, setSearchWord: state.setSearchWord }),
    shallow
  );

  useEffect(() => {
    setCoinList(new Map(coins));
  }, [coins, setCoinList]);

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

const convertCoinsDataToMap = (coins: (typeof coinsData)['coins'], symbols: string[]) => {
  const map = new Map<string, Coin>();

  coins.forEach((coin) => {
    if (coin.symbol === 'MIOTA') {
      map.set('IOTA', coin);
    }
    if (coin.symbol === 'FCT') {
      map.set('FCT2', coin);
    }
    if (!symbols.includes(coin.symbol) || map.get(coin.symbol)) return;
    map.set(coin.symbol, { symbol: coin.symbol, thumb: coin.thumb });
  });

  return map;
};

export const getServerSideProps: GetServerSideProps<PageProps & Props> = async () => {
  const queryClient = new QueryClient();
  const upbitKRWMarket = await queryClient.fetchQuery({
    queryKey: [queryKeys.UPBIT_MARKET, 'UPBIT_KRW'],
    queryFn: () => fetchUpbitMarket('KRW'),
  });
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.QUOTATION],
    queryFn: fetchQuotation,
  });

  const coinsMap = convertCoinsDataToMap(coinsData.coins, [...upbitKRWMarket.map(({ market }) => market)]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      coins: [...coinsMap.entries()],
    },
  };
};

export default Index;
