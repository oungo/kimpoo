import { useQuery } from '@tanstack/react-query';
import { fetchBithumbMarketPrice } from '@/api/fetchBithumbMarketPrice';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';

export const useBithumbMarketPriceQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.BITHUMB_MARKET_PRICE],
    queryFn: fetchBithumbMarketPrice,
    enabled: domesticExchange === 'BITHUMB',
  });
};
