import { useSortTicker } from '@/hooks/useSortTicker';
import TableHeader from './TableHeader';
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
        <col width="20%" />
      </colgroup>

      <thead className="text-xs">
        <tr className="text-right border-b border-b-gray-500 dark:border-b-neutral-700 [&>th]:text-neutral-500">
          <TableHeader onSort={() => sortTicker('symbol')} sortType="symbol">
            이름
          </TableHeader>
          <TableHeader onSort={() => sortTicker('currentPrice')} sortType="currentPrice">
            현재가
          </TableHeader>
          <TableHeader onSort={() => sortTicker('premium')} sortType="premium">
            김프
          </TableHeader>
          <TableHeader onSort={() => sortTicker('changeRate')} sortType="changeRate">
            전일 대비
          </TableHeader>
          <TableHeader onSort={() => sortTicker('transactionAmount')} sortType="transactionAmount">
            거래액(일)
          </TableHeader>
        </tr>
      </thead>

      <TableTickerBody />
    </table>
  );
};

const Loading = () => (
  <tbody>
    <tr className="relative">
      <td className="absolute mt-5 text-center -translate-x-1/2 left-1/2">
        <i className="text-5xl fa-solid fa-circle-notch fa-spin sm:text-7xl" />
      </td>
    </tr>
  </tbody>
);

export default TableTicker;
