import type { Ticker } from '@/components/ticker/types';
import { useTickerStore } from '@/store/useTickerStore';
import { useEffect, useState } from 'react';

export const useSortedTickerList = () => {
  const [sortedTickerList, setSortedTickerList] = useState<Ticker[]>([]);

  const tickerList = useTickerStore((state) => state.tickerList);
  const { type, desc } = useTickerStore((state) => state.sortOption);

  useEffect(() => {
    const newTickerList = [...tickerList.values()];

    switch (type) {
      case 'symbol':
        newTickerList.sort((a, b) => {
          if (desc) return a.symbol > b.symbol ? -1 : b.symbol > a.symbol ? 1 : 0;
          return a.symbol < b.symbol ? -1 : b.symbol > a.symbol ? 1 : 0;
        });
        break;
      case 'premium':
        newTickerList.sort((a, b) => {
          if (!b.oCurrentPrice || !b.premium) return -1;
          if (!a.premium) return 1;
          if (desc) return b.premium - a.premium;
          return a.premium - b.premium;
        });
        break;
      case 'changeRate':
      case 'currentPrice':
      case 'transactionAmount':
        newTickerList.sort((a, b) => {
          if (desc) return b[type] - a[type];
          return a[type] - b[type];
        });
    }

    setSortedTickerList(newTickerList);
  }, [desc, type, tickerList]);

  return sortedTickerList;
};
