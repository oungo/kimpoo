import { useSortTicker } from '@/hooks/useSortTicker';
import TableTickerBody from './TableTickerBody';

const TableTicker = () => {
  const { sortTicker } = useSortTicker();

  return (
    <table className="w-full max-w-screen-lg mt-4 text-xs table-fixed sm:text-sm">
      <colgroup>
        <col width="30%" />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr className="text-right border-b border-b-gray-500 dark:border-b-neutral-700">
          <th onClick={() => sortTicker('symbol')} className="text-left">
            이름
          </th>
          <th onClick={() => sortTicker('currentPrice')}>현재가</th>
          <th onClick={() => sortTicker('premium')}>김프</th>
          <th onClick={() => sortTicker('changeRate')}>전일 대비</th>
          <th onClick={() => sortTicker('transactionAmount')}>거래액(일)</th>
        </tr>
      </thead>
      <TableTickerBody />
    </table>
  );
};

export default TableTicker;
