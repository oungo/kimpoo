import { fetchUpbitMarket } from '@/api/fetchUpbitMarket';
import { DomesticExchange } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useQuery } from 'react-query';

export const useUpbitMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery({
    queryKey: ['upbitMarket', domesticExchange],
    queryFn: () =>
      fetchUpbitMarket(domesticExchange === DomesticExchange.UPBIT_KRW ? 'KRW' : 'BTC'),
    enabled:
      domesticExchange === DomesticExchange.UPBIT_KRW ||
      domesticExchange === DomesticExchange.UPBIT_BTC,
    suspense: true,
  });
};
