import { useTickerStore } from 'store/useTickerStore';
import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useUpbitTickers } from './hooks/useUpbitTickers';
import TickerItem from './TickerItem';

const TableTickerBody = () => {
  const ticker = useTickerStore((state) => state.tickerList);
  useUpbitTickers();
  useBinanceTickers();

  return (
    <tbody>
      {Array.from(ticker.entries()).map(([code, ticker]) => (
        <TickerItem key={code} code={code} ticker={ticker} />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
