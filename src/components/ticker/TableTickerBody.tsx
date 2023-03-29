import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbMarketListQuery } from '@/hooks/useBithumbMarketListQuery';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useQuotationQuery } from '@/hooks/useQuotationQuery';
import { useTickerList } from '@/hooks/useTickerList';
import { useUpbitMarketListQuery } from '@/hooks/useUpbitMarketListQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import { useTickerStore } from '@/store/useTickerStore';
import TickerItem from './TickerItem';
import { DomesticExchangeList } from './types';
import type { DomesticTicker } from './types';
import { useEffect, useState } from 'react';

const TableTickerBody = () => {
  const [symbolList, setSymbolList] = useState<string[]>([]);

  const { data: quotation } = useQuotationQuery();
  const { data: upbitMarketList } = useUpbitMarketListQuery();
  const { data: bithumbMarketList } = useBithumbMarketListQuery();

  const tickerList = useTickerList();
  const setTickerList = useTickerStore((state) => state.setTickerList);
  const coinList = useTickerStore((state) => state.coinList);

  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const loadingSocketChange = useTickerStore((state) => state.loadingSocketChange);

  useEffect(() => {
    if (domesticExchange !== DomesticExchangeList.BITHUMB) return;

    const bithumbTickerList: Map<string, DomesticTicker> = new Map();

    for (const market of bithumbMarketList.data) {
      const ticker = {
        symbol: market.symbol,
        currentPrice: Number(market.closing_price),
        changeRate: (Number(market.closing_price) / Number(market.prev_closing_price)) * 100 - 100,
        transactionAmount: Number(market.acc_trade_value_24H),
      };
      bithumbTickerList.set(market.symbol, ticker);
    }

    setTickerList(bithumbTickerList);
  }, [bithumbMarketList, domesticExchange, setTickerList]);

  useEffect(() => {
    switch (domesticExchange) {
      case DomesticExchangeList.UPBIT:
        setSymbolList(upbitMarketList.map(({ market }) => market));
        break;
      case DomesticExchangeList.BITHUMB:
        setSymbolList(bithumbMarketList.data.map(({ symbol }) => symbol));
        break;
    }
  }, [domesticExchange, upbitMarketList, bithumbMarketList]);

  useUpbitTickers(domesticExchange, symbolList);
  useBithumbTickers(domesticExchange, symbolList);

  useBinanceTickers(symbolList);

  if (loadingSocketChange) {
    return (
      <tbody>
        <tr>
          <td>loading</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {tickerList.map((ticker) => (
        <TickerItem
          key={ticker.symbol}
          koreanSymbol={
            upbitMarketList.find(({ market }) => market === ticker.symbol)?.korean_name ||
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
