import ExchangeSelectGroup from '@/components/select/ExchangeSelectGroup';
import TableTicker from '@/components/ticker/TableTicker';
import { fetchBithumbMarket } from 'api/fetchBithumbMarket';
import { fetchUpbitMarket } from 'api/fetchUpbitMarket';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { PageProps } from './_app';
import coinsData from '../../public/json/coins.json';
import { Coins } from '@/components/ticker/types';

interface Props {
  coins: [string, Coins][];
}

const Index = ({ coins }: Props) => {
  const coinList = new Map(coins);

  return (
    <div className="p-3">
      <ExchangeSelectGroup />
      <TableTicker />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps & Props> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['bithumbMarket'], fetchBithumbMarket);
  const upbitMarket = await queryClient.fetchQuery(['upbitMarket'], fetchUpbitMarket);
  const symbols = upbitMarket
    .filter((data) => data.market.startsWith('KRW'))
    .map((data) => data.market.replace('KRW-', ''));

  const map = new Map();
  coinsData.coins.forEach((coin) => {
    if (coin.symbol === 'MIOTA') {
      map.set('IOTA', coin);
    }
    if (coin.symbol === 'FCT') {
      map.set('FCT2', coin);
    }
    if (!symbols.includes(coin.symbol) || map.get(coin.symbol)) return;
    map.set(coin.symbol, coin);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      coins: Array.from(map.entries()),
    },
  };
};

export default Index;
