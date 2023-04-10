import type { BithumbMarket } from '@/api/fetchBithumbMarket';
import { fetchBithumbMarket } from '@/api/fetchBithumbMarket';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import type { UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';

export const useBithumbMarketListQuery = (
  options: UseQueryOptions<BithumbMarket, unknown, BithumbMarket, string[]> = {}
) => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    ...options,
    queryKey: [queryKeys.BITHUMB_MARKET],
    queryFn: fetchBithumbMarket,
    enabled: domesticExchange === DomesticExchange.BITHUMB,
    refetchOnWindowFocus: false,
  });
};
