import { fetchBithumbMarket } from '@/api/fetchBithumbMarket';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import { useQuery } from 'react-query';

export const useBithumbMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.BITHUMB_MARKET],
    queryFn: fetchBithumbMarket,
    enabled: domesticExchange === DomesticExchange.BITHUMB,
    refetchOnWindowFocus: false,
  });
};
