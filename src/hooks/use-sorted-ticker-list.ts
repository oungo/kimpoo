import { useTickerStore } from '@/store/use-ticker-store';

export const useSortedTickerList = () => {
  const tickerMap = useTickerStore((state) => state.tickerMap);
  const { type, desc } = useTickerStore((state) => state.sortOption);
  const favoriteSymbols = useTickerStore((state) => state.favoriteSymbols);

  if (!tickerMap) return;

  const tickerList = [...tickerMap.values()];
  switch (type) {
    case 'symbol':
      tickerList.sort((a, b) => {
        if (desc) return a.symbol > b.symbol ? -1 : b.symbol > a.symbol ? 1 : 0;
        return a.symbol < b.symbol ? -1 : b.symbol > a.symbol ? 1 : 0;
      });
      break;
    case 'premium':
      tickerList.sort((a, b) => {
        if (!a.premium) return 1;
        if (!b.premium) return -1;
        return desc ? b.premium - a.premium : a.premium - b.premium;
      });
      break;
    default:
      tickerList.sort((a, b) => (desc ? b[type] - a[type] : a[type] - b[type]));
  }

  const favoriteTickerList = tickerList.filter((ticker) => favoriteSymbols.includes(ticker.symbol));
  const tickerListWithoutFavorite = tickerList.filter((ticker) => !favoriteSymbols.includes(ticker.symbol));

  return [...favoriteTickerList, ...tickerListWithoutFavorite];
};
