import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbMarketQuery } from '@/hooks/useBithumbMarketQuery';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useSortedTickerList } from '@/hooks/useSortedTickerList';
import { useUpbitMarketQuery } from '@/hooks/useUpbitMarketQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import { useTickerStore } from '@/store/useTickerStore';
import { createUpbitSymbolIconUrl } from '@/utils/common';
import TickerItem from './TickerItem';
import { useMemo } from 'react';

const TableTickerBody = () => {
  const coinList = useTickerStore((state) => state.coinList);
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const tickerList = useSortedTickerList();

  const { data: upbitMarket } = useUpbitMarketQuery();
  const { data: bithumbMarket } = useBithumbMarketQuery();

  const symbolList = useMemo(() => {
    return domesticExchange === 'BITHUMB'
      ? bithumbMarket?.data.map(({ symbol }) => symbol)
      : upbitMarket?.map(({ market }) => market);
  }, [upbitMarket, bithumbMarket, domesticExchange]);

  useUpbitTickers(symbolList);
  useBithumbTickers(symbolList);
  useBinanceTickers(symbolList);

  return (
    <tbody>
      {tickerList.map((ticker) => (
        <TickerItem
          key={ticker.symbol}
          ticker={ticker}
          thumb={
            domesticExchange.startsWith('UPBIT')
              ? createUpbitSymbolIconUrl(ticker.symbol)
              : coinList.get(ticker.symbol)?.thumb
          }
          symbolName={
            domesticExchange === 'BITHUMB'
              ? coinList.get(ticker.symbol)?.name
              : upbitMarket?.find(({ market }) => market === ticker.symbol)?.korean_name
          }
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
