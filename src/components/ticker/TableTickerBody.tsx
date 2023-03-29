import { useBinanceTickers } from '@/hooks/useBinanceTickers';
import { useQuotationQuery } from '@/hooks/useQuotationQuery';
import { useTickerList } from '@/hooks/useTickerList';
import { useUpbitMarketListQuery } from '@/hooks/useUpbitMarketListQuery';
import { useUpbitTickers } from '@/hooks/useUpbitTickers';
import { useTickerStore } from '@/store/useTickerStore';
import TickerItem from './TickerItem';
import { useMemo } from 'react';

const TableTickerBody = () => {
  const { data: quotation } = useQuotationQuery();
  const { data: upbitMarketList } = useUpbitMarketListQuery();

  const tickerList = useTickerList();
  const coinList = useTickerStore((state) => state.coinList);
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const loadingSocketChange = useTickerStore((state) => state.loadingSocketChange);

  const symbolList = useMemo(() => upbitMarketList.map(({ market }) => market), [upbitMarketList]);

  useUpbitTickers(domesticExchange, symbolList);
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
          koreanSymbol={upbitMarketList.find(({ market }) => market === ticker.symbol).korean_name}
          // koreanSymbolName={coinList.get(ticker.symbol).name}
          thumb={coinList.get(ticker.symbol).thumb}
          ticker={ticker}
          quotation={quotation[0].basePrice}
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
