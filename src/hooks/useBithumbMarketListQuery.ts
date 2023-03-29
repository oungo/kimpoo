import { fetchBithumbMarket } from '@/api/fetchBithumbMarket';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useQuery } from 'react-query';

export const useBithumbMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery(['bithumbMarket'], fetchBithumbMarket, {
    enabled: domesticExchange === DomesticExchange.BITHUMB,
  });
};
