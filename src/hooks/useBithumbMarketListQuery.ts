import { fetchBithumbMarket } from '@/api/fetchBithumbMarket';
import { DomesticExchangeList } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useQuery } from 'react-query';

export const useBithumbMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery(['bithumbMarket'], fetchBithumbMarket, {
    enabled: domesticExchange === DomesticExchangeList.BITHUMB,
  });
};
