import { useEffect } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useBithumbMarketListQuery } from './hooks/useBithumbMarketListQuery';
import { useBithumbTickers } from './hooks/useBithumbTickers';
import { useTickerList } from './hooks/useTickerList';
import { useUpbitTickers } from './hooks/useUpbitTickers';
import TickerItem from './TickerItem';
import { DomesticExchangeList, DomesticTicker } from './types';

interface Props {
  quotation?: number;
}

const TableTickerBody = ({ quotation }: Props) => {
  const tickerList = useTickerList();

  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const loadingSocketChange = useTickerStore((state) => state.loadingSocketChange);
  const resetTickerList = useTickerStore((state) => state.resetTickerList);

  const { data: bithumbMarketList } = useBithumbMarketListQuery();

  useEffect(() => {
    if (!bithumbMarketList || domesticExchange !== DomesticExchangeList.BITHUMB) return;

    const map = new Map();
    for (const symbol in bithumbMarketList.data) {
      if (symbol === 'date') continue;

      const { closing_price, prev_closing_price, acc_trade_value_24H } =
        bithumbMarketList.data[symbol];

      const newValue: DomesticTicker = {
        symbol,
        currentPrice: Number(closing_price),
        changeRate: (Number(closing_price) / Number(prev_closing_price)) * 100 - 100,
        transactionAmount: Number(acc_trade_value_24H),
      };

      map.set(symbol, newValue);
    }

    resetTickerList(map);
  }, [domesticExchange, bithumbMarketList, resetTickerList]);

  useBithumbTickers(domesticExchange);
  useUpbitTickers(domesticExchange);
  useBinanceTickers();

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
        <TickerItem key={ticker.symbol} ticker={ticker} quotation={quotation} />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
