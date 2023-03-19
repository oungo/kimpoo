import { useTickerStore } from 'store/useTickerStore';
import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useBitthumbTickers } from './hooks/useBitthumbTickers';
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

  useBitthumbTickers(domesticExchange);
  useUpbitTickers(domesticExchange);
  useBinanceTickers();

  if (loadingSocketChange) {
    return (
      <tbody>
        <tr>
          <td>123</td>
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
