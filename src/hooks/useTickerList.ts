import { useTickerStore } from '@/store/useTickerStore';
import { useSortedTickerList } from './useSortedTickerList';

export const useTickerList = () => {
  const sortedTickerList = useSortedTickerList();
  const searchWord = useTickerStore((state) => state.searchWord);

  if (!searchWord) return sortedTickerList;

  const tickerList = sortedTickerList.filter((ticker) => {
    return ticker.symbol.toLowerCase().includes(searchWord.toLowerCase()) || ticker.symbolName.includes(searchWord);
  });

  return tickerList;
};
