import { useMemo } from 'react';
import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbMarketQuery } from '@/hooks/useBithumbMarketQuery';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useTickerList } from '@/hooks/useTickerList';
import { useUpbitMarketQuery } from '@/hooks/useUpbitMarketQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import coinsData from '@/public/json/coins.json';
import { useTickerStore } from '@/store/useTickerStore';
import { createUpbitSymbolIconUrl } from '@/utils/common';
import TickerItem from './TickerItem';

const TableTickerBody = () => {
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const isBithumb = domesticExchange === 'BITHUMB';
  const tickerList = useTickerList();

  const { data: upbitMarket } = useUpbitMarketQuery();
  const { data: bithumbMarket } = useBithumbMarketQuery();

  const symbolList = useMemo(() => {
    return isBithumb ? bithumbMarket?.map(({ coinSymbol }) => coinSymbol) : upbitMarket?.map(({ market }) => market);
  }, [upbitMarket, bithumbMarket, isBithumb]);

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
            isBithumb
              ? coinsData.coins.find((coin) => coin.symbol === ticker.symbol)?.thumb
              : createUpbitSymbolIconUrl(ticker.symbol)
          }
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
