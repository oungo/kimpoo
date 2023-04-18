import { fetchBithumbMarket } from '@/api/fetchBithumbMarket';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import { useQuery } from 'react-query';

export const useBithumbMarketQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const setSymbolList = useTickerStore((state) => state.setSymbolList);

  return useQuery({
    queryKey: [queryKeys.BITHUMB_MARKET],
    queryFn: fetchBithumbMarket,
    onSuccess: ({ data }) => setSymbolList(data.map(({ symbol }) => symbol)),
    enabled: domesticExchange === 'BITHUMB',
    refetchOnWindowFocus: false,
    retry: false,
  });
};
