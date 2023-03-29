import { fetchBithumbMarket } from '@/api/fetchBithumbMarket';
import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import ExchangeSelectGroup from '@/components/select/ExchangeSelectGroup';
import TableTicker from '@/components/ticker/TableTicker';
import type { Coins } from '@/components/ticker/types';
import coinsData from '@/public/json/coins.json';
import { useTickerStore } from '@/store/useTickerStore';
import type { PageProps } from './_app';
import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';

interface Props {
  coins: [string, Coins][];
}

const Index = ({ coins }: Props) => {
  const setCoinList = useTickerStore((state) => state.setCoinList);

  useEffect(() => {
    setCoinList(new Map(coins));
  }, [coins, setCoinList]);

  return (
    <main className="p-2">
      <ExchangeSelectGroup />
      <TableTicker />
    </main>
  );
};

const convertCoinsDataToMap = (coins: (typeof coinsData)['coins'], symbols: string[]) => {
  const map = new Map();
  coins.forEach((coin) => {
    if (coin.symbol === 'MIOTA') {
      map.set('IOTA', coin);
    }
    if (coin.symbol === 'FCT') {
      map.set('FCT2', coin);
    }
    if (!symbols.includes(coin.symbol) || map.get(coin.symbol)) return;
    map.set(coin.symbol, coin);
  });
  return map;
};

export const getServerSideProps: GetServerSideProps<PageProps & Props> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['bithumbMarket'], fetchBithumbMarket);
  const upbitMarket = await queryClient.fetchQuery(['upbitMarket'], () => fetchUpbitMarket('KRW'));

  const coinsMap = convertCoinsDataToMap(
    coinsData.coins,
    upbitMarket.map(({ market }) => market)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      coins: Array.from(coinsMap.entries()),
    },
  };
};

export default Index;
