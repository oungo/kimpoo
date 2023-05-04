import { useQuery } from 'react-query';
import { fetchBithumb } from '@/api/fetchBithumb';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';

export const useBithumbMarketQuery2 = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.BITHUMB_MARKET2],
    queryFn: fetchBithumb,
    enabled: domesticExchange === 'BITHUMB',
    refetchOnWindowFocus: false,
    retry: false,
  });
};
