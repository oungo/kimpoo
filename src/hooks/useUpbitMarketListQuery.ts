import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import { useQuery } from 'react-query';

export const useUpbitMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.UPBIT_MARKET, domesticExchange],
    queryFn: () =>
      fetchUpbitMarket(domesticExchange === DomesticExchange.UPBIT_KRW ? 'KRW' : 'BTC'),
    enabled:
      domesticExchange === DomesticExchange.UPBIT_KRW ||
      domesticExchange === DomesticExchange.UPBIT_BTC,
    refetchOnWindowFocus: false,
  });
};
