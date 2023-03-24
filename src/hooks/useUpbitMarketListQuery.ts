import { fetchUpbitMarket } from 'api/fetchUpbitMarket';
import { useQuery } from 'react-query';
import { useTickerStore } from 'store/useTickerStore';
import { DomesticExchangeList } from '../components/ticker/types';

export const useUpbitMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery(['upbitMarket'], () => fetchUpbitMarket('KRW'), {
    enabled: domesticExchange === DomesticExchangeList.UPBIT,
  });
};
