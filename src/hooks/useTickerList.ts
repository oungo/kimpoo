import { useTickerStore } from '@/store/useTickerStore';

export const useTickerList = () => {
  const ticker = useTickerStore((state) => state.tickerList);
  return Array.from(ticker.values()).filter((ticker) => ticker);
};
