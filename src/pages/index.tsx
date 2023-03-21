import ExchangeSelectGroup from '@/components/select/ExchangeSelectGroup';
import TableTicker from '@/components/ticker/TableTicker';
import { fetchBithumbMarket } from 'api/fetchBithumbMarket';
import { fetchCoingeckoMarket } from 'api/fetchCoingeckoMarket';
import { fetchUpbitMarket } from 'api/fetchUpbitMarket';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { PageProps } from './_app';

const index = () => {
  return (
    <div className="p-3">
      <ExchangeSelectGroup />
      <TableTicker />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['upbitMarket'], fetchUpbitMarket);
  await queryClient.prefetchQuery(['bithumbMarket'], fetchBithumbMarket);
  await queryClient.prefetchQuery(['coingeckoMarket'], fetchCoingeckoMarket);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default index;
