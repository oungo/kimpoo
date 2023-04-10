import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useBithumbMarketListQuery } from '@/hooks/useBithumbMarketListQuery';
import { useBithumbTickers } from '@/hooks/useBithumbTickers';
import { useUpbitMarketListQuery } from '@/hooks/useUpbitMarketListQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import { useTickerStore } from '@/store/useTickerStore';
import TickerItem from './TickerItem';
import { useState } from 'react';

const TableTickerBody = () => {
  const [symbolList, setSymbolList] = useState<string[]>([]);

  const { data: upbitMarketList } = useUpbitMarketListQuery({
    onSuccess: (upbitMarket) => setSymbolList(upbitMarket.map(({ market }) => market)),
  });
  useBithumbMarketListQuery({
    onSuccess: (bithumbMarket) => setSymbolList(bithumbMarket.data.map(({ symbol }) => symbol)),
  });

  const tickerList = useTickerStore((state) => state.tickerList);

  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const overseasExchange = useTickerStore((state) => state.overseasExchange);

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
