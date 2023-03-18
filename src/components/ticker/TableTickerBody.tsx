import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useTickerList } from './hooks/useTickerList';
import { useUpbitTickers } from './hooks/useUpbitTickers';
import TickerItem from './TickerItem';

interface Props {
  quotation?: number;
}

const TableTickerBody = ({ quotation }: Props) => {
  const tickerList = useTickerList();

  // useBitthumbTickers();
  useUpbitTickers();
  useBinanceTickers();

  return (
    <tbody>
      {tickerList.map((ticker) => (
        <TickerItem key={ticker.symbol} ticker={ticker} quotation={quotation} />
      ))}
    </tbody>
  );
};

export default TableTickerBody;
