import { useQuery } from '@tanstack/react-query';
import { fetchBithumb } from '@/api/fetchBithumbMarket';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';

export const useBithumbMarketQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.BITHUMB_MARKET],
    queryFn: fetchBithumb,
    enabled: domesticExchange === 'BITHUMB',
    useErrorBoundary: true,
  });
};
