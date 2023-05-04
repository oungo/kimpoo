import { useMemo } from 'react';
import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbMarketPriceQuery } from '@/hooks/useBithumbMarketPriceQuery';
import { useBithumbMarketQuery } from '@/hooks/useBithumbMarketQuery';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useSortedTickerList } from '@/hooks/useSortedTickerList';
import { useUpbitMarketQuery } from '@/hooks/useUpbitMarketQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import { useTickerStore } from '@/store/useTickerStore';
import { createUpbitSymbolIconUrl } from '@/utils/common';
import TickerItem from './TickerItem';

const TableTickerBody = () => {
  const coinList = useTickerStore((state) => state.coinList);
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const tickerList = useSortedTickerList();

  const { data: upbitMarket } = useUpbitMarketQuery();
  const { data: bithumbMarketPrice } = useBithumbMarketPriceQuery();
  const { data: bithumbMarket2 } = useBithumbMarketQuery();

  const symbolList = useMemo(() => {
    return domesticExchange === 'BITHUMB'
      ? bithumbMarketPrice?.data.map(({ symbol }) => symbol)
      : upbitMarket?.map(({ market }) => market);
  }, [upbitMarket, bithumbMarketPrice, domesticExchange]);

  useUpbitTickers(symbolList);
  useBithumbTickers(symbolList);
  useBinanceTickers(symbolList);

  return (
    <tbody>
      {tickerList.length < 1 ? (
        <Loading />
      ) : (
        tickerList.map((ticker) => (
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
                ? bithumbMarket2?.find(({ coinSymbol }) => coinSymbol === ticker.symbol)?.coinName
                : upbitMarket?.find(({ market }) => market === ticker.symbol)?.korean_name
            }
          />
        ))
      )}
    </tbody>
  );
};

const Loading = () => (
  <tr className="relative">
    <td className="absolute mt-5 text-center -translate-x-1/2 left-1/2">
      <i className="text-5xl fa-solid fa-circle-notch fa-spin sm:text-7xl" />
    </td>
  </tr>
);

export default TableTickerBody;
