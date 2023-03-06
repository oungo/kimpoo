import { useTickerStore } from 'store/useTickerStore';
import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useUpbitTickers } from './hooks/useUpbitTickers';
import TickerItem from './TickerItem';

interface Props {
  quotation?: number;
}

const TableTickerBody = ({ quotation }: Props) => {
  const ticker = useTickerStore((state) => state.tickerList);

  useUpbitTickers();
  useBinanceTickers();

  return (
    <tbody>
      {Array.from(ticker.entries()).map(([code, ticker]) => (
        <TickerItem key={code} code={code} ticker={ticker} quotation={quotation} />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
