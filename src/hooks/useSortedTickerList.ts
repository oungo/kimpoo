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
          if (!b.oCurrentPrice || isNaN(parseFloat(b.premium))) return -1;
          if (desc) return parseFloat(b.premium) - parseFloat(a.premium);
          return parseFloat(a.premium) - parseFloat(b.premium);
        });
        break;
      case 'changeRate':
        newTickerList.sort((a, b) => {
          if (desc) return parseFloat(b[type]) - parseFloat(a[type]);
          return parseFloat(a[type]) - parseFloat(b[type]);
        });
        break;
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
