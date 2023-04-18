import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import { useTickerStore } from '@/store/useTickerStore';
import * as queryKeys from '@/utils/queryKeys';
import { useQuery } from 'react-query';

export const useUpbitMarketQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const setSymbolList = useTickerStore((state) => state.setSymbolList);

  return useQuery({
    queryKey: [queryKeys.UPBIT_MARKET, domesticExchange],
    queryFn: () => fetchUpbitMarket(domesticExchange === 'UPBIT_KRW' ? 'KRW' : 'BTC'),
    onSuccess: (upbitMarket) => setSymbolList(upbitMarket.map(({ market }) => market)),
    enabled: domesticExchange === 'UPBIT_KRW' || domesticExchange === 'UPBIT_BTC',
    refetchOnWindowFocus: false,
    retry: false,
  });
};
