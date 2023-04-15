import type { Ticker } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useEffect, useState } from 'react';

export const useSortedTickerList = () => {
  const [sortedTickerList, setSortedTickerList] = useState<Ticker[]>([]);

  const tickerMap = useTickerStore((state) => state.tickerMap);
  const { type, desc } = useTickerStore((state) => state.sortOption);

  useEffect(() => {
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

    setSortedTickerList(tickerList);
  }, [desc, type, tickerMap]);

  return sortedTickerList;
};
