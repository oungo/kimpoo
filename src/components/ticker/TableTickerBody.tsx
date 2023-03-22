import { useMemo } from 'react';
import { useTickerStore } from 'store/useTickerStore';
import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useTickerList } from './hooks/useTickerList';
import { useUpbitTickers } from './hooks/useUpbitTickers';
import TickerItem from './TickerItem';

interface Props {
  quotation?: number;
}

const TableTickerBody = ({ quotation }: Props) => {
  const tickerList = useTickerList();

  const coinList = useTickerStore((state) => state.coinList);
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const loadingSocketChange = useTickerStore((state) => state.loadingSocketChange);

  const memoizedSymbolKeys = useMemo(() => Array.from(coinList.keys()), [coinList]);

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
          koreanSymbolName={coinList.get(ticker.symbol).name}
          thumb={coinList.get(ticker.symbol).thumb}
          ticker={ticker}
          quotation={quotation}
        />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
