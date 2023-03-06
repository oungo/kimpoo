import { useTickerStore } from 'store/useTickerStore';
import { useBinanceTickers } from './hooks/useBinanceTickers';
import { useUpbitTickers } from './hooks/useUpbitTickers';
import TickerItem from './TickerItem';

const TableTicker = () => {
  const ticker = useTickerStore((state) => state.tickerList);

  useUpbitTickers();
  useBinanceTickers();

  return (
    <table>
      <caption>{ticker.size}</caption>
      <thead>
        <tr>
          <th>이름</th>
          <th>현재가</th>
          <th>김프</th>
          <th>전일 대비 값</th>
          <th>누적 거래 대금</th>
          <th>유의 종목 여부</th>
          <th>거래액(일)</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(ticker.values()).map((ticker) => (
          <TickerItem key={ticker.cd} ticker={ticker} />
        ))}
      </tbody>
    </table>
  );
};

export default TableTicker;
