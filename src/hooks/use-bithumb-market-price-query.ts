import { useQuery } from '@tanstack/react-query';
import { getBithumbMarketPrice } from '@/api/get-bithumb-market-price';
import { useTickerStore } from '@/store/use-ticker-store';
import * as queryKeys from '@/utils/query-keys';

export const useBithumbMarketPriceQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: [queryKeys.BITHUMB_MARKET_PRICE],
    queryFn: getBithumbMarketPrice,
    enabled: domesticExchange === 'BITHUMB',
  });
};
