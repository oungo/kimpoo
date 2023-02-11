import { useTickers } from './hooks/useTickers';
import TickerItem from './TickerItem';

const TableTicker = () => {
  const tickers = useTickers();

  return (
    <table>
      <caption>{tickers.size}</caption>
      <thead>
        <tr>
          <th>이름</th>
          <th>현재가</th>
          <th>전일 대비 값</th>
          <th>누적 거래 대금</th>
          <th>유의 종목 여부</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(tickers.values()).map((ticker) => (
          <TickerItem key={ticker.cd} ticker={ticker} />
        ))}
      </tbody>
    </table>
  );
};

export default TableTicker;
