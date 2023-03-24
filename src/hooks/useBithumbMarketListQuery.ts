import { fetchBithumbMarket } from 'api/fetchBithumbMarket';
import { useQuery } from 'react-query';
import { useTickerStore } from 'store/useTickerStore';
import { DomesticExchangeList } from '../components/ticker/types';

export const useBithumbMarketListQuery = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);

  return useQuery(['bithumb'], fetchBithumbMarket, {
    enabled: domesticExchange === DomesticExchangeList.BITHUMB,
  });
};
