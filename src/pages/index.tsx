import { fetchBithumbMarket } from '@/api/fetchBithumbMarket';
import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import ExchangeSelectGroup from '@/components/select/ExchangeSelectGroup';
import TableTicker from '@/components/ticker/TableTicker';
import type { Coin } from '@/components/ticker/types';
import { DomesticExchange } from '@/components/ticker/types';
import coinsData from '@/public/json/coins.json';
import { useTickerStore } from '@/store/useTickerStore';
import type { PageProps } from './_app';
import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';

interface Props {
  coins: [string, Coin][];
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
  const map = new Map<string, Coin>();

  coins.forEach((coin) => {
    if (coin.symbol === 'MIOTA') {
      map.set('IOTA', coin);
    }
    if (coin.symbol === 'FCT') {
      map.set('FCT2', coin);
    }
    if (!symbols.includes(coin.symbol) || map.get(coin.symbol)) return;
    map.set(coin.symbol, { id: coin.id, name: coin.name, symbol: coin.symbol, thumb: coin.thumb });
  });

  return map;
};

export const getServerSideProps: GetServerSideProps<PageProps & Props> = async () => {
  const queryClient = new QueryClient();
  const bithumbMarket = await queryClient.fetchQuery({
    queryKey: ['bithumbMarket'],
    queryFn: fetchBithumbMarket,
  });
  const upbitKRWMarket = await queryClient.fetchQuery({
    queryKey: ['upbitMarket', DomesticExchange.UPBIT_KRW],
    queryFn: () => fetchUpbitMarket('KRW'),
  });
  const upbitBTCMarket = await queryClient.fetchQuery({
    queryKey: ['upbitMarket', DomesticExchange.UPBIT_BTC],
    queryFn: () => fetchUpbitMarket('BTC'),
  });

  const coinsMap = convertCoinsDataToMap(coinsData.coins, [
    ...upbitKRWMarket.map(({ market }) => market),
    ...upbitBTCMarket.map(({ market }) => market),
    ...bithumbMarket.data.map(({ symbol }) => symbol),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      coins: [...coinsMap.entries()],
    },
  };
};

export default Index;
