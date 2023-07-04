import { useQuery } from '@tanstack/react-query';
import { getBithumbMarket } from '@/api/get-bithumb-market';
import { useTickerStore } from '@/store/use-ticker-store';
import { tickerKeys } from '@/utils/query-keys';

export const useBithumbMarketQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: tickerKeys.bithumbMarket,
    queryFn: getBithumbMarket,
    enabled: domesticExchange === 'BITHUMB',
  });
};
