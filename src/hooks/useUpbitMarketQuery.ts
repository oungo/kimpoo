import type { UpbitMarket } from '@/api/fetchUpbitMarket';
import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import type { UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';

export const useUpbitMarketQuery = (
  options: UseQueryOptions<UpbitMarket[], unknown, UpbitMarket[], string[]> = {}
) => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const setSymbolList = useTickerStore((state) => state.setSymbolList);

  return useQuery({
    ...options,
    queryKey: [queryKeys.UPBIT_MARKET, domesticExchange],
    queryFn: () =>
      fetchUpbitMarket(domesticExchange === DomesticExchange.UPBIT_KRW ? 'KRW' : 'BTC'),
    onSuccess: (upbitMarket) => setSymbolList(upbitMarket.map(({ market }) => market)),
    enabled:
      domesticExchange === DomesticExchange.UPBIT_KRW ||
      domesticExchange === DomesticExchange.UPBIT_BTC,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
