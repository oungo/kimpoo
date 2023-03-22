import { useEffect, useMemo, useState } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useTickerList } from './hooks/useTickerList';
import { useUpbitMarketListQuery } from './hooks/useUpbitMarketListQuery';
import { useUpbitTickers } from './hooks/useUpbitTickers';
import TickerItem from './TickerItem';

interface Props {
  quotation?: number;
}

const TableTickerBody = ({ quotation }: Props) => {
  const [symbolMap, setSymbolMap] = useState<Map<string, string>>(new Map());

  const tickerList = useTickerList();

  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const loadingSocketChange = useTickerStore((state) => state.loadingSocketChange);

  const { data: upbitMarketList } = useUpbitMarketListQuery();

  useEffect(() => {
    const map = new Map();
    upbitMarketList
      .filter((marketData) => marketData.market.startsWith('KRW'))
      .forEach((marketData) => {
        map.set(marketData.market.replace('KRW-', ''), marketData.korean_name);
      });

    setSymbolMap(map);
  }, [upbitMarketList]);

  const memoizedSymbolKeys = useMemo(() => Array.from(symbolMap.keys()), [symbolMap]);

  useUpbitTickers(domesticExchange);
  useBinanceTickers(memoizedSymbolKeys);

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
          koreanSymbolName={symbolMap.get(ticker.symbol)}
          ticker={ticker}
          quotation={quotation}
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
