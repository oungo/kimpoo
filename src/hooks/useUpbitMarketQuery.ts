import { useQuery } from 'react-query';
import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';

export const useUpbitMarketQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.UPBIT_MARKET, domesticExchange],
    queryFn: () => fetchUpbitMarket(domesticExchange === 'UPBIT_KRW' ? 'KRW' : 'BTC'),
    enabled: domesticExchange === 'UPBIT_KRW' || domesticExchange === 'UPBIT_BTC',
    refetchOnWindowFocus: false,
    retry: false,
  });
};
