import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbMarketListQuery } from '@/hooks/useBithumbMarketListQuery';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useUpbitMarketListQuery } from '@/hooks/useUpbitMarketListQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import { useTickerStore } from '@/store/useTickerStore';
import { formatCurrentPrice, formatPrice } from '@/utils/common';
import TickerItem from './TickerItem';
import { DomesticExchange } from './types';
import type { DomesticTicker } from './types';
import { useEffect, useState } from 'react';

const TableTickerBody = () => {
  const [symbolList, setSymbolList] = useState<string[]>([]);

  const { data: upbitMarketList } = useUpbitMarketListQuery();
  const { data: bithumbMarketList } = useBithumbMarketListQuery();

  const tickerList = useTickerStore((state) => state.tickerList);
  const setTickerList = useTickerStore((state) => state.setTickerList);

  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const overseasExchange = useTickerStore((state) => state.overseasExchange);

  useEffect(() => {
    if (domesticExchange !== DomesticExchange.BITHUMB) return;

    const bithumbTickerList: Map<string, DomesticTicker> = new Map();

    for (const market of bithumbMarketList.data) {
      const ticker: DomesticTicker = {
        symbol: market.symbol,
        currentPrice: parseFloat(market.closing_price),
        formattedCurrentPrice: formatCurrentPrice(parseFloat(market.closing_price)),
        changeRate: formatPrice(
          (
            (parseFloat(market.closing_price) / parseFloat(market.prev_closing_price) - 1) *
            100
          ).toFixed(2),
          { signDisplay: 'exceptZero' }
        ),
        transactionAmount: parseFloat(market.acc_trade_value_24H),
        formattedTransactionAmount: formatPrice(market.acc_trade_value_24H, {
          notation: 'compact',
        }),
      };
      bithumbTickerList.set(market.symbol, ticker);
    }

    setTickerList(bithumbTickerList);
  }, [bithumbMarketList, domesticExchange, setTickerList]);

  useEffect(() => {
    switch (domesticExchange) {
      case DomesticExchange.UPBIT_KRW:
      case DomesticExchange.UPBIT_BTC:
        setSymbolList(upbitMarketList.map(({ market }) => market));
        break;
      case DomesticExchange.BITHUMB:
        setSymbolList(bithumbMarketList.data.map(({ symbol }) => symbol));
        break;
    }
  }, [domesticExchange, upbitMarketList, bithumbMarketList]);

  useUpbitTickers(domesticExchange, symbolList);
  useBithumbTickers(domesticExchange, symbolList);
  useBinanceTickers(overseasExchange, symbolList);

  return (
    <tbody>
      {[...tickerList.values()].map((ticker) => (
        <TickerItem
          key={ticker.symbol}
          ticker={ticker}
          koreanSymbol={
            upbitMarketList?.find(({ market }) => market === ticker.symbol)?.korean_name
          }
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
