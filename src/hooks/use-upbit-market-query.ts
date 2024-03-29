import { useQuery } from '@tanstack/react-query';
import { getUpbitMarket } from '@/api/get-upbit-market';
import { useTickerStore } from '@/store/use-ticker-store';
import { tickerKeys } from '@/utils/query-keys';

export const useUpbitMarketQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: tickerKeys.upbitMarket(domesticExchange),
    queryFn: () => getUpbitMarket(domesticExchange === 'UPBIT_KRW' ? 'KRW' : 'BTC'),
    enabled: domesticExchange === 'UPBIT_KRW' || domesticExchange === 'UPBIT_BTC',
  });
};
