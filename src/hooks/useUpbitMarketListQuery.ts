import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useQuery } from 'react-query';

export const useUpbitMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery(
    ['upbitMarket', domesticExchange],
    () => fetchUpbitMarket(domesticExchange === DomesticExchange.UPBIT_KRW ? 'KRW' : 'BTC'),
    {
      cacheTime: 1000,
      enabled:
        domesticExchange === DomesticExchange.UPBIT_KRW ||
        domesticExchange === DomesticExchange.UPBIT_BTC,
    }
  );
};
