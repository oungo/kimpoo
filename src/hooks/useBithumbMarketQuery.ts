import { fetchBithumbMarket } from '@/api/fetchBithumbMarket';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import { useQuery } from 'react-query';

export const useBithumbMarketQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.BITHUMB_MARKET],
    queryFn: fetchBithumbMarket,
    enabled: domesticExchange === 'BITHUMB',
    refetchOnWindowFocus: false,
    retry: false,
  });
};
