import { useQuery } from 'react-query';
import { fetchBithumbMarketPrice } from '@/api/fetchBithumbMarket';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';

export const useBithumbMarketPriceQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.BITHUMB_MARKET_PRICE],
    queryFn: fetchBithumbMarketPrice,
    enabled: domesticExchange === 'BITHUMB',
    refetchOnWindowFocus: false,
    retry: false,
  });
};
