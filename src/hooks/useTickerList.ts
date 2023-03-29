import { useTickerStore } from '@/store/useTickerStore';

export const useTickerList = () => {
  const ticker = useTickerStore((state) => state.tickerList);
  return [...ticker.values()].filter((ticker) => ticker);
};
