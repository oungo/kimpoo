import { useTickerStore } from 'store/useTickerStore';
import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useBithumbTickers } from './hooks/useBithumbTickers';
import { useTickerList } from './hooks/useTickerList';
import { useUpbitTickers } from './hooks/useUpbitTickers';
import TickerItem from './TickerItem';

interface Props {
  quotation?: number;
}

const TableTickerBody = ({ quotation }: Props) => {
  const tickerList = useTickerList();
  const domesticExchange = useTickerStore((state) => state.domesticExchange);
  const loadingSocketChange = useTickerStore((state) => state.loadingSocketChange);

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
