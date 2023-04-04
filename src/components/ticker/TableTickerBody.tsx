import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbMarketListQuery } from '@/hooks/useBithumbMarketListQuery';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useQuotationQuery } from '@/hooks/useQuotationQuery';
import { useUpbitMarketListQuery } from '@/hooks/useUpbitMarketListQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import { useTickerStore } from '@/store/useTickerStore';
import { formatPrice } from '@/utils/common';
import TickerItem from './TickerItem';
import { DomesticExchange } from './types';
import type { DomesticTicker } from './types';
import { useEffect, useState } from 'react';

const TableTickerBody = () => {
  const [symbolList, setSymbolList] = useState<string[]>([]);

  const { data: quotation } = useQuotationQuery();
  const { data: upbitMarketList } = useUpbitMarketListQuery();
  const { data: bithumbMarketList } = useBithumbMarketListQuery();

  const tickerList = useTickerStore((state) => state.tickerList);
  const setTickerList = useTickerStore((state) => state.setTickerList);
  const coinList = useTickerStore((state) => state.coinList);

  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const overseasExchange = useTickerStore((state) => state.overseasExchange);

  useEffect(() => {
    if (domesticExchange !== DomesticExchange.BITHUMB) return;

    const bithumbTickerList: Map<string, DomesticTicker> = new Map();

    for (const market of bithumbMarketList.data) {
      const ticker: DomesticTicker = {
        symbol: market.symbol,
        currentPrice: parseFloat(market.closing_price),
        formattedCurrentPrice:
          parseFloat(market.closing_price) < 1
            ? market.closing_price
            : formatPrice(market.closing_price, {
                maximumFractionDigits: parseFloat(market.closing_price) < 100 ? 2 : 0,
              }),
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
          koreanSymbol={
            upbitMarketList?.find(({ market }) => market === ticker.symbol)?.korean_name ||
            coinList.get(ticker.symbol)?.name
          }
          thumb={coinList.get(ticker.symbol)?.thumb}
          ticker={ticker}
          quotation={quotation[0].basePrice}
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
