import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useQuery } from 'react-query';

export const useUpbitMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery(['upbitMarket'], () => fetchUpbitMarket('KRW'), {
    enabled: domesticExchange === DomesticExchange.UPBIT,
  });
};
