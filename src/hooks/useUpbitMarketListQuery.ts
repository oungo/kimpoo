import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import { DomesticExchangeList } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useQuery } from 'react-query';

export const useUpbitMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery(['upbitMarket'], () => fetchUpbitMarket('KRW'), {
    enabled: domesticExchange === DomesticExchangeList.UPBIT,
  });
};
